import express from "express";
import cluster from "cluster";
import os from "os";
import { connectDB } from "./config/database.js";
import ErrorMiddleware from "./middleware/Error.js";
import cors from "cors";
import compression from "compression";
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
import { fileURLToPath, pathToFileURL } from 'url';
import { cacheMiddleware } from "./middleware/cache.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, path.basename(__dirname) === "dist" ? ".." : ".");
const projectRoot = path.resolve(backendDir, "..");
// SSR/Frontend imports
import fs from 'node:fs/promises';

const numCPUs = os.cpus().length;
const isProduction = process.env.NODE_ENV === 'production' || path.basename(__dirname) === 'dist';

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
   // Worker process - this is where your Express app runs
} else {


  console.log(`Worker ${process.pid} started`);


// Connect to database
connectDB();
const app = express();
app.use(compression());
app.use(express.static(path.join(backendDir, "static"), { maxAge: "365d" }));
app.use("/images", express.static(path.join(backendDir, "images"), { maxAge: "365d" }));

// Middleware - Enhanc// Allow all origins (adjust in production)ed CORS for iOS Safari compatibility
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'Pragma'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  credentials: false, // Set to false for iOS Safari compatibility
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= API response cache (dynamic data) =================
// Central per-path cache configuration (only GETs are cached)
const apiCacheConfig = {
  "/products": 60 * 5,      // 5 minutes
  "/faq": 60 * 10,          // 10 minutes
  "/banner": 60 * 10,       // 10 minutes
  "/blog": 60 * 10,         // 10 minutes
  "/blog-product": 60 * 10, // 10 minutes
  // BottomNav critical data: cache aggressively (6 hours)
  "/brands": 60 * 60 * 6,
  "/category": 60 * 60 * 6,
  "/subcategory": 60 * 10,  // 10 minutes
  "/sitemap": 60 * 60,      // 1 hour
};

Object.entries(apiCacheConfig).forEach(([pathPrefix, ttl]) => {
  app.use(pathPrefix, cacheMiddleware(ttl));
});


// Backend API routes
app.use("/brands", brandRouter);
app.use("/user", userRoute);
app.use("/banner", bannerRouter);
app.use("/contactus", ContactusRouter);
app.use("/blog", blogRouter);
app.use("/blog-product", blogProductRouter);
app.use("/faq", FaqRouter);
app.use("/admin", adminRoute);
app.use("/category", categoryRouter);
app.use("/subcategory", categoryRouter); // Alias for subcategory routes
app.use("/products", productRouter);
app.use("/checkout", checkoutRouter);
app.use("/rating", ratingRoute);
app.use("/subscribe", subscribeRouter);
app.use("/requestQuote", requestQuoteRouter);
app.use("/instantQuote", instantQuoteRouter);
app.use("/", sitemapRouter);

// Simple API test route
app.get("/apis", async (req, res) => {
  res.send("App Is Running backend!");
});
// Error middleware for APIs
app.use(ErrorMiddleware);

// ================= SSR/Frontend optimization =================
// const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';

// Cache for production template and render function
let productionTemplate = '';
let productionRender = null;
let vite = null;

function moveModuleScriptsAfterStylesheets(html) {
  if (!html || typeof html !== 'string') return html;
  const headOpenIndex = html.indexOf('<head');
  const headCloseIndex = html.indexOf('</head>');
  if (headOpenIndex === -1 || headCloseIndex === -1) return html;

  const headStart = html.indexOf('>', headOpenIndex);
  if (headStart === -1) return html;

  const headInner = html.slice(headStart + 1, headCloseIndex);
  const moduleScriptRegex =
    /<script\b[^>]*type=["']module["'][^>]*>\s*<\/script>\s*/gi;

  const scripts = headInner.match(moduleScriptRegex) || [];
  if (scripts.length === 0) return html;

  const headWithoutScripts = headInner.replace(moduleScriptRegex, '');

  const lastStylesheetIndex = headWithoutScripts.lastIndexOf('rel="stylesheet"');
  if (lastStylesheetIndex === -1) return html;

  const insertAfterIndex = headWithoutScripts.indexOf('>', lastStylesheetIndex);
  if (insertAfterIndex === -1) return html;

  const newHeadInner =
    headWithoutScripts.slice(0, insertAfterIndex + 1) +
    '\n    ' +
    scripts.join('').trim() +
    '\n' +
    headWithoutScripts.slice(insertAfterIndex + 1);

  return html.slice(0, headStart + 1) + newHeadInner + html.slice(headCloseIndex);
}

// Preload production assets in production mode
if (isProduction) {
  try {
    const templatePath = path.join(projectRoot, 'frontend/dist/client/index.html');
    const serverEntryPath = path.join(projectRoot, 'frontend/dist/server/entry-server.js');
    
    // Load assets in parallel
    const [template, serverModule] = await Promise.all([
      fs.readFile(templatePath, 'utf-8'),
      import(pathToFileURL(serverEntryPath).href)
    ]);
    
    productionTemplate = moveModuleScriptsAfterStylesheets(template);
    productionRender = serverModule.render;
    
    console.log('Production assets preloaded successfully');
  } catch (error) {
    console.error('Failed to preload production assets:', error);
    // Don't crash the server, but log the error
  }
} else {
  // Development mode - use Vite
  try {
    const { createServer } = await import('vite');
    const { resolve } = await import('path');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
      root: path.join(projectRoot, 'frontend'),
      configFile: path.join(projectRoot, 'frontend/vite.config.js'),
      ssr: {
        // Ensure React resolves from frontend node_modules
        resolve: {
          conditions: ['node', 'import'],
          external: ['react', 'react-dom', 'react-dom/server'],
        },
      },
    });
    app.use(vite.middlewares);
  } catch (error) {
    console.error('Failed to start Vite:', error);
  }
}

// In production, serve static files with caching headers
if (isProduction) {
  try {
    const sirv = (await import('sirv')).default;
    app.use(base, sirv(path.join(projectRoot, 'frontend/dist/client'), {
      extensions: [],
      maxAge: 31536000, // 1 year
      immutable: true
    }));
  } catch (error) {
    console.error('Failed to set up static file serving:', error);
  }
}

// Cache for rendered pages with LRU strategy
const ssrCache = new Map();
// More aggressive SSR caching:
// - Home page: 15 minutes
// - Other pages: 10 minutes
const SSR_CACHE_TTL_DEFAULT = 1000 * 60 * 10;
const SSR_CACHE_TTL_HOME = 1000 * 60 * 15;
const MAX_CACHE_SIZE = 200; // Allow more pages before eviction

// Lightweight logging helpers to avoid noisy logs in production
const ssrLogDebug = (...args) => {
  if (!isProduction) {
    console.log(...args);
  }
};

const ssrLogError = (...args) => {
  if (!isProduction) {
    console.error(...args);
  }
};

// Function to generate cache key from request
function getCacheKey(req) {
  return req.originalUrl;
}

// Function to clean up cache periodically
function cleanCache() {
  const now = Date.now();
  for (const [key, value] of ssrCache.entries()) {
    if (value.expiry < now) {
      ssrCache.delete(key);
    }
  }
  
  // Enforce size limit
  if (ssrCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(ssrCache.entries());
    // Remove oldest entries (first in the array)
    for (let i = 0; i < entries.length - MAX_CACHE_SIZE; i++) {
      ssrCache.delete(entries[i][0]);
    }
  }
}

setInterval(cleanCache, 60000);

app.use('*', async (req, res, next) => {
  const startTime = Date.now();
  const url = req.originalUrl;
  
  if (url.startsWith('/api/') || 
      url.startsWith('/_vite') || 
      url.includes('.')) {
    return next();
  }

  if (url.length > 1 && url.endsWith('/')) {
    const newUrl = url.slice(0, -1);
    return res.redirect(301, newUrl);
  }
  // Check cache first
  const cacheKey = getCacheKey(req);
  const cached = ssrCache.get(cacheKey);
  
  if (cached && cached.expiry > Date.now()) {
    res.set(cached.headers).status(200).send(cached.html);
    ssrLogDebug(`SSR Cache hit for ${url}: ${Date.now() - startTime}ms`);
    return;
  }
  
  let template, render;
  let rendered = { html: '', helmet: {}, serverData: {} };
  
  try {
    if (!isProduction && vite) {
      // Development mode
      try {
        template = await fs.readFile(
          path.join(projectRoot, 'frontend/index.html'), 
          'utf-8'
        );
        
        template = await vite.transformIndexHtml(url, template);
        if (!template.includes('href="/src/App.css"') && !template.includes("href='/src/App.css'")) {
          template = template.replace(
            "</head>",
            `    <link href="/src/App.css" rel="stylesheet" />\n  </head>`
          );
        }
        const serverModule = await vite.ssrLoadModule('/src/entry-server.jsx');
        render = serverModule?.render;
      } catch (error) {
        ssrLogError('Vite development error:', error);
        ssrLogError('Error details:', error.message);
        ssrLogError('Error stack:', error.stack);
      }
    } else if (isProduction && productionTemplate && productionRender) {
      // Production mode
      template = productionTemplate;
      render = productionRender;
    } else {
     
    }
    
    // Check if render function is available
    if (!render || typeof render !== 'function') {
      console.error(`Render function not available for ${url}. Falling back to client-side rendering.`);
      if (template) {
        const fallbackHtml = template
          .replace('<!--app-head-->', '')
          .replace('<!--app-html-->', '<div id="root"></div>')
          .replace('<!--server-data-->', '<script>window.__SERVER_DATA__ = null;</script>\n<script>window.__CATEGORY_PRODUCTS__ = null;</script>\n<script>window.__HOME_PAGE_DATA__ = null;</script>');
        return res.status(200).set({ 'Content-Type': 'text/html' }).send(fallbackHtml);
      } else {
        return res.status(500).send('Server error');
      }
    }
    
    const renderPromise = render(url);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('SSR timeout')), 3000)
    );
    
    rendered = await Promise.race([renderPromise, timeoutPromise]);
    
    // Debug logging
    ssrLogDebug(`SSR render result for ${url}:`, {
      hasHtml: !!rendered.html,
      hasServerData: !!rendered.serverData,
      hasCategoryProducts: !!rendered.CategoryProducts,
      hasHomePageData: !!rendered.homePageData,
      homePageDataKeys: rendered.homePageData ? Object.keys(rendered.homePageData) : []
    });
    
    // Prepare server data for injection
    const serverDataScript = rendered.serverData 
      ? `<script>window.__SERVER_DATA__ = ${JSON.stringify({ serverData: rendered.serverData })};</script>`
      : '<script>window.__SERVER_DATA__ = null;</script>';
    
    const categoryProductsScript = rendered.CategoryProducts
      ? `<script>window.__CATEGORY_PRODUCTS__ = ${JSON.stringify(rendered.CategoryProducts)};</script>`
      : '<script>window.__CATEGORY_PRODUCTS__ = null;</script>';

    const homePageDataScript = rendered.homePageData
      ? `<script>window.__HOME_PAGE_DATA__ = ${JSON.stringify(rendered.homePageData)};</script>`
      : '<script>window.__HOME_PAGE_DATA__ = null;</script>';
    
    ssrLogDebug(`SSR scripts prepared for ${url}:`, {
      serverData: rendered.serverData ? 'present' : 'null',
      categoryProducts: rendered.CategoryProducts ? 'present' : 'null',
      homePageData: rendered.homePageData ? 'present' : 'null'
    });
    
    // Check if HTML content contains data (for SEO/view-source visibility)
    if (rendered.serverData) {
      const hasDataInHtml = rendered.html.includes(
        rendered.serverData.name ||
        rendered.serverData.title ||
        rendered.serverData.slug ||
        ''
      );
      ssrLogDebug(`SSR: Data visible in HTML for ${url}:`, hasDataInHtml, {
        dataKey:
          rendered.serverData.name ||
          rendered.serverData.title ||
          rendered.serverData.slug ||
          'N/A',
      });
    }

    const html = template
      .replace(
        '<!--app-head-->',
        `\n${rendered.helmet?.title || ''}\n${rendered.helmet?.meta || ''}\n${rendered.helmet?.link || ''}\n${rendered.helmet?.script || ''}\n`
      )
      .replace('<!--app-html-->', rendered.html || '')
      .replace(
        '<!--server-data-->', 
        `${serverDataScript}\n${categoryProductsScript}\n${homePageDataScript}`
      );

    if (isProduction && res.statusCode === 200) {
      const isHomePageRequest =
        url === '/' ||
        url === '' ||
        url.startsWith('/?');
      const ttl = isHomePageRequest
        ? SSR_CACHE_TTL_HOME
        : SSR_CACHE_TTL_DEFAULT;
      const headers = {
        'Content-Type': 'text/html',
        'Cache-Control': isHomePageRequest
          ? 'public, max-age=300, stale-while-revalidate=900'
          : 'public, max-age=60, stale-while-revalidate=300'
      };

      ssrCache.set(cacheKey, {
        html,
        headers,
        expiry: Date.now() + ttl
      });
      res.set(headers);
    }
    
    if (!isProduction) {
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } else {
      // Headers already set above for production
      res.status(200).send(html);
    }
    ssrLogDebug(`SSR completed for ${url}: ${Date.now() - startTime}ms`);
    
  } catch (e) {
    if (e.message === 'SSR timeout') {
      console.error(`SSR timeout for ${url}: ${Date.now() - startTime}ms`);
      
      if (template) {
        const fallbackHtml = template
          .replace('<!--app-head-->', '')
          .replace('<!--app-html-->', '<div id="root"></div>')
          .replace('<!--server-data-->', '<script>window.__SERVER_DATA__ = null;</script>\n<script>window.__CATEGORY_PRODUCTS__ = null;</script>\n<script>window.__HOME_PAGE_DATA__ = null;</script>');
        
        return res.status(200).set({ 'Content-Type': 'text/html' }).send(fallbackHtml);
      } else {
        return res.status(500).send('Server error');
      }
    } else {
      ssrLogError('SSR Error:', e.stack);
      if (template) {
        const errorHtml = template
          .replace('<!--app-head-->', '')
          .replace('<!--app-html-->', '<div id="root"></div>')
          .replace('<!--server-data-->', '<script>window.__SERVER_DATA__ = null;</script>\n<script>window.__CATEGORY_PRODUCTS__ = null;</script>\n<script>window.__HOME_PAGE_DATA__ = null;</script>');
        
        res.status(200).set({ 'Content-Type': 'text/html' }).send(errorHtml);
      } else {
        res.status(500).send('Server error');
      }
    }
  }
});

// Start server
const PORT = process.env.PORT || 8000;
 app.listen(PORT, '0.0.0.0', () => {
    console.log(`Worker ${process.pid} is running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
 });
}
