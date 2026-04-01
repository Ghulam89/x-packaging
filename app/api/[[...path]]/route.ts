import type { NextRequest } from "next/server";
import { proxyNextRequestToLegacyExpress } from "@/server/api/proxy-legacy-express";

export const runtime = "nodejs";

type RouteCtx = { params: Promise<{ path?: string[] }> };

function run(req: NextRequest, ctx: RouteCtx, method: string) {
  return (async () => {
    const { path } = await ctx.params;
    return proxyNextRequestToLegacyExpress(req, path, method);
  })();
}

export function GET(req: NextRequest, ctx: RouteCtx) {
  return run(req, ctx, "GET");
}

export function POST(req: NextRequest, ctx: RouteCtx) {
  return run(req, ctx, "POST");
}

export function PUT(req: NextRequest, ctx: RouteCtx) {
  return run(req, ctx, "PUT");
}

export function DELETE(req: NextRequest, ctx: RouteCtx) {
  return run(req, ctx, "DELETE");
}

export function PATCH(req: NextRequest, ctx: RouteCtx) {
  return run(req, ctx, "PATCH");
}

export function HEAD(req: NextRequest, ctx: RouteCtx) {
  return run(req, ctx, "HEAD");
}

export function OPTIONS(req: NextRequest, ctx: RouteCtx) {
  return run(req, ctx, "OPTIONS");
}
