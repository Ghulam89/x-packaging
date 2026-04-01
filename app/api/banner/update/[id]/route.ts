import { jsonWithCors, optionsResponse } from "@/lib/api/cors";
import { bannerUpdateFromFormData } from "@/server/api/banner-handlers";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  segmentData: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await segmentData.params;
    const formData = await request.formData();
    const result = await bannerUpdateFromFormData(id, formData);
    return jsonWithCors(result.body, { status: result.status });
  } catch {
    return jsonWithCors({ status: "fail", message: "Internal Server Error" }, { status: 500 });
  }
}

export function OPTIONS() {
  return optionsResponse();
}
