import compression from "compression";
import express, { type Request, type Response } from "express";
import path from "path";

const backendImagesDir = path.join(process.cwd(), "lib", "backend", "images");

type NextPageRender = (req: Request, res: Response) => Promise<unknown>;

/**
 * Express app: static assets + everything else delegates to the Next.js request handler (pages, RSC, etc.).
 */
export function createPageExpressApp(renderNext: NextPageRender): express.Express {
  const app = express();
  app.disable("x-powered-by");

  app.use(compression({ threshold: 1024 }));
  app.use(express.static("static"));
  app.use("/images", express.static(backendImagesDir));

  app.use((req: Request, res: Response, next: express.NextFunction) => {
    if (req.path.length > 1 && req.path.endsWith("/")) {
      const target = req.path.slice(0, -1) + req.url.slice(req.path.length);
      return res.redirect(301, target);
    }
    return next();
  });

  app.all("*", (req: Request, res: Response, next: express.NextFunction) => {
    return renderNext(req, res).catch(next);
  });

  return app;
}
