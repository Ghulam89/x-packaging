import { NextResponse } from "next/server";

export const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Cache-Control, Pragma",
  "Access-Control-Max-Age": "86400",
};

export function mergeCors(init?: ResponseInit): ResponseInit {
  const headers = new Headers(init?.headers);
  for (const [k, v] of Object.entries(corsHeaders)) {
    if (!headers.has(k)) headers.set(k, v);
  }
  return { ...init, headers };
}

export function jsonWithCors(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, mergeCors(init));
}

export function optionsResponse() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
