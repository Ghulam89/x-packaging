import request from "supertest";
import type { NextRequest } from "next/server";
import { getLegacyApiExpressApp } from "@/server/legacy-express-api";

const HOP_BY_HOP = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "keep-alive",
]);

type HttpMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head";

function buildApiPath(segments: string[] | undefined): string {
  if (!segments?.length) return "/api";
  return `/api/${segments.join("/")}`;
}

/**
 * Forwards a Next `Request` to the legacy Express stack (services + multer routes).
 */
export async function proxyNextRequestToLegacyExpress(
  req: NextRequest,
  segments: string[] | undefined,
  method: string
): Promise<Response> {
  const app = getLegacyApiExpressApp();
  const pathname = buildApiPath(segments);
  const u = new URL(req.url);
  const target = `${pathname}${u.search}`;
  const m = method.toLowerCase() as HttpMethod;

  if (m === "options") {
    let optAgent = request(app).options(target);
    optAgent = copyHeaders(optAgent, req);
    return runAgent(optAgent);
  }

  let agent = (request(app) as unknown as Record<string, (p: string) => request.Test>)[m](target);
  agent = copyHeaders(agent, req);

  if (m !== "get" && m !== "head") {
    const buf = Buffer.from(await req.arrayBuffer());
    if (buf.length > 0) {
      agent = agent.send(buf);
    }
  }

  return runAgent(agent);
}

function copyHeaders(agent: request.Test, req: NextRequest): request.Test {
  let a = agent;
  req.headers.forEach((value, key) => {
    if (HOP_BY_HOP.has(key.toLowerCase())) return;
    a = a.set(key, value);
  });
  return a;
}

const STRIP_FROM_REBUILT_BODY = new Set([
  "content-encoding",
  "content-length",
  "transfer-encoding",
]);

async function runAgent(agent: request.Test): Promise<Response> {
  const res = await agent;
  const headers = new Headers();
  const raw = res.headers as Record<string, unknown>;
  for (const [k, v] of Object.entries(raw)) {
    if (v == null) continue;
    if (STRIP_FROM_REBUILT_BODY.has(k.toLowerCase())) continue;
    if (Array.isArray(v)) v.forEach((item) => headers.append(k, String(item)));
    else headers.set(k, String(v));
  }

  let body: BodyInit;
  const ct = String(headers.get("content-type") || "").toLowerCase();
  if (ct.includes("application/json") && res.body !== undefined && typeof res.body !== "string") {
    body = JSON.stringify(res.body);
  } else if (typeof res.text === "string") {
    body = res.text;
  } else if (Buffer.isBuffer(res.body)) {
    body = new Uint8Array(res.body);
  } else {
    body = res.text ?? "";
  }

  return new Response(body, { status: res.status, headers });
}
