import compression from "compression";
import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import ErrorMiddleware from "./middleware/Error";
import { registerApiRoutes } from "./register-api-routes";

const BODY_LIMIT = "32mb";

/**
 * In-process Express app used only via `app/api/[[...path]]` (supertest bridge).
 * Business logic lives under `lib/backend/services/` (no `controller/` folder).
 */
let singleton: express.Express | null = null;

export function getLegacyApiExpressApp(): express.Express {
  if (!singleton) {
    const app = express();
    app.disable("x-powered-by");

    app.use(compression({ threshold: 1024 }));
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept", "Cache-Control", "Pragma"],
        exposedHeaders: ["Content-Length", "Content-Type"],
        credentials: false,
        maxAge: 86400,
        optionsSuccessStatus: 200,
      })
    );
    app.use(express.json({ limit: BODY_LIMIT }));
    app.use(express.urlencoded({ extended: true, limit: BODY_LIMIT }));

    app.use((req: Request, res: Response, nextMiddleware: NextFunction) => {
      if (req.path.length > 1 && req.path.endsWith("/")) {
        const target = req.path.slice(0, -1) + req.url.slice(req.path.length);
        return res.redirect(301, target);
      }
      return nextMiddleware();
    });

    registerApiRoutes(app);

    app.use(ErrorMiddleware);

    app.use((req: Request, res: Response) => {
      if (req.path.startsWith("/api")) {
        return res.status(404).json({
          success: false,
          message: "Route not found",
        });
      }
      return res.status(404).json({ success: false, message: "Not found" });
    });

    singleton = app;
  }
  return singleton;
}
