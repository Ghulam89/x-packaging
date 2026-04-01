import { jsonWithCors, optionsResponse } from "@/lib/api/cors";
import { bannerGetById } from "@/server/api/banner-handlers";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  segmentData: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await segmentData.params;
    const body = await bannerGetById(id);
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
