import type { NextFunction, Request, Response } from "express";

type HttpError = Error & { statusCode?: number };

const ErrorMiddleware = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
