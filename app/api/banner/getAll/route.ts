import { jsonWithCors, optionsResponse } from "@/lib/api/cors";
import { bannerGetAll } from "@/server/api/banner-handlers";

export const runtime = "nodejs";

export async function GET() {
  try {
    const body = await bannerGetAll();
    return jsonWithCors(body, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
      },
    });
  } catch {
    return jsonWithCors({ status: "fail", error: "Internal Server Error" }, { status: 500 });
  }
}

export function OPTIONS() {
  return optionsResponse();
}
