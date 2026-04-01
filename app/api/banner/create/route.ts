import { jsonWithCors, optionsResponse } from "@/lib/api/cors";
import { bannerCreateFromFormData } from "@/server/api/banner-handlers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await bannerCreateFromFormData(formData);
    return jsonWithCors(result.body, { status: result.status });
  } catch {
    return jsonWithCors({ status: "fail", message: "Internal Server Error" }, { status: 500 });
  }
}

export function OPTIONS() {
  return optionsResponse();
}
