import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import next from "next";
import { connectDB } from "./config/database";
import { createPageExpressApp } from "./create-page-express-app";

const appRootDir = process.cwd();
const isProduction = process.env.NODE_ENV === "production";

function requestPath(url: string | undefined): string {
  if (!url) return "/";
  const q = url.indexOf("?");
  return q === -1 ? url : url.slice(0, q);
}

export async function startServer(): Promise<void> {
  console.log(`Server ${process.pid} started`);

  const nextApp = next({ dev: !isProduction, dir: appRootDir });
  await nextApp.prepare();

  connectDB();

  const handleNext = nextApp.getRequestHandler() as (
    req: IncomingMessage,
    res: ServerResponse
  ) => Promise<void>;

  const pageApp = createPageExpressApp((req, res) => handleNext(req, res));

  const dispatch = (req: IncomingMessage, res: ServerResponse): void => {
    const path = requestPath(req.url);

    if (path.startsWith("/api")) {
      void handleNext(req, res);
      return;
    }
    pageApp(req as Parameters<typeof pageApp>[0], res as Parameters<typeof pageApp>[1]);
  };

  const PORT = Number(process.env.PORT || 8000);
  const server = http.createServer(dispatch);
  server.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Server ${process.pid} is running on port ${PORT} in ${isProduction ? "production" : "development"} mode`
    );
  });
}
