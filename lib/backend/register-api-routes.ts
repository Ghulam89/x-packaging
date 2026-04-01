import type { Express, Request, Response } from "express";
import ContactusRouter from "./routes/contactusrouter";
import blogRouter from "./routes/blogRouter";
import blogProductRouter from "./routes/blogProductRouter";
import adminRoute from "./routes/AdminRouter";
import FaqRouter from "./routes/FaqRouter";
import productRouter from "./routes/ProductRouter";
import brandRouter from "./routes/BrandRouter";
import checkoutRouter from "./routes/CheckoutRouter";
import userRoute from "./routes/userRoute";
import categoryRouter from "./routes/MidCategoryRouter";
import ratingRoute from "./routes/RatingRouter";
import subscribeRouter from "./routes/SubscribeRouter";
import requestQuoteRouter from "./routes/RequestQuote";
import instantQuoteRouter from "./routes/InstantQuote";
import sitemapRouter from "./routes/sitemapRouter";
import { cacheMiddleware } from "./middleware/cache";

const apiCacheConfig: Record<string, number> = {
  "/products": 60 * 5,
  "/blog": 60 * 10,
  "/faq": 60 * 10,
  "/blog-product": 60 * 10,
  "/brands": 60 * 10,
  "/category": 60 * 10,
  "/subcategory": 60 * 10,
  "/sitemap": 60 * 60,
};

/**
 * Registers all REST handlers under `/api/...`.
 * Split from HTTP plumbing so routes stay easy to scan (and can move to App Router handlers later).
 */
export function registerApiRoutes(app: Express): void {
  Object.entries(apiCacheConfig).forEach(([pathPrefix, ttl]) => {
    app.use(`/api${pathPrefix}`, cacheMiddleware(ttl));
  });

  app.use("/api/brands", brandRouter);
  app.use("/api/user", userRoute);
  app.use("/api/contactus", ContactusRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/faq", FaqRouter);
  app.use("/api/blog-product", blogProductRouter);
  app.use("/api/admin", adminRoute);
  app.use("/api/category", categoryRouter);
  app.use("/api/subcategory", categoryRouter);
  app.use("/api/products", productRouter);
  app.use("/api/checkout", checkoutRouter);
  app.use("/api/rating", ratingRoute);
  app.use("/api/subscribe", subscribeRouter);
  app.use("/api/requestQuote", requestQuoteRouter);
  app.use("/api/instantQuote", instantQuoteRouter);
  app.use("/api", sitemapRouter);

  app.get("/api/apis", (_req: Request, res: Response) => {
    res.send("App Is Running backend!");
  });
}
