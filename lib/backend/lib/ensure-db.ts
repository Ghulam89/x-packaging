import mongoose from "mongoose";
import { MONGO_URI } from "@/server/config/index";

let connecting: Promise<void> | null = null;

/** Ensures MongoDB is connected (safe to call from every Route Handler in the same Node process). */
export async function ensureDb(): Promise<void> {
  if (mongoose.connection.readyState === 1) return;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }
  if (!connecting) {
    connecting = mongoose.connect(MONGO_URI).then(() => undefined);
  }
  await connecting;
}
