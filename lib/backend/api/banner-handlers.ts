import { writeFile, unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { Banner } from "@/server/model/Banner";
import { ensureDb } from "@/server/lib/ensure-db";

const imagesDir = path.join(process.cwd(), "lib", "backend", "images");

function safeBasename(original: string): string {
  const base = path.basename(original);
  if (!base || base === "." || base === "..") return `banner-${Date.now()}`;
  return base;
}

function diskPathFromStoredImage(stored: string): string {
  const name = stored.split("/").pop() || "";
  return path.join(imagesDir, name);
}

export async function bannerGetAll() {
  await ensureDb();
  const users = await Banner.find();
  return {
    status: "success" as const,
    data: users,
  };
}

export async function bannerGetById(id: string) {
  await ensureDb();
  const data = await Banner.findById(id);
  return {
    status: "success" as const,
    data,
  };
}

async function saveUploadedImage(file: File): Promise<string> {
  const name = safeBasename(file.name);
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(imagesDir, name), buf);
  return `images/${name}`.replace(/\\/g, "/");
}

export type BannerWriteResult =
  | { kind: "ok"; status: number; body: Record<string, unknown> }
  | { kind: "err"; status: number; body: Record<string, unknown> };

export async function bannerCreateFromFormData(formData: FormData): Promise<BannerWriteResult> {
  await ensureDb();
  const imageEntry = formData.get("image");
  if (!(imageEntry instanceof File) || imageEntry.size === 0) {
    return {
      kind: "err",
      status: 400,
      body: { status: "fail", message: "Banner image is required" },
    };
  }

  let imagePath: string;
  try {
    imagePath = await saveUploadedImage(imageEntry);
  } catch {
    return {
      kind: "err",
      status: 500,
      body: { status: "fail", message: "Failed to save image" },
    };
  }

  try {
    const data = {
      image: imagePath,
      videoLink: String(formData.get("videoLink") ?? ""),
      description: String(formData.get("description") ?? ""),
      imageAltText: String(formData.get("imageAltText") ?? ""),
    };
    const newBanner = await Banner.create(data);
    return {
      kind: "ok",
      status: 200,
      body: {
        status: "success",
        message: "New banner created successfully!",
        data: newBanner,
      },
    };
  } catch {
    try {
      const fp = diskPathFromStoredImage(imagePath);
      if (existsSync(fp)) await unlink(fp);
    } catch {
      /* ignore */
    }
    return {
      kind: "err",
      status: 500,
      body: { status: "fail", message: "Internal Server Error" },
    };
  }
}

export async function bannerUpdateFromFormData(id: string, formData: FormData): Promise<BannerWriteResult> {
  await ensureDb();
  const existingBanner = await Banner.findById(id);
  if (!existingBanner) {
    return {
      kind: "err",
      status: 404,
      body: { status: "fail", message: "Banner not found" },
    };
  }

  const imageEntry = formData.get("image");
  let uploadedPath: string | undefined;

  const updateData: Record<string, unknown> = {
    videoLink: formData.has("videoLink")
      ? String(formData.get("videoLink"))
      : existingBanner.videoLink,
    description: formData.has("description")
      ? String(formData.get("description"))
      : existingBanner.description,
    imageAltText: formData.has("imageAltText")
      ? String(formData.get("imageAltText"))
      : existingBanner.imageAltText,
  };

  if (imageEntry instanceof File && imageEntry.size > 0) {
    try {
      uploadedPath = await saveUploadedImage(imageEntry);
      updateData.image = uploadedPath;
      if (existingBanner.image) {
        const oldPath = diskPathFromStoredImage(existingBanner.image);
        if (existsSync(oldPath)) await unlink(oldPath);
      }
    } catch {
      if (uploadedPath) {
        const fp = diskPathFromStoredImage(uploadedPath);
        if (existsSync(fp)) await unlink(fp).catch(() => undefined);
      }
      return {
        kind: "err",
        status: 500,
        body: { status: "fail", message: "Failed to save image" },
      };
    }
  }

  try {
    const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return {
      kind: "ok",
      status: 200,
      body: {
        status: "success",
        message: "Banner updated successfully!",
        data: updatedBanner,
      },
    };
  } catch {
    if (uploadedPath) {
      try {
        const fp = diskPathFromStoredImage(uploadedPath);
        if (existsSync(fp)) await unlink(fp);
      } catch {
        /* ignore */
      }
    }
    return {
      kind: "err",
      status: 500,
      body: { status: "fail", message: "Internal Server Error" },
    };
  }
}

export async function bannerDeleteById(id: string) {
  await ensureDb();
  const delBanner = await Banner.findByIdAndDelete(id);
  if (!delBanner) {
    return { status: "fail" as const, message: "Banner not Found" };
  }
  return {
    status: "success" as const,
    message: "banner deleted successfully!",
  };
}
