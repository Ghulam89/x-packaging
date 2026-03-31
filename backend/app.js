import express from "express";
import cluster from "cluster";
import os from "os";
import { connectDB } from "./config/database.js";
import ErrorMiddleware from "./middleware/Error.js";
import cors from "cors";
import bannerRouter from "./routes/bannerRoute.js";
import ContactusRouter from "./routes/contactusrouter.js";
import blogRouter from "./routes/blogRouter.js";
import blogProductRouter from "./routes/blogProductRouter.js";
import FaqRouter from "./routes/FaqRouter.js";
import adminRoute from "./routes/AdminRouter.js";
import productRouter from "./routes/ProductRouter.js";
import brandRouter from "./routes/BrandRouter.js";
import checkoutRouter from "./routes/CheckoutRouter.js";
import userRoute from "./routes/userRoute.js";
import categoryRouter from "./routes/MidCategoryRouter.js";
import ratingRoute from "./routes/RatingRouter.js";
import subscribeRouter from "./routes/SubscribeRouter.js";
import requestQuoteRouter from "./routes/RequestQuote.js";
import instantQuoteRouter from "./routes/InstantQuote.js";
import sitemapRouter from "./routes/sitemapRouter.js";
import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';
import { cacheMiddleware } from "./middleware/cache.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendOutDir = path.resolve(__dirname, "../xcustompackaging/out");
const nextStaticDir = path.join(frontendOutDir, "_next");
const nextIndexFile = path.join(frontendOutDir, "index.html");
const frontendPublicDir = path.resolve(__dirname, "../xcustompackaging/public");
const numCPUs = os.cpus().length;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${numCPUs} CPUs`);

  // Fork workers based on CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit and restart
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });

  // Log worker online events
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

} else {

   // Worker process - this is where your Express app runs
  console.log(`Worker ${process.pid} started`);


// Connect to database
connectDB();
const app = express();
app.use(express.static("static"));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware - Enhanced CORS for iOS Safari compatibility
app.use(cors({
  origin: '*', // Allow all origins (adjust in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'Pragma'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  credentials: false, // Set to false for iOS Safari compatibility
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Canonical URL: remove trailing slash except root
app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith("/")) {
    const target = req.path.slice(0, -1) + req.url.slice(req.path.length);
    return res.redirect(301, target);
  }
  return next();
});

app.use("/_next", express.static(nextStaticDir));
app.use(express.static(frontendPublicDir, { redirect: false }));
app.use(express.static(frontendOutDir, { redirect: false }));

// ================= API response cache (dynamic data) =================
// Central per-path cache configuration (only GETs are cached)
const apiCacheConfig = {
  "/products": 60 * 5,      // 5 minutes
  "/faq": 60 * 10,          // 10 minutes
  "/banner": 60 * 10,       // 10 minutes
  "/blog": 60 * 10,         // 10 minutes
  "/blog-product": 60 * 10, // 10 minutes
  "/brands": 60 * 10,       // 10 minutes
  "/category": 60 * 10,     // 10 minutes
  "/subcategory": 60 * 10,  // 10 minutes
  "/sitemap": 60 * 60,      // 1 hour
};

Object.entries(apiCacheConfig).forEach(([pathPrefix, ttl]) => {
  app.use(`/api${pathPrefix}`, cacheMiddleware(ttl));
});

// API namespace routes (single source of truth)
app.use("/api/brands", brandRouter);
app.use("/api/user", userRoute);
app.use("/api/banner", bannerRouter);
app.use("/api/contactus", ContactusRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog-product", blogProductRouter);
app.use("/api/faq", FaqRouter);
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

// Health endpoint for backend checks
app.get("/api/apis", (req, res) => {
  res.send("App Is Running backend!");
});

// Frontend route handling for exported Next.js pages
app.get("*", (req, res, next) => {
  if (
    req.path.startsWith("/api") ||
    req.path.startsWith("/_next") ||
    req.path.startsWith("/images")
  ) {
    return next();
  }

  // For file requests (e.g. favicon.ico), let static middleware/404 handle it.
  if (path.extname(req.path)) {
    return next();
  }

  const routePath = req.path === "/" ? "index" : req.path.replace(/^\/+|\/+$/g, "");
  const pageHtml = path.join(frontendOutDir, `${routePath}.html`);
  const pageIndexHtml = path.join(frontendOutDir, routePath, "index.html");

  if (pageHtml.startsWith(frontendOutDir) && fs.existsSync(pageHtml)) {
    return res.sendFile(pageHtml);
  }

  if (pageIndexHtml.startsWith(frontendOutDir) && fs.existsSync(pageIndexHtml)) {
    return res.sendFile(pageIndexHtml);
  }

  // Fallback to landing page for client-side navigations
  return res.sendFile(nextIndexFile);
});


// Error middleware for APIs
app.use(ErrorMiddleware);

// If no route matched, return API-friendly not found response
app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }

  return res.status(404).send("Not Found");
});

// Start server
const PORT = process.env.PORT || 8000;
 app.listen(PORT, '0.0.0.0', () => {
    console.log(`Worker ${process.pid} is running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
 });
}
