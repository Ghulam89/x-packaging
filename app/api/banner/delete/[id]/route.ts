import { jsonWithCors, optionsResponse } from "@/lib/api/cors";
import { bannerDeleteById } from "@/server/api/banner-handlers";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  segmentData: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await segmentData.params;
    const body = await bannerDeleteById(id);
    return jsonWithCors(body);
  } catch (err) {
    console.error(err);
    return jsonWithCors({ status: "fail", error: "Internal Server Error" }, { status: 500 });
  }
}

export function OPTIONS() {
  return optionsResponse();
}
