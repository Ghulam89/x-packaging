var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// utils/ipDetection.js
var ipDetection_exports = {};
__export(ipDetection_exports, {
  getClientIP: () => getClientIP
});
import requestIp from "request-ip";
var getClientIP;
var init_ipDetection = __esm({
  "utils/ipDetection.js"() {
    getClientIP = (req) => {
      let clientIp = requestIp.getClientIp(req);
      const isLocalhost = (ip) => {
        return ip === "::1" || ip === "127.0.0.1" || ip === "::ffff:127.0.0.1" || ip?.startsWith("127.") || ip?.startsWith("::ffff:127.");
      };
      if (isLocalhost(clientIp)) {
        clientIp = "";
      } else if (!clientIp) {
        clientIp = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.headers["x-client-ip"] || req.connection?.remoteAddress || req.socket?.remoteAddress || req.ip;
        if (clientIp && clientIp.includes(":")) {
          clientIp = clientIp.split(":")[0];
        }
        if (isLocalhost(clientIp)) {
          clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim();
        }
      }
      if (isLocalhost(clientIp)) {
        clientIp = "";
      }
      if (!clientIp || clientIp.trim() === "") {
        clientIp = "";
      }
      return clientIp;
    };
  }
});

// app.js
import express17 from "express";
import cluster from "cluster";
import os from "os";

// config/database.js
import mongoose from "mongoose";

// config/index.js
import dotenv from "dotenv";
dotenv.config();
var {
  APP_PORT,
  MONGO_URI,
  TOKEN_KEY,
  EMAIL,
  BASEURL,
  PLACE_ID,
  GOOGLE_API_KEY,
  PASS
} = process.env;

// config/database.js
var connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    console.error("Server will continue but API may not work. Check MONGO_URI in .env");
  }
};

// middleware/Error.js
var ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
var Error_default = ErrorMiddleware;

// app.js
import cors from "cors";
import compression from "compression";

// routes/bannerRoute.js
import express from "express";

// middleware/catchAsyncError.js
var catchAsyncError = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next)).catch(next);
};

// model/Banner.js
import mongoose2 from "mongoose";
var Schema = mongoose2.Schema;
var bannerSchema = new Schema({
  videoLink: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  imageAltText: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
var Banner = mongoose2.model("Banner", bannerSchema);

// controller/bannerController.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var createBanner = catchAsyncError(async (req, res, next) => {
  try {
    if (!req.files?.image) {
      return res.status(400).json({
        status: "fail",
        message: "Banner image is required"
      });
    }
    const imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
    const data = {
      image: imagePath,
      videoLink: req.body.videoLink,
      description: req.body.description,
      imageAltText: req.body.imageAltText
    };
    const newBanner = await Banner.create(data);
    res.status(200).json({
      status: "success",
      message: "New banner created successfully!",
      data: newBanner
    });
  } catch (error) {
    if (req.files?.image) {
      const filePath = path.join(__dirname, "images", req.files.image[0].filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return next(error);
  }
});
var getBannerById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await Banner.findById(id);
    res.json({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
};
var updateBanner = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  try {
    const existingBanner = await Banner.findById(id);
    if (!existingBanner) {
      return res.status(404).json({
        status: "fail",
        message: "Banner not found"
      });
    }
    let updateData = {
      videoLink: req.body.videoLink || existingBanner.videoLink,
      description: req.body.description || existingBanner.description,
      imageAltText: req.body.imageAltText
    };
    if (req.files?.image) {
      const newImagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
      updateData.image = newImagePath;
      if (existingBanner.image) {
        const oldImageName = existingBanner.image.split("/").pop();
        const oldImagePath = path.join(__dirname, "images", oldImageName);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "Banner updated successfully!",
      data: updatedBanner
    });
  } catch (error) {
    if (req.files?.image) {
      const filePath = path.join(__dirname, "images", req.files.image[0].filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return next(error);
  }
});
var getAllbanners = catchAsyncError(async (req, res, next) => {
  try {
    const users = await Banner.find();
    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteBannerById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delBanner = await Banner.findByIdAndDelete(id);
    if (!delBanner) {
      return res.json({ status: "fail", message: "Banner not Found" });
    }
    res.json({
      status: "success",
      message: "banner deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// upload/UploadFile.js
import multer from "multer";
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
var __filename = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename);
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path2.join(__dirname2, "../images"));
  },
  filename: function(req, file, cb) {
    const ext = path2.extname(file.originalname).toLowerCase();
    cb(null, `${file.originalname}`);
  }
});
var fileFilter = (req, file, callBack) => {
  const fileTypes = /jpeg|jpg|png|webp|gif/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path2.extname(file.originalname).toLowerCase());
  if (mimeType && extname) {
    return callBack(null, true);
  }
  callBack("Error: Only image files (jpeg, jpg, png, gif) are allowed!");
};
var upload = multer({
  storage,
  limits: { fileSize: 3145728 },
  fileFilter
});
var uploadBrandImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 }
]);
var uploadProductImages = upload.fields([
  { name: "images", maxCount: 15 },
  { name: "bannerImage", maxCount: 1 }
]);
var uploadCategoryImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "icon", maxCount: 1 },
  { name: "bannerImageFirst", maxCount: 1 },
  { name: "bannerImageSecond", maxCount: 1 },
  { name: "bannerImageThird", maxCount: 1 },
  { name: "faqImage", maxCount: 1 }
]);
var uploadBannerImages = upload.fields([
  { name: "image", maxCount: 1 }
]);
var uploadBlogImages = upload.fields([
  { name: "image", maxCount: 1 }
]);
var uploadInstantQuoteImages = upload.fields([
  { name: "image", maxCount: 1 }
]);
var uploadRequestQuoteImages = upload.fields([
  { name: "image", maxCount: 1 }
]);
var uploadEditorImage = upload.single("image");

// routes/bannerRoute.js
var bannerRouter = express.Router();
bannerRouter.route("/create").post(uploadBannerImages, createBanner);
bannerRouter.route("/getAll").get(getAllbanners);
bannerRouter.route("/get/:id").get(getBannerById);
bannerRouter.route("/update/:id").put(uploadBannerImages, updateBanner);
bannerRouter.route("/delete/:id").delete(deleteBannerById);
var bannerRoute_default = bannerRouter;

// routes/contactusrouter.js
import express2 from "express";

// model/ContactUs.js
import mongoose3 from "mongoose";
import bcrypt from "bcrypt";
var Schema2 = mongoose3.Schema;
var ContactUsSchema = new Schema2({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  companyName: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pageUrl: {
    type: String,
    require: true
  },
  device: {
    type: String,
    require: true
  },
  ip: {
    type: String,
    require: true
  }
});
ContactUsSchema.index({ email: 1, createdAt: -1 });
ContactUsSchema.index({ phoneNumber: 1 });
ContactUsSchema.index({ pageUrl: 1 });
var ContactUs = mongoose3.model("ContactUs", ContactUsSchema);

// controller/ContactusController.js
import path3 from "path";
import { fileURLToPath as fileURLToPath3 } from "url";
var __filename2 = fileURLToPath3(import.meta.url);
var __dirname3 = path3.dirname(__filename2);
var create = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  try {
    const imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
    const contactData = {
      image: imagePath,
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      companyName: data?.companyName,
      message: data?.message,
      pageUrl: data?.pageUrl
    };
    const newContact = await ContactUs.create(contactData);
    res.status(201).json({
      status: "success",
      message: "Your request has been sent to our team successfully",
      data: newContact
    });
  } catch (error) {
  }
});
var getAllContact = catchAsyncError(async (req, res, next) => {
  try {
    const contacts = await ContactUs.find();
    res.status(200).json({
      status: "success",
      data: contacts
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteContactById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delContact = await ContactUs.findByIdAndDelete(id);
    if (!delContact) {
      return res.json({ status: "fail", message: "Contact us not Found" });
    }
    res.json({
      status: "success",
      message: "User deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// routes/contactusrouter.js
var ContactusRouter = express2.Router();
ContactusRouter.route("/create").post(create);
ContactusRouter.route("/getAll").get(getAllContact);
ContactusRouter.route("/delete/:id").delete(deleteContactById);
var contactusrouter_default = ContactusRouter;

// routes/blogRouter.js
import express3 from "express";

// model/Blog.js
import mongoose4 from "mongoose";
import bcrypt2 from "bcrypt";
var Schema3 = mongoose4.Schema;
var questionAnswerSchema = new Schema3({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});
var blogSchema = new Schema3({
  title: {
    type: String,
    require: true
  },
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
  slug: {
    type: String,
    unique: true
  },
  shortDescription: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  imageAltText: {
    type: String,
    require: true
  },
  content: {
    type: String
  },
  processedContent: {
    type: String
  },
  qna: [questionAnswerSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ title: 1 });
blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ createdAt: -1 });
var Blogs = mongoose4.model("Blogs", blogSchema);

// controller/BlogController.js
import fs2 from "fs";
import path4 from "path";
import { fileURLToPath as fileURLToPath4 } from "url";
import { JSDOM } from "jsdom";
var __dirname4 = path4.dirname(fileURLToPath4(import.meta.url));
var processContentImages = (content) => {
  if (!content) return content;
  try {
    const dom = new JSDOM(`<!DOCTYPE html><body>${content}</body>`);
    const document = dom.window.document;
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (!img.hasAttribute("alt")) {
        let altText = "Blog image";
        if (src) {
          altText = src.split("/").pop().replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\d+/g, "").replace(/\s+/g, " ").trim();
        }
        img.setAttribute("alt", altText);
      }
      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }
    });
    return document.body.innerHTML;
  } catch (error) {
    console.error("Error processing content images:", error);
    return content;
  }
};
var createBlog = catchAsyncError(async (req, res, next) => {
  try {
    if (!req.files?.image) {
      return res.status(400).json({
        status: "fail",
        message: "Featured image is required"
      });
    }
    const imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
    const processedContent = processContentImages(req.body.content);
    let qna = [];
    if (req.body.qna !== void 0) {
      try {
        qna = typeof req.body.qna === "string" ? JSON.parse(req.body.qna) : req.body.qna;
      } catch (error) {
        console.error("Error parsing Q&A:", error);
      }
    }
    const blogData = {
      image: imagePath,
      content: processedContent,
      processedContent,
      title: req.body?.title,
      slug: req.body?.slug,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      keywords: req.body.keywords,
      robots: req.body.robots,
      shortDescription: req.body?.shortDescription,
      imageAltText: req.body.imageAltText || req.files.image[0].originalname.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      qna
    };
    const newBlog = await Blogs.create(blogData);
    res.status(200).json({
      status: "success",
      message: "Blog created successfully!",
      data: {
        ...newBlog.toObject(),
        image: `${imagePath}`
      }
    });
  } catch (error) {
    if (req.files?.image) {
      const filePath = path4.join(__dirname4, "images", req.files.image[0].filename);
      if (fs2.existsSync(filePath)) {
        fs2.unlinkSync(filePath);
      }
    }
    return next(error);
  }
});
var editorImageUpload = catchAsyncError(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }
    const imagePath = `images/${req.file.filename}`.replace(/\\/g, "/");
    const fullUrl = `${process.env.BASEURL}/${imagePath}`;
    const altText = req.file.originalname.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
    res.status(200).json({
      success: true,
      url: fullUrl,
      alt: altText
    });
  } catch (error) {
    console.error("Error uploading editor image:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed"
    });
  }
});
var getBlogById = catchAsyncError(async (req, res, next) => {
  const { id, slug } = req.query;
  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug"
    });
  }
  try {
    let blog;
    if (id) {
      blog = await Blogs.findById(id);
    } else if (slug) {
      blog = await Blogs.findOne({ slug });
    }
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found"
      });
    }
    const blogData = blog.toObject();
    if (blogData.image && !blogData.image.startsWith("http")) {
      blogData.image = `${blogData.image}`;
    }
    res.status(200).json({
      status: "success",
      data: blogData
    });
  } catch (error) {
    next(error);
  }
});
var updateBlog = catchAsyncError(async (req, res, next) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found"
      });
    }
    const processedContent = processContentImages(req.body.content || blog.content);
    let qna = blog.qna;
    if (req.body.qna !== void 0) {
      try {
        if (req.body.qna === "" || req.body.qna === null || req.body.qna === "[]") {
          qna = [];
        } else if (typeof req.body.qna === "string") {
          qna = JSON.parse(req.body.qna);
        } else if (Array.isArray(req.body.qna)) {
          qna = req.body.qna;
        }
      } catch (error) {
        console.error("Error parsing Q&A:", error);
      }
    }
    const updateData = {
      content: processedContent,
      processedContent,
      title: req.body?.title || blog.title,
      slug: req.body?.slug,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      keywords: req.body.keywords,
      robots: req.body.robots,
      shortDescription: req.body?.shortDescription || blog.shortDescription,
      imageAltText: req.body?.imageAltText || blog.imageAltText,
      qna
    };
    if (req.files?.image) {
      const newImagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
      updateData.image = newImagePath;
      if (blog.image) {
        const oldImageName = blog.image.split("/").pop();
        const oldImagePath = path4.join(__dirname4, "images", oldImageName);
        if (fs2.existsSync(oldImagePath)) {
          fs2.unlinkSync(oldImagePath);
        }
      }
      if (!updateData.imageAltText) {
        updateData.imageAltText = req.files.image[0].originalname.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      }
    }
    const updatedBlog = await Blogs.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    const responseData = updatedBlog.toObject();
    if (responseData.image && !responseData.image.startsWith("http")) {
      responseData.image = `${process.env.BASEURL}/${responseData.image}`;
    }
    res.status(200).json({
      status: "success",
      data: responseData,
      message: "Blog updated successfully!"
    });
  } catch (error) {
    if (req.files?.image) {
      const filePath = path4.join(__dirname4, "images", req.files.image[0].filename);
      if (fs2.existsSync(filePath)) {
        fs2.unlinkSync(filePath);
      }
    }
    return next(error);
  }
});
var getAllBlogs = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 5) || 1;
    const limit = parseInt(req.query.limit, 5) || 5;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search || "";
    const filter = {};
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } }
      ];
    }
    const [blogs, totalBlogs] = await Promise.all([
      Blogs.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Blogs.countDocuments()
    ]);
    const processedBlogs = blogs.map((blog) => ({
      ...blog,
      image: blog.image.startsWith("http") ? blog.image : `${blog.image}`
    }));
    res.status(200).json({
      status: "success",
      data: processedBlogs,
      pagination: {
        total: totalBlogs,
        page,
        limit,
        totalPages: Math.ceil(totalBlogs / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});
var deleteBlogById = catchAsyncError(async (req, res, next) => {
  try {
    const blog = await Blogs.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found"
      });
    }
    if (blog.image) {
      const imageName = blog.image.split("/").pop();
      const imagePath = path4.join(__dirname4, "images", imageName);
      if (fs2.existsSync(imagePath)) {
        fs2.unlinkSync(imagePath);
      }
    }
    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully!"
    });
  } catch (error) {
    next(error);
  }
});

// routes/blogRouter.js
var blogRouter = express3.Router();
blogRouter.route("/create").post(uploadBlogImages, createBlog);
blogRouter.route("/getAll").get(getAllBlogs);
blogRouter.route("/update/:id").put(uploadBlogImages, updateBlog);
blogRouter.route("/upload-editor-image").post(uploadEditorImage, editorImageUpload);
blogRouter.route("/get").get(getBlogById);
blogRouter.route("/delete/:id").delete(deleteBlogById);
var blogRouter_default = blogRouter;

// routes/blogProductRouter.js
import express4 from "express";

// model/BlogProduct.js
import mongoose5 from "mongoose";
var Schema4 = mongoose5.Schema;
var blogProductSchema = new Schema4({
  blogId: {
    type: mongoose5.Schema.Types.ObjectId,
    ref: "Blogs",
    required: true
  },
  productId: {
    type: mongoose5.Schema.Types.ObjectId,
    ref: "Products",
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
blogProductSchema.index({ blogId: 1, productId: 1 }, { unique: true });
blogProductSchema.index({ blogId: 1, order: 1 });
blogProductSchema.index({ productId: 1 });
var BlogProduct = mongoose5.model("BlogProduct", blogProductSchema);

// model/Product.js
import mongoose6 from "mongoose";
var Schema5 = mongoose6.Schema;
var productSchema = new Schema5({
  brandId: {
    type: mongoose6.Schema.Types.ObjectId,
    ref: "Brands"
  },
  categoryId: {
    type: mongoose6.Schema.Types.ObjectId,
    ref: "MidCategory"
  },
  name: {
    type: String,
    require: true
  },
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
  slug: {
    type: String,
    unique: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      required: true
    }
  }],
  actualPrice: {
    type: String,
    require: true
  },
  size: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  bannerImage: {
    type: String,
    require: true
  },
  bannerImageAltText: {
    type: String,
    require: true
  },
  bannerTitle: {
    type: String,
    require: true
  },
  bannerContent: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ brandId: 1, categoryId: 1 });
productSchema.index({ categoryId: 1, createdAt: -1 });
productSchema.index({ brandId: 1, createdAt: -1 });
productSchema.index({ status: 1, createdAt: -1 });
productSchema.index({ name: 1 });
var Products = mongoose6.model("Products", productSchema);

// controller/BlogProductController.js
var createBlogProduct = catchAsyncError(async (req, res, next) => {
  try {
    const { blogId, productId, order } = req.body;
    if (!blogId || !productId) {
      return res.status(400).json({
        status: "fail",
        message: "Blog ID and Product ID are required"
      });
    }
    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found"
      });
    }
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found"
      });
    }
    const existing = await BlogProduct.findOne({ blogId, productId });
    if (existing) {
      return res.status(400).json({
        status: "fail",
        message: "This product is already associated with this blog"
      });
    }
    const blogProduct = await BlogProduct.create({
      blogId,
      productId,
      order: order || 0
    });
    const populated = await BlogProduct.findById(blogProduct._id).populate("blogId", "title slug").populate("productId", "name slug images");
    res.status(200).json({
      status: "success",
      message: "Blog product association created successfully!",
      data: populated
    });
  } catch (error) {
    next(error);
  }
});
var getBlogProductsByBlogId = catchAsyncError(async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blogProducts = await BlogProduct.find({ blogId }).populate("productId", "name slug images actualPrice size description").sort({ order: 1, createdAt: -1 }).lean();
    res.status(200).json({
      status: "success",
      data: blogProducts
    });
  } catch (error) {
    next(error);
  }
});
var getAllBlogProducts = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search || "";
    const filter = {};
    if (searchQuery) {
      filter.$or = [
        { "blogId.title": { $regex: searchQuery, $options: "i" } },
        { "productId.name": { $regex: searchQuery, $options: "i" } }
      ];
    }
    const [blogProducts, total] = await Promise.all([
      BlogProduct.find(filter).populate("blogId", "title slug").populate("productId", "name slug images").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      BlogProduct.countDocuments(filter)
    ]);
    res.status(200).json({
      status: "success",
      data: blogProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});
var updateBlogProduct = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { blogId, productId, order } = req.body;
    const blogProduct = await BlogProduct.findById(id);
    if (!blogProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Blog product association not found"
      });
    }
    if (blogId) {
      const blog = await Blogs.findById(blogId);
      if (!blog) {
        return res.status(404).json({
          status: "fail",
          message: "Blog not found"
        });
      }
    }
    if (productId) {
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: "Product not found"
        });
      }
      const existing = await BlogProduct.findOne({
        blogId: blogId || blogProduct.blogId,
        productId,
        _id: { $ne: id }
      });
      if (existing) {
        return res.status(400).json({
          status: "fail",
          message: "This product is already associated with this blog"
        });
      }
    }
    const updateData = {};
    if (blogId) updateData.blogId = blogId;
    if (productId) updateData.productId = productId;
    if (order !== void 0) updateData.order = order;
    const updated = await BlogProduct.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate("blogId", "title slug").populate("productId", "name slug images");
    res.status(200).json({
      status: "success",
      message: "Blog product association updated successfully!",
      data: updated
    });
  } catch (error) {
    next(error);
  }
});
var deleteBlogProduct = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogProduct = await BlogProduct.findByIdAndDelete(id);
    if (!blogProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Blog product association not found"
      });
    }
    res.status(200).json({
      status: "success",
      message: "Blog product association deleted successfully!"
    });
  } catch (error) {
    next(error);
  }
});
var getBlogProductById = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogProduct = await BlogProduct.findById(id).populate("blogId", "title slug").populate("productId", "name slug images actualPrice size description");
    if (!blogProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Blog product association not found"
      });
    }
    res.status(200).json({
      status: "success",
      data: blogProduct
    });
  } catch (error) {
    next(error);
  }
});

// routes/blogProductRouter.js
var blogProductRouter = express4.Router();
blogProductRouter.route("/create").post(createBlogProduct);
blogProductRouter.route("/getAll").get(getAllBlogProducts);
blogProductRouter.route("/get/:id").get(getBlogProductById);
blogProductRouter.route("/blog/:blogId").get(getBlogProductsByBlogId);
blogProductRouter.route("/update/:id").put(updateBlogProduct);
blogProductRouter.route("/delete/:id").delete(deleteBlogProduct);
var blogProductRouter_default = blogProductRouter;

// routes/FaqRouter.js
import express5 from "express";

// model/Faq.js
import mongoose7 from "mongoose";
import bcrypt3 from "bcrypt";
var Schema6 = mongoose7.Schema;
var FaqSchema = new Schema6({
  question: {
    type: String,
    require: true
  },
  answer: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
var FAQ = mongoose7.model("FAQs", FaqSchema);

// controller/FaqController.js
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "di4vtp5l3",
  api_key: "855971682725667",
  api_secret: "U8n6H8d_rhDzSEBr03oHIqaPF5k"
});
var createFaq = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const newBlog = await FAQ.create(data);
  res.status(200).json({
    status: "success",
    message: "FAQ created successfully!",
    data: newBlog
  });
});
var updateFaq = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const faqId = req.params.id;
  const updatedFaq = await FAQ.findByIdAndUpdate(faqId, data, {
    new: true
  });
  if (!updatedFaq) {
    return res.status(404).json({ message: "FAq not found" });
  }
  res.status(200).json({
    status: "success",
    data: updatedFaq,
    message: "Faq updated successfully!"
  });
});
var getFaqById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await FAQ.findById(id);
    res.json({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
};
var getAllFaq = catchAsyncError(async (req, res, next) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json({
      status: "success",
      data: faqs
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteFaqById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delFaq = await FAQ.findByIdAndDelete(id);
    if (!delFaq) {
      return res.json({ status: "fail", message: "FAQ not Found" });
    }
    res.json({
      status: "success",
      message: "FAQ deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// routes/FaqRouter.js
var FaqRouter = express5.Router();
FaqRouter.route("/create").post(createFaq);
FaqRouter.route("/getAll").get(getAllFaq);
FaqRouter.route("/get/:id").get(getFaqById);
FaqRouter.route("/update/:id").put(updateFaq);
FaqRouter.route("/delete/:id").delete(deleteFaqById);
var FaqRouter_default = FaqRouter;

// routes/AdminRouter.js
import express6 from "express";

// model/admin.js
import mongoose8 from "mongoose";
var Schema7 = mongoose8.Schema;
var adminSchema = new Schema7({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});
var Admin = mongoose8.model("Admin", adminSchema);

// controller/AdminController.js
import jwt from "jsonwebtoken";
var registerAdmin = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const email = data?.email;
  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "Email already exist", status: "fail" });
  } else {
    const user = await Admin.create(data);
    const token = jwt.sign(
      {
        userId: user._id.toString()
      },
      "somesecretsecret",
      { expiresIn: "30d" }
    );
    res.status(200).json({
      status: "success",
      message: "New Admin Created successfully",
      token,
      data: user
    });
  }
});
var loginAdmin = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Admin not exist", status: "fail" });
    }
    const user = await Admin.findOne({ email, password });
    console.log("response from reveir data ===", user);
    if (!user) {
      res.status(400).json({ message: "Password does not match", status: "fail" });
    }
    const token = jwt.sign(
      {
        userId: user._id.toString()
      },
      "somesecretsecret",
      { expiresIn: "30d" }
    );
    res.status(200).json({
      status: "success",
      token,
      message: "Admin login successfully",
      data: user
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
var getAdminById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const data = await Admin.findById(userId);
    res.json({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
var UpdateProfile = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const userId = req.params.id;
  const updatedUser = await Admin.findByIdAndUpdate(userId, data, {
    new: true
  });
  if (!updatedUser) {
    return res.status(404).json({ message: "Admin not found" });
  }
  res.status(200).json({
    status: "success",
    data: updatedUser,
    message: "Admin Updated Successfully!"
  });
});
var getAllAdmin = catchAsyncError(async (req, res, next) => {
  try {
    const users = await Admin.find();
    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteCustomerById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCustomer = await Admin.findByIdAndDelete(id);
    if (!delCustomer) {
      return res.json({ status: "fail", message: "Admin not Found" });
    }
    res.json({
      status: "success",
      message: "Admin deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// routes/AdminRouter.js
import jwt2 from "jsonwebtoken";
var adminRoute = express6.Router();
adminRoute.route("/create").post(registerAdmin);
adminRoute.route("/login").post(loginAdmin);
adminRoute.route("/getAll").get(getAllAdmin);
adminRoute.route("/get/:id").get(getAdminById);
adminRoute.route("/update/:id").put(UpdateProfile);
adminRoute.route("/delete/:id").delete(deleteCustomerById);
var AdminRouter_default = adminRoute;

// routes/ProductRouter.js
import express7 from "express";

// model/Brand.js
import mongoose9 from "mongoose";
var Schema8 = mongoose9.Schema;
var brandSchema = new Schema8({
  name: {
    type: String,
    require: true
  },
  bannerImage: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    unique: true
  },
  bannerAltText: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  imageAltText: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
brandSchema.index({ slug: 1 }, { unique: true });
brandSchema.index({ name: 1 });
brandSchema.index({ status: 1, createdAt: -1 });
brandSchema.index({ createdAt: -1 });
var Brands = mongoose9.model("Brands", brandSchema);

// model/MidCategory.js
import mongoose10 from "mongoose";
var Schema9 = mongoose10.Schema;
var questionAnswerSchema2 = new Schema9({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});
var brandItemSchema = new Schema9({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
var midcategorySchema = new Schema9({
  brandId: {
    type: mongoose10.Schema.Types.ObjectId,
    ref: "Brands"
  },
  title: {
    type: String,
    require: true
  },
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
  slug: {
    type: String,
    unique: true
  },
  subTitle: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  details: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    require: true
  },
  iconAltText: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  imageAltText: {
    type: String,
    require: true
  },
  videoUpperHeading: {
    type: String,
    require: false
  },
  videoUpperDescription: {
    type: String,
    require: false
  },
  videoLink: {
    type: String,
    require: true
  },
  videoDescription: {
    type: String,
    require: false
  },
  bannerTitleFirst: {
    type: String,
    require: true
  },
  bannerContentFirst: {
    type: String,
    require: true
  },
  bannerImageFirst: {
    type: String,
    require: true
  },
  bannerImageFirstAltText: {
    type: String,
    require: true
  },
  bannerBgColor: {
    type: String,
    default: ""
  },
  faqImage: {
    type: String,
    default: ""
  },
  faqImageAltText: {
    type: String,
    default: ""
  },
  showBottomHero: {
    type: Boolean,
    default: false
  },
  showTrustBanner: {
    type: Boolean,
    default: false
  },
  showServiceSelectionCard: {
    type: Boolean,
    default: false
  },
  showTabsSection1: {
    type: Boolean,
    default: false
  },
  showTabsSection2: {
    type: Boolean,
    default: false
  },
  qna: [questionAnswerSchema2],
  brands: [brandItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
midcategorySchema.index({ slug: 1 }, { unique: true });
midcategorySchema.index({ title: 1 });
midcategorySchema.index({ brandId: 1, status: 1 });
midcategorySchema.index({ createdAt: -1 });
var MidCategory = mongoose10.model("MidCategory", midcategorySchema);

// controller/ProductController.js
import fs3 from "fs";
import path5 from "path";
import { fileURLToPath as fileURLToPath5 } from "url";
import mongoose11 from "mongoose";
var __filename3 = fileURLToPath5(import.meta.url);
var __dirname5 = path5.dirname(__filename3);
var formatFileName = (fileName) => {
  if (!fileName) return "";
  let formatted = fileName.replace(/\.[^/.]+$/, "");
  formatted = formatted.replace(/[_-]/g, " ");
  formatted = formatted.replace(/[^\w\s]/gi, "");
  formatted = formatted.trim().split(/\s+/).map(
    (word) => word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
  ).join(" ");
  return formatted;
};
var createProducts = catchAsyncError(async (req, res, next) => {
  const {
    name,
    slug,
    metaTitle,
    metaDescription,
    keywords,
    robots,
    actualPrice,
    size,
    description,
    bannerTitle,
    bannerContent,
    brandId,
    categoryId,
    bannerImageAltText
  } = req.body;
  if (!req.files || !req.files["images"] || !req.files["bannerImage"]) {
    return res.status(400).json({
      status: "fail",
      message: "Both product images (field name: 'images') and banner image (field name: 'bannerImage') are required"
    });
  }
  const existingProduct = await Products.findOne({ name });
  if (existingProduct) {
    if (req.files["images"]) {
      req.files["images"].forEach((image) => {
        if (fs3.existsSync(image.path)) {
          fs3.unlinkSync(image.path);
        }
      });
    }
    if (req.files["bannerImage"]) {
      const bannerPath = req.files["bannerImage"][0].path;
      if (fs3.existsSync(bannerPath)) {
        fs3.unlinkSync(bannerPath);
      }
    }
    return res.status(409).json({
      status: "fail",
      message: "Product with this name already exists"
    });
  }
  try {
    const productImages = Array.isArray(req.files["images"]) ? req.files["images"] : [req.files["images"]];
    const images = productImages.map((image) => ({
      url: `images/${image.filename}`.replace(/\\/g, "/"),
      altText: formatFileName(image.originalname)
    }));
    const bannerImageFile = Array.isArray(req.files["bannerImage"]) ? req.files["bannerImage"][0] : req.files["bannerImage"];
    const bannerPath = `images/${bannerImageFile.filename}`.replace(/\\/g, "/");
    const productData = {
      name,
      slug,
      metaTitle,
      metaDescription,
      keywords,
      robots,
      actualPrice,
      size,
      description,
      bannerTitle,
      bannerContent,
      images,
      bannerImage: bannerPath,
      bannerImageAltText,
      brandId,
      categoryId
    };
    const newProduct = await Products.create(productData);
    res.status(201).json({
      status: "success",
      message: "Product created successfully!",
      data: newProduct
    });
  } catch (error) {
    if (req.files["images"]) {
      req.files["images"].forEach((image) => {
        fs3.unlinkSync(path5.join(__dirname5, "..", image.path));
      });
    }
    if (req.files["bannerImage"]) {
      const bannerImageFile = Array.isArray(req.files["bannerImage"]) ? req.files["bannerImage"][0] : req.files["bannerImage"];
      fs3.unlinkSync(path5.join(__dirname5, "..", bannerImageFile.path));
    }
    return next(error);
  }
});
var getBrandProductsByCategory = catchAsyncError(async (req, res, next) => {
  const brandId = req.params.brandId;
  try {
    const brand = await Brands.findById(brandId);
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "Brand not found"
      });
    }
    const productsByCategory = await Products.aggregate([
      {
        $match: {
          brandId: new mongoose11.Types.ObjectId(brandId)
        }
      },
      {
        $lookup: {
          from: "midcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$categoryInfo._id",
          categoryName: { $first: "$categoryInfo.title" },
          categoryImage: { $first: "$categoryInfo.image" },
          categorySlug: { $first: "$categoryInfo.slug" },
          products: {
            $push: {
              _id: "$_id",
              name: "$name",
              slug: "$slug",
              price: "$price",
              images: "$images",
              actualPrice: "$actualPrice",
              size: "$size",
              description: "$description"
            }
          }
        }
      },
      {
        $match: {
          _id: { $ne: null }
        }
      },
      {
        $project: {
          _id: 1,
          categoryName: 1,
          categoryImage: 1,
          categorySlug: 1,
          products: 1,
          productCount: { $size: "$products" }
        }
      },
      {
        $sort: { categoryName: 1 }
      }
    ]);
    res.status(200).json({
      status: "success",
      data: {
        brand: {
          _id: brand._id,
          name: brand.name,
          image: brand.image,
          slug: brand.slug
        },
        categories: productsByCategory
      }
    });
  } catch (error) {
    next(error);
  }
});
var getRelatedProducts = catchAsyncError(async (req, res, next) => {
  const productSlug = req.query.slug;
  try {
    const mainProduct = await Products.findOne({ slug: productSlug });
    if (!mainProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found"
      });
    }
    const relatedProducts = await Products.find({
      _id: { $ne: mainProduct._id },
      categoryId: mainProduct.categoryId
    }).limit(8).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      data: {
        relatedProducts
      }
    });
  } catch (error) {
    next(error);
  }
});
var getProductsByCategory = catchAsyncError(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const page = parseInt(req.query.page) || 1;
  const limit = 12;
  try {
    const category = await MidCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found"
      });
    }
    console.log("Found category:", category.name);
    const skip = (page - 1) * limit;
    const queryConditions = {
      $or: [
        { category: categoryId },
        { midCategory: categoryId },
        { categoryId }
      ]
    };
    const products = await Products.find(queryConditions).skip(skip).limit(limit).lean();
    const totalProducts = await Products.countDocuments(queryConditions);
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({
      status: "success",
      results: products.length,
      currentPage: page,
      totalPages,
      totalProducts,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
});
var getProductsById = async (req, res, next) => {
  const { id, slug } = req.query;
  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug"
    });
  }
  try {
    let query;
    if (id) {
      query = Products.findById(id);
    } else if (slug) {
      query = Products.findOne({ slug });
    }
    query = query.populate("categoryId", "_id title slug").populate("brandId", "_id name slug");
    const data = await query.exec();
    if (!data) {
      return res.status(404).json({
        status: "fail",
        error: "Product not found"
      });
    }
    res.json({
      status: "success",
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
};
var updateProducts = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  try {
    const currentProduct = await Products.findById(productId);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : currentProduct.images;
    const updateData = {
      ...req.body,
      // Remove image-related fields that we'll handle separately
      images: void 0,
      bannerImage: void 0,
      existingImages: void 0,
      description: req.body.description
    };
    let updatedImages = [];
    if (existingImages && existingImages.length > 0) {
      updatedImages = existingImages.map((img) => ({
        url: img.url,
        altText: img.altText || formatFileName(img.originalPath)
      }));
    }
    if (req.files && req.files["images"]) {
      const newImages = Array.isArray(req.files["images"]) ? req.files["images"] : [req.files["images"]];
      const uploadedImages = newImages.map((image) => ({
        url: `images/${image.filename}`.replace(/\\/g, "/"),
        altText: req.body.imagesAltTexts?.[updatedImages.length] || formatFileName(image.originalname),
        originalPath: image.originalname
      }));
      updatedImages = [...updatedImages, ...uploadedImages];
    }
    if (updatedImages.length > 0) {
      updateData.images = updatedImages;
    }
    if (req.files && req.files["bannerImage"]) {
      const bannerImageFile = req.files["bannerImage"][0] || req.files["bannerImage"];
      updateData.bannerImage = `images/${bannerImageFile.filename}`.replace(/\\/g, "/");
      updateData.bannerImageAltText = req.body.bannerImageAltText || formatFileName(bannerImageFile.originalname);
    } else if (req.body.bannerImageAltText) {
      updateData.bannerImageAltText = req.body.bannerImageAltText;
    }
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedProduct,
      message: "Product updated successfully!"
    });
  } catch (error) {
    if (req.files) {
      Object.values(req.files).forEach((fileArray) => {
        if (Array.isArray(fileArray)) {
          fileArray.forEach((file) => {
            if (fs3.existsSync(file.path)) {
              fs3.unlinkSync(file.path);
            }
          });
        } else if (fs3.existsSync(fileArray.path)) {
          fs3.unlinkSync(fileArray.path);
        }
      });
    }
    next(error);
  }
});
var getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 15;
    const skip = (page - 1) * perPage;
    const sortOption = getSortOption(req.query.sort);
    let filter = {};
    if (req.query.categoryId) {
      filter["categoryId"] = req.query.categoryId;
    } else if (req.query.categoryTitle) {
      filter["categoryId"] = await Category.findOne({
        title: new RegExp(req.query.categoryTitle, "i")
      }).select("_id");
    }
    if (req.query.brandId) {
      filter["brandId"] = req.query.brandId;
    } else if (req.query.brandName) {
      filter["brandId"] = await Brands.findOne({
        name: new RegExp(req.query.brandName, "i")
      }).select("_id");
    }
    if (req.query.name) {
      filter.name = new RegExp(req.query.name, "i");
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const products = await Products.find(filter).populate({
      path: "categoryId",
      select: "title slug"
    }).populate({
      path: "brandId",
      select: "name slug"
    }).sort(sortOption).skip(skip).limit(perPage);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);
    res.status(200).json({
      status: "success",
      data: products,
      totalProducts,
      pagination: {
        page,
        perPage,
        totalPages
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
      message: error.message
    });
  }
});
var searchProduct = catchAsyncError(async (req, res, next) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const products = await Products.find({
      name: { $regex: name, $options: "i" }
    });
    res.status(200).json({ data: products, status: "success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
var getSortOption = (sort) => {
  switch (sort) {
    case "releaseDate-asc":
      return { createdAt: 1 };
    case "releaseDate-desc":
      return { createdAt: -1 };
    case "price-asc":
      return { discountPrice: 1 };
    case "price-desc":
      return { discountPrice: -1 };
    default:
      return { createdAt: -1 };
  }
};
var deleteproductsById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const existing = await Products.findById(id);
    const delProducts = await Products.findByIdAndDelete(id);
    if (!delProducts) {
      return res.json({ status: "fail", message: "Product not Found" });
    }
    res.json({
      status: "success",
      message: "Product deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// routes/ProductRouter.js
var productRouter = express7.Router();
productRouter.route("/create").post(uploadProductImages, createProducts);
productRouter.route("/getAll").get(getAllProducts);
productRouter.route("/categoryProducts/:brandId/products-by-category").get(getBrandProductsByCategory);
productRouter.route("/related-products").get(getRelatedProducts);
productRouter.route("/categoryProducts/:categoryId").get(getProductsByCategory);
productRouter.route("/search").get(searchProduct);
productRouter.route("/get").get(getProductsById);
productRouter.route("/delete/:id").delete(deleteproductsById);
productRouter.route("/update/:id").put(uploadProductImages, updateProducts);
var ProductRouter_default = productRouter;

// routes/BrandRouter.js
import express8 from "express";

// controller/BrandController.js
import fs4 from "fs";
import path6 from "path";
import { fileURLToPath as fileURLToPath6 } from "url";

// middleware/cache.js
import NodeCache from "node-cache";
var apiCache = new NodeCache({
  stdTTL: 60 * 5,
  // default 5 minutes
  checkperiod: 60,
  useClones: false
});
function cacheMiddleware(ttlSeconds = 60 * 5) {
  return (req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }
    res.setHeader("Cache-Control", `public, max-age=${ttlSeconds}`);
    res.setHeader("Vary", "Accept-Encoding");
    const cacheKey = `${req.method}:${req.originalUrl}`;
    const cached = apiCache.get(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      try {
        if (res.statusCode === 200 && body) {
          apiCache.set(cacheKey, body, ttlSeconds);
        }
      } catch {
      }
      return originalJson(body);
    };
    next();
  };
}
function clearAllCache() {
  apiCache.flushAll();
}

// controller/BrandController.js
var __filename4 = fileURLToPath6(import.meta.url);
var __dirname6 = path6.dirname(__filename4);
var createBrand = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Category name is required"
    });
  }
  if (!req.files?.image || !req.files?.bannerImage) {
    return res.status(400).json({
      status: "fail",
      message: "Both image and banner image are required"
    });
  }
  const existingBrand = await Brands.findOne({ name });
  if (existingBrand) {
    if (req.files?.image) {
      const imagePath = req.files.image[0].path;
      if (fs4.existsSync(imagePath)) {
        fs4.unlinkSync(imagePath);
      }
    }
    if (req.files?.bannerImage) {
      const bannerPath = req.files.bannerImage[0].path;
      if (fs4.existsSync(bannerPath)) {
        fs4.unlinkSync(bannerPath);
      }
    }
    return res.status(409).json({
      status: "fail",
      message: "Category with this name already exists"
    });
  }
  const formatAltText = (filename) => {
    return filename.replace(/\.[^/.]+$/, "").replace(/-/g, " ");
  };
  try {
    const imagePath = `images/${req.files.image[0].originalname}`.replace(/\\/g, "/");
    const bannerPath = `images/${req.files.bannerImage[0].originalname}`.replace(/\\/g, "/");
    const brandData = {
      image: imagePath,
      bannerImage: bannerPath,
      name: req.body.name,
      content: req.body.content,
      bannerAltText: req.body.bannerAltText,
      imageAltText: req.body.imageAltText,
      slug: req.body.slug,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      keywords: req.body.keywords,
      robots: req.body.robots
    };
    const newBrand = await Brands.create(brandData);
    res.status(201).json({
      status: "success",
      message: "Category created successfully!",
      data: newBrand
    });
    try {
      clearAllCache();
    } catch {
    }
  } catch (error) {
    if (req.files?.image) {
      fs4.unlinkSync(path6.join(__dirname6, "..", req.files.image[0].path));
    }
    if (req.files?.bannerImage) {
      fs4.unlinkSync(path6.join(__dirname6, "..", req.files.bannerImage[0].path));
    }
    return next(error);
  }
});
var getBrandById = async (req, res, next) => {
  const { id, slug } = req.query;
  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug"
    });
  }
  try {
    let brand;
    if (id) {
      brand = await Brands.findById(id);
    } else if (slug) {
      brand = await Brands.findOne({ slug });
    }
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        error: "Brand not found"
      });
    }
    res.json({
      status: "success",
      data: brand
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
};
var updateBrand = catchAsyncError(async (req, res, next) => {
  const brandId = req.params.id;
  const { name, content, bannerAltText, imageAltText, slug, metaTitle, metaDescription, keywords, robots } = req.body;
  console.log(req.body);
  const existingBrand = await Brands.findById(brandId);
  if (!existingBrand) {
    return res.status(404).json({
      status: "fail",
      message: "Brand not found"
    });
  }
  console.log(existingBrand);
  if (name && name !== existingBrand.name) {
    const nameExists = await Brands.findOne({ name });
    if (nameExists) {
      return res.status(409).json({
        status: "fail",
        message: "Brand with this name already exists!"
      });
    }
  }
  const updateData = {
    name: name || existingBrand.name,
    content,
    bannerAltText,
    imageAltText,
    slug,
    metaTitle,
    metaDescription,
    keywords,
    robots
  };
  try {
    if (req.files?.image) {
      updateData.image = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
    }
    if (req.files?.bannerImage) {
      updateData.bannerImage = `images/${req.files.bannerImage[0].filename}`.replace(/\\/g, "/");
    }
    const updatedBrand = await Brands.findByIdAndUpdate(
      brandId,
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedBrand,
      message: "Brand updated successfully!"
    });
    try {
      clearAllCache();
    } catch {
    }
  } catch (error) {
    if (req.files?.image) {
      fs4.unlinkSync(path6.join(__dirname6, "..", "images", "images", req.files.image[0].filename));
    }
    if (req.files?.bannerImage) {
      fs4.unlinkSync(path6.join(__dirname6, "..", "images", "images", req.files.bannerImage[0].filename));
    }
    return next(error);
  }
});
var getAllBrand = async (req, res, next) => {
  try {
    const { page = 1, limit = 4, search = "", all = false } = req.query;
    const basePipeline = [
      {
        $match: {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { slug: { $regex: search, $options: "i" } }
          ]
        }
      },
      {
        $lookup: {
          from: "midcategories",
          localField: "_id",
          foreignField: "brandId",
          as: "midcategories",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                slug: 1,
                icon: 1,
                image: 1
              }
            }
          ]
        }
      },
      {
        $project: {
          name: 1,
          // image: 1,
          // imageAltText: 1,
          // bannerImage: 1,
          // bannerAltText: 1,
          // bgColor: 1,
          // content: 1,
          createdAt: 1,
          slug: 1,
          // metaTitle: 1,
          // metaDescription: 1,
          // keywords: 1,
          // robots: 1,
          status: 1,
          midcategories: 1
        }
      }
    ];
    if (all === "true") {
      const brands2 = await Brands.aggregate(basePipeline);
      return res.status(200).json({
        status: "success",
        data: brands2,
        totalBrands: brands2.length
      });
    }
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const paginationPipeline = [
      ...basePipeline,
      { $skip: skip },
      { $limit: parseInt(limit, 10) }
    ];
    const [brands, totalBrands] = await Promise.all([
      Brands.aggregate(paginationPipeline),
      Brands.countDocuments({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { slug: { $regex: search, $options: "i" } }
        ]
      })
    ]);
    res.status(200).json({
      status: "success",
      data: brands,
      totalBrands,
      pagination: {
        total: totalBrands,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(totalBrands / parseInt(limit, 10))
      }
    });
  } catch (error) {
    next(error);
  }
};
var deleteBrandById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delBrands = await Brands.findByIdAndDelete(id);
    if (!delBrands) {
      return res.json({ status: "fail", message: "Category not Found" });
    }
    res.json({
      status: "success",
      message: "Category deleted successfully!"
    });
    try {
      clearAllCache();
    } catch {
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// routes/BrandRouter.js
var brandRouter = express8.Router();
brandRouter.route("/create").post(uploadBrandImages, createBrand);
brandRouter.route("/getAll").get(getAllBrand);
brandRouter.route("/update/:id").put(uploadBrandImages, updateBrand);
brandRouter.route("/get").get(getBrandById);
brandRouter.route("/delete/:id").delete(deleteBrandById);
var BrandRouter_default = brandRouter;

// routes/CheckoutRouter.js
import express9 from "express";

// controller/CheckoutController.js
import Stripe from "stripe";

// model/Checkout.js
import mongoose12 from "mongoose";
var Schema10 = mongoose12.Schema;
var checkoutSchema = new Schema10({
  email: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  companyName: {
    type: String,
    require: true
  },
  totalBill: {
    type: String,
    require: true
  },
  note: {
    type: String,
    require: true
  },
  userId: {
    type: mongoose12.Schema.Types.ObjectId,
    ref: "User"
  },
  delivery: {
    type: {
      country: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      },
      addressLine1: {
        type: String,
        required: true
      },
      addressLine2: {
        type: String,
        required: false
      }
    },
    require: true
  },
  productIds: [
    {
      type: mongoose12.Schema.Types.ObjectId,
      ref: "Products"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  paymentIntentId: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Refunded", "Failed"],
    default: "Pending"
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
checkoutSchema.index({ userId: 1, createdAt: -1 });
checkoutSchema.index({ email: 1, createdAt: -1 });
checkoutSchema.index({ paymentStatus: 1, createdAt: -1 });
checkoutSchema.index({ status: 1, createdAt: -1 });
var Checkout = mongoose12.model("Checkout", checkoutSchema);

// controller/CheckoutController.js
import cloudinary2 from "cloudinary";
var stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
cloudinary2.v2.config({
  cloud_name: "di4vtp5l3",
  api_key: "855971682725667",
  api_secret: "U8n6H8d_rhDzSEBr03oHIqaPF5k"
});
var createCheckout = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const newCheckout = await Checkout.create(data);
  res.status(200).json({
    status: "success",
    message: "Your Order has been placed successfully!",
    data: newCheckout
  });
});
var createPaymentIntent = catchAsyncError(async (req, res, next) => {
  const { totalBill, email, userId, productIds } = req.body;
  const amount = Math.round(parseFloat(totalBill) * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    metadata: {
      userId: userId.toString(),
      productIds: JSON.stringify(productIds),
      email
    },
    receipt_email: email
  });
  res.status(200).json({
    status: "success",
    clientSecret: paymentIntent.client_secret
  });
});
var getCheckoutById = async (req, res, next) => {
  const id = req?.params?.id;
  try {
    const data = await Checkout.findById(id).populate({
      path: "productIds",
      model: "Products",
      select: "name images actualPrice size description bannerImage bannerTitle bannerContent"
    });
    if (!data) {
      return res.status(404).json({
        status: "fail",
        message: "Checkout not found"
      });
    }
    res.json({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
      message: error.message
    });
  }
};
var updateCheckout = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const orderId = req.params.id;
  const updatedCheckout = await Checkout.findByIdAndUpdate(orderId, data, {
    new: true
  });
  if (!updatedCheckout) {
    return res.status(404).json({ message: "blog not found" });
  }
  res.status(200).json({
    status: "success",
    data: updatedCheckout,
    message: "Checkout updated successfully!"
  });
});
var getAllCheckout = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalCount = await Checkout.countDocuments();
    const checkout = await Checkout.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({
      status: "success",
      data: checkout,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error("Error fetching checkout records:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteCheckoutById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCheckout = await Checkout.findByIdAndDelete(id);
    if (!delCheckout) {
      return res.json({ status: "fail", message: "Checkout not Found" });
    }
    res.json({
      status: "success",
      message: "Checkout deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
var getUserCheckouts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const checkouts = await Checkout.find({ userId }).populate({
      path: "productIds",
      model: "Products",
      populate: [
        { path: "categoryId", model: "Category" },
        { path: "brandId", model: "Brand" },
        { path: "platform", model: "Platform" },
        { path: "region", model: "Region" }
      ]
    }).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 });
    const totalCheckouts = await Checkout.countDocuments({ userId });
    const totalPages = Math.ceil(totalCheckouts / limit);
    res.status(200).json({
      status: "success",
      data: checkouts,
      pagination: {
        total: totalCheckouts,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error("Error fetching checkouts:", error);
    res.status(500).json({ status: "fail", error: "Internal Server Error" });
  }
};

// routes/CheckoutRouter.js
var checkoutRouter = express9.Router();
checkoutRouter.route("/create").post(createCheckout);
checkoutRouter.route("/getAll").get(getAllCheckout);
checkoutRouter.route("/update/:id").put(updateCheckout);
checkoutRouter.post("/create-payment-intent", createPaymentIntent);
checkoutRouter.route("/get/:id").get(getCheckoutById);
checkoutRouter.route("/getByUser/:userId").get(getUserCheckouts);
checkoutRouter.route("/delete/:id").delete(deleteCheckoutById);
var CheckoutRouter_default = checkoutRouter;

// routes/userRoute.js
import express10 from "express";

// controller/userController.js
import bcrypt5 from "bcrypt";

// model/User.js
import mongoose13 from "mongoose";
import bcrypt4 from "bcrypt";
var Schema11 = mongoose13.Schema;
var userSchema = new Schema11({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "blocked"],
    default: "approved"
  }
});
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 });
userSchema.index({ status: 1 });
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt4.hash(this.password, 10);
  next();
});
var User = mongoose13.model("User", userSchema);

// controller/userController.js
import jwt3 from "jsonwebtoken";
import cloudinary3 from "cloudinary";
cloudinary3.v2.config({
  cloud_name: "dt8egjsqc",
  api_key: "687626968186366",
  api_secret: "jHt0Sl3cUe183ElXpTkTxr5Alok"
});
var register = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const email = data?.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists", status: "fail" });
  }
  const user = await User.create(data);
  const token = jwt3.sign({ id: user._id, email: user.email }, TOKEN_KEY, {
    expiresIn: "1h"
  });
  res.status(200).json({
    status: "success",
    message: "User registered successfully",
    data: {
      user,
      token
    }
  });
});
var login = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Request body:", req.body);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        status: "fail",
        message: "Account not found"
      });
    }
    console.log("Existing user password:", existingUser.password);
    if (!password) {
      return res.status(400).json({
        status: "fail",
        message: "Password is required"
      });
    }
    if (!existingUser.password) {
      return res.status(500).json({
        status: "fail",
        message: "User password is missing in the database"
      });
    }
    const isPasswordValid = await bcrypt5.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password"
      });
    }
    const token = jwt3.sign(
      { id: existingUser._id, email: existingUser.email },
      TOKEN_KEY,
      {
        expiresIn: "1h"
      }
    );
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user: existingUser,
        token
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
});
var getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const data = await User.findById(userId);
    res.json({
      status: 200,
      data
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
var UpdateProfile2 = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    let updatedFields = { ...data };
    if (req.files && req.files.image) {
      let image = req.files.image;
      const result = await cloudinary3.v2.uploader.upload(image.tempFilePath);
      updatedFields.image = result.url;
    }
    if (updatedFields.password) {
      console.log("Password is being updated");
      updatedFields.password = await bcrypt5.hash(updatedFields.password, 10);
      console.log("Hashed password:", updatedFields.password);
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      // Use $set to update only provided fields
      { new: true }
      // Return the updated document
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = void 0;
    res.status(200).json({
      status: 200,
      data: user,
      message: "Profile updated successfully!"
    });
  } catch (err) {
    console.log("Error updating profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
var getAllUsers = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = 5;
  const skip = (page - 1) * perPage;
  const searchQuery = req.query.search || "";
  try {
    const filter = searchQuery ? {
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } }
      ]
    } : {};
    const count = await User.countDocuments(filter);
    const users = await User.find(filter).skip(skip).limit(perPage).sort({ updatedAt: -1 });
    const totalPages = Math.ceil(count / perPage);
    res.status(200).json({
      status: "success",
      data: {
        users,
        pagination: {
          page,
          perPage,
          totalUsers: count,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteCustomerById2 = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCustomer = await User.findByIdAndDelete(id);
    if (!delCustomer) {
      return res.json({ status: "fail", message: "Customer not Found" });
    }
    res.json({
      status: "success",
      message: "User deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// routes/userRoute.js
var userRoute = express10.Router();
userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/getAll").get(getAllUsers);
userRoute.route("/get/:id").get(getUserById);
userRoute.route("/update/:id").put(UpdateProfile2);
userRoute.route("/delete/:id").delete(deleteCustomerById2);
var userRoute_default = userRoute;

// routes/MidCategoryRouter.js
import express11 from "express";

// controller/MidCategory.js
import fs5 from "fs";
import path7 from "path";
import { fileURLToPath as fileURLToPath7 } from "url";
var __filename5 = fileURLToPath7(import.meta.url);
var __dirname7 = path7.dirname(__filename5);
var createCategory = catchAsyncError(async (req, res, next) => {
  const {
    title,
    slug,
    metaTitle,
    metaDescription,
    keywords,
    robots,
    subTitle,
    description,
    details,
    videoUpperHeading,
    videoUpperDescription,
    videoLink,
    videoDescription,
    brandId,
    bannerTitleFirst,
    bannerContentFirst,
    imageAltText,
    iconAltText,
    bannerImageFirstAltText,
    bannerBgColor,
    faqImageAltText,
    showBottomHero,
    showTrustBanner,
    showServiceSelectionCard,
    showTabsSection1,
    showTabsSection2
  } = req.body;
  const findName = await MidCategory.findOne({ title });
  if (findName) {
    const requiredFiles2 = [
      "image",
      "icon",
      "bannerImageFirst"
    ];
    requiredFiles2.forEach((field) => {
      if (req.files?.[field]) {
        const filePath = path7.join(__dirname7, "../..", req.files[field][0].path);
        if (fs5.existsSync(filePath)) {
          fs5.unlinkSync(filePath);
        }
      }
    });
    return res.status(400).json({
      status: "fail",
      message: "This name already exists!"
    });
  }
  const requiredFiles = [
    "image",
    "icon",
    "bannerImageFirst",
    "bannerImageSecond",
    "bannerImageThird",
    "bannerImageFourth"
  ];
  const missingFiles = requiredFiles.filter(
    (field) => !req.files?.[field] || !req.files[field][0]
  );
  if (missingFiles.length > 0) {
    return res.status(400).json({
      status: "fail",
      message: `The following files are missing or invalid: ${missingFiles.join(", ")}`
    });
  }
  let qna = [];
  if (req.body.qna !== void 0) {
    try {
      qna = typeof req.body.qna === "string" ? JSON.parse(req.body.qna) : req.body.qna;
    } catch (error) {
      console.error("Error parsing Q&A:", error);
    }
  }
  let brands = [];
  if (req.body.brands !== void 0) {
    try {
      brands = typeof req.body.brands === "string" ? JSON.parse(req.body.brands) : req.body.brands;
    } catch (error) {
      console.error("Error parsing brands:", error);
    }
  }
  try {
    const categoryData = {
      title,
      slug,
      metaTitle,
      metaDescription,
      keywords,
      robots,
      subTitle,
      description,
      details: details || "",
      videoUpperHeading,
      videoUpperDescription,
      videoLink,
      videoDescription,
      brandId,
      imageAltText,
      iconAltText,
      bannerImageFirstAltText,
      bannerBgColor: bannerBgColor || "#F5F5DC",
      faqImageAltText: faqImageAltText || "",
      icon: `images/${req.files.icon[0].filename}`.replace(/\\/g, "/"),
      image: `images/${req.files.image[0].filename}`.replace(/\\/g, "/"),
      bannerTitleFirst,
      bannerContentFirst,
      bannerImageFirst: `images/${req.files.bannerImageFirst[0].filename}`.replace(/\\/g, "/"),
      faqImage: req.files?.faqImage ? `images/${req.files.faqImage[0].filename}`.replace(/\\/g, "/") : "",
      qna,
      brands,
      showBottomHero: showBottomHero === "true" || showBottomHero === true,
      showTrustBanner: showTrustBanner === "true" || showTrustBanner === true,
      showServiceSelectionCard: showServiceSelectionCard === "true" || showServiceSelectionCard === true,
      showTabsSection1: showTabsSection1 === "true" || showTabsSection1 === true,
      showTabsSection2: showTabsSection2 === "true" || showTabsSection2 === true
    };
    const newCategory = await MidCategory.create(categoryData);
    res.status(200).json({
      status: "success",
      message: "New Category created successfully!",
      data: newCategory
    });
    try {
      clearAllCache();
    } catch {
    }
  } catch (error) {
    requiredFiles.forEach((field) => {
      if (req.files?.[field]) {
        const filePath = path7.join(__dirname7, "../..", req.files[field][0].path);
        if (fs5.existsSync(filePath)) {
          fs5.unlinkSync(filePath);
        }
      }
    });
    return next(error);
  }
});
var getCategoryById = async (req, res, next) => {
  const { id, slug, title, details, ...otherFields } = req.query;
  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug"
    });
  }
  try {
    let query;
    if (id) {
      query = MidCategory.findById(id);
    } else if (slug) {
      query = MidCategory.findOne({ slug });
    }
    query = query.populate("brandId");
    const selectFields = [];
    if (title === "true") selectFields.push("title");
    if (details === "true") selectFields.push("details");
    if (otherFields) {
      Object.keys(otherFields).forEach((field) => {
        if (otherFields[field] === "true") selectFields.push(field);
      });
    }
    if (selectFields.length > 0) {
      query = query.select(selectFields.join(" "));
    }
    const data = await query.exec();
    if (!data) {
      return res.status(404).json({
        status: "fail",
        error: "Category not found"
      });
    }
    res.json({
      status: "success",
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
};
var updateCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const categoryId = req.params.id;
  const existingCategory = await MidCategory.findById(categoryId);
  if (!existingCategory) {
    return res.status(404).json({
      status: "fail",
      message: "Category not found"
    });
  }
  let qna = existingCategory.qna;
  if (req.body.qna !== void 0) {
    try {
      qna = typeof req.body.qna === "string" ? JSON.parse(req.body.qna) : req.body.qna;
    } catch (error) {
      console.error("Error parsing Q&A:", error);
    }
  }
  let brands = existingCategory.brands;
  if (req.body.brands !== void 0) {
    try {
      brands = typeof req.body.brands === "string" ? JSON.parse(req.body.brands) : req.body.brands;
    } catch (error) {
      console.error("Error parsing brands:", error);
    }
  }
  let updateData = {
    title: data.title,
    slug: data.slug,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    keywords: data.keywords,
    robots: data.robots,
    subTitle: data.subTitle,
    description: data.description,
    details: data.details !== void 0 ? data.details : existingCategory.details,
    videoUpperHeading: data.videoUpperHeading,
    videoUpperDescription: data.videoUpperDescription,
    videoLink: data.videoLink,
    brandId: data.brandId,
    videoDescription: data.videoDescription,
    bannerTitleFirst: data.bannerTitleFirst,
    bannerContentFirst: data.bannerContentFirst,
    imageAltText: data.imageAltText,
    iconAltText: data.iconAltText,
    bannerImageFirstAltText: data.bannerImageFirstAltText,
    bannerBgColor: data.bannerBgColor,
    faqImageAltText: data.faqImageAltText || "",
    qna,
    brands,
    showBottomHero: data.showBottomHero !== void 0 ? data.showBottomHero === "true" || data.showBottomHero === true : existingCategory.showBottomHero,
    showTrustBanner: data.showTrustBanner !== void 0 ? data.showTrustBanner === "true" || data.showTrustBanner === true : existingCategory.showTrustBanner,
    showServiceSelectionCard: data.showServiceSelectionCard !== void 0 ? data.showServiceSelectionCard === "true" || data.showServiceSelectionCard === true : existingCategory.showServiceSelectionCard,
    showTabsSection1: data.showTabsSection1 !== void 0 ? data.showTabsSection1 === "true" || data.showTabsSection1 === true : existingCategory.showTabsSection1,
    showTabsSection2: data.showTabsSection2 !== void 0 ? data.showTabsSection2 === "true" || data.showTabsSection2 === true : existingCategory.showTabsSection2
  };
  const newFiles = [];
  try {
    if (req.files?.image) {
      const imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
      updateData.image = imagePath;
      newFiles.push({ field: "image", path: req.files.image[0].path });
      if (existingCategory.image) {
        const oldImagePath = existingCategory.image.replace(process.env.BASEURL, "").replace("/images/", "");
        const fullOldPath = path7.join(__dirname7, "images", oldImagePath);
        if (fs5.existsSync(fullOldPath)) {
          fs5.unlinkSync(fullOldPath);
        }
      }
    }
    if (req.files?.icon) {
      const iconPath = `images/${req.files.icon[0].filename}`.replace(/\\/g, "/");
      updateData.icon = iconPath;
      newFiles.push({ field: "icon", path: req.files.icon[0].path });
      if (existingCategory.icon) {
        const oldIconPath = existingCategory.icon.replace(process.env.BASEURL, "").replace("/images/", "");
        const fullOldPath = path7.join(__dirname7, "images", oldIconPath);
        if (fs5.existsSync(fullOldPath)) {
          fs5.unlinkSync(fullOldPath);
        }
      }
    }
    const bannerFields = [
      "bannerImageFirst",
      "faqImage"
    ];
    for (const field of bannerFields) {
      if (req.files?.[field]) {
        const filePath = `images/${req.files[field][0].filename}`.replace(/\\/g, "/");
        updateData[field] = filePath;
        newFiles.push({ field, path: req.files[field][0].path });
        if (existingCategory[field]) {
          const oldPath = existingCategory[field].replace(process.env.BASEURL, "").replace("/images/", "");
          const fullOldPath = path7.join(__dirname7, "images", oldPath);
          if (fs5.existsSync(fullOldPath)) {
            fs5.unlinkSync(fullOldPath);
          }
        }
      } else {
        if (existingCategory[field]) {
          updateData[field] = existingCategory[field];
        }
      }
    }
    const updatedCategory = await MidCategory.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedCategory,
      message: "Category updated successfully!"
    });
    try {
      clearAllCache();
    } catch {
    }
  } catch (error) {
    newFiles.forEach((file) => {
      const fullPath = path7.join(__dirname7, "..", file.path);
      if (fs5.existsSync(fullPath)) {
        fs5.unlinkSync(fullPath);
      }
    });
    return next(error);
  }
});
var getAllCategory = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = parseInt(req.query.perPage, 10) || 18;
  const skip = (page - 1) * perPage;
  const searchQuery = req.query.search || "";
  const requestedCategories = req.query.categories?.split(",") || [];
  const sortBy = req.query.sortBy || "createdAt";
  try {
    if (requestedCategories.length > 0) {
      const categories2 = await MidCategory.find({
        title: { $in: requestedCategories }
      }).populate({
        path: "brandId",
        select: "name slug"
      }).sort({ title: 1 }).select("slug title icon image metaTitle metaDescription keywords imageAltText iconAltText");
      return res.status(200).json({
        status: "success",
        data: categories2
      });
    }
    const filter = searchQuery ? {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } }
      ]
    } : {};
    const count = await MidCategory.countDocuments(filter);
    let sortOption = { createdAt: -1 };
    if (searchQuery || sortBy === "title") {
      sortOption = { title: 1 };
    }
    const categories = await MidCategory.find(filter).populate({
      path: "brandId",
      select: "name slug"
    }).sort(sortOption).skip(skip).limit(perPage);
    const totalPages = Math.ceil(count / perPage);
    res.status(200).json({
      status: "success",
      data: categories,
      totalItems: count,
      pagination: {
        currentPage: page,
        itemsPerPage: perPage,
        totalPages
      },
      sort: sortOption
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteCategoryById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCategory = await MidCategory.findByIdAndDelete(id);
    if (!delCategory) {
      return res.json({ status: "fail", message: "Category not Found" });
    }
    res.json({
      status: "success",
      message: "Category deleted successfully!"
    });
    try {
      clearAllCache();
    } catch {
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// routes/MidCategoryRouter.js
var categoryRouter = express11.Router();
categoryRouter.route("/create").post(uploadCategoryImages, createCategory);
categoryRouter.route("/getAll").get(getAllCategory);
categoryRouter.route("/update/:id").put(uploadCategoryImages, updateCategory);
categoryRouter.route("/get").get(getCategoryById);
categoryRouter.route("/delete/:id").delete(deleteCategoryById);
var MidCategoryRouter_default = categoryRouter;

// routes/RatingRouter.js
import express12 from "express";

// model/rating.js
import mongoose14 from "mongoose";
var Schema12 = mongoose14.Schema;
var ratingSchema = new Schema12({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  rating: {
    type: Number,
    require: true
  },
  review: {
    type: String,
    require: true
  },
  user: {
    type: Schema12.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});
var Rating = mongoose14.model("Rating", ratingSchema);

// controller/ratingController.js
var createRating = async (req, res) => {
  const { user, rating } = req.body;
  const data = req.body;
  try {
    const existRating = await Rating.findOne({ user, rating });
    const newRating = new Rating(data);
    await newRating.save();
    res.status(201).json({
      data: newRating,
      message: "Rating created successfully",
      status: "success"
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
var getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json({
      data: ratings,
      message: "Ratings fetched successfully",
      status: "success"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
var getRating = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  try {
    const skip = (page - 1) * limit;
    const ratings = await Rating.find({ productId: id }).skip(skip).limit(limit);
    const totalRatings = await Rating.countDocuments({ productId: id });
    const totalPages = Math.ceil(totalRatings / limit);
    res.status(200).json({
      data: ratings,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalRatings,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      message: "Ratings fetched successfully",
      status: "success"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
var updateRating = async (req, res) => {
  const { id } = req.params;
  const rating = req.body;
  if (!id) return res.status(404).send(`No rating with id: ${id}`);
  const updatedRating = await Rating.findByIdAndUpdate(id, rating, {
    new: true
  });
  res.status(200).json({
    data: updatedRating,
    message: "Rating updated successfully",
    status: "success"
  });
};
var deleteRating = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).send(`No rating with id: ${id}`);
  await Rating.findByIdAndRemove(id);
  res.status(200).json({ message: "Rating deleted successfully", status: "success" });
};
var getRatingByProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const ratings = await Rating.find({ product: id }).populate("user");
    res.status(200).json({
      data: ratings,
      message: "Ratings fetched successfully",
      status: "success"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
var getRatingByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const ratings = await Rating.find({ user: id }).populate("product");
    res.status(200).json({
      data: ratings,
      message: "Ratings fetched successfully",
      status: "success"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
var getOverallRating = async (req, res) => {
  const { id } = req.params;
  try {
    const ratings = await Rating.find({ product: id });
    let sum = 0;
    ratings.forEach((rating) => {
      sum += rating.rating;
    });
    const overallRating = sum / ratings.length;
    res.status(200).json({
      data: overallRating,
      message: "Overall rating fetched successfully",
      status: "success"
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
var getGoogleReviews = async (req, res) => {
  try {
    const placeId = process.env.PLACE_ID;
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!placeId || !apiKey) {
      return res.status(400).json({ message: "Missing PLACE_ID or GOOGLE_API_KEY" });
    }
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.result);
    if (data.status !== "OK") {
      return res.status(400).json({ message: data.error_message });
    }
    res.json({
      rating: data.result.rating,
      totalReviews: data.result.user_ratings_total,
      reviews: data.result.reviews
    });
  } catch (error) {
    console.error("Google Reviews Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// routes/RatingRouter.js
var ratingRoute = express12.Router();
ratingRoute.route("/create").post(createRating);
ratingRoute.route("/getAll").get(getRatings);
ratingRoute.route("/get/:id").get(getRating);
ratingRoute.route("/update/:id").put(updateRating);
ratingRoute.route("/delete/:id").delete(deleteRating);
ratingRoute.route("/getByProduct/:id").get(getRatingByProductId);
ratingRoute.route("/getByUser/:id").get(getRatingByUserId);
ratingRoute.route("/getOverall/:id").get(getOverallRating);
ratingRoute.route("/getAllGoogleReviews").get(getGoogleReviews);
var RatingRouter_default = ratingRoute;

// routes/SubscribeRouter.js
import express13 from "express";

// model/subscribe.js
import mongoose15 from "mongoose";
import bcrypt6 from "bcrypt";
var Schema13 = mongoose15.Schema;
var subscribeSchema = new Schema13({
  email: {
    type: String,
    require: true
  }
});
subscribeSchema.index({ email: 1 }, { unique: true });
var Subscribe = mongoose15.model("Subscribe", subscribeSchema);

// controller/SubscribeController.js
var subscribeCreation = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const email = data?.email;
  const existingUser = await Subscribe.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "You already subscribed!", status: "fail" });
  } else {
    const subscribe = await Subscribe.create(data);
    res.status(200).json({
      status: "success",
      message: "Subscribed successfully",
      data: subscribe
    });
  }
});
var getAllSubscribtion = catchAsyncError(async (req, res, next) => {
  try {
    const users = await Subscribe.find();
    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});

// routes/SubscribeRouter.js
var subscribeRouter = express13.Router();
subscribeRouter.route("/create").post(subscribeCreation);
subscribeRouter.route("/getAll").get(getAllSubscribtion);
var SubscribeRouter_default = subscribeRouter;

// routes/RequestQuote.js
import express14 from "express";

// model/RequestQuote.js
import mongoose16 from "mongoose";
var Schema14 = mongoose16.Schema;
var requestQuoteSchema = new Schema14({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  companyName: {
    type: String,
    require: true
  },
  boxStyle: {
    type: String,
    require: true
  },
  length: {
    type: String,
    require: true
  },
  width: {
    type: String,
    require: true
  },
  depth: {
    type: String,
    require: true
  },
  unit: {
    type: String,
    require: true
  },
  quantity: {
    type: String,
    require: true
  },
  stock: {
    type: String,
    require: true
  },
  color: {
    type: String,
    require: true
  },
  printingSides: {
    type: String,
    require: true
  },
  addons: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pageUrl: {
    type: String,
    require: true
  },
  device: {
    type: String,
    require: true
  },
  ip: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
requestQuoteSchema.index({ email: 1, createdAt: -1 });
requestQuoteSchema.index({ status: 1, createdAt: -1 });
requestQuoteSchema.index({ phoneNumber: 1 });
requestQuoteSchema.index({ pageUrl: 1 });
var RequestQuote = mongoose16.model("RequestQuote", requestQuoteSchema);

// controller/RequestQuote.js
import nodemailer from "nodemailer";

// utils/emailTemplate.js
import moment from "moment";
var customerTemplate = (data) => `<!DOCTYPE html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
  @media (max-width: 600px) {
      a {
          font-size: 12px;
          overflow:hidden;
      }
    .mainContainer{
     padding:20px 15px !important
    }
  }
  </style>
  </head>
  <body style="font-family: 'Arial', sans-serif; color: #333333; line-height: 1.7; padding: 20px; background-color: #f4f4f4; margin: 0;">
      <div class="mainContainer" style="max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
          <!-- Logo Section -->
          <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://old.umbrellapackaging.com" target="_blank">
                  <img src="https://99de0d612a.imgdist.com/public/users/Integrators/BeeProAgency/1039128_1024229/Umbrella-packaging-final-logo-png.png" alt="Umbrella Packaging" title="Umbrella Packaging" style="width: 200px; max-width: 100%; display: block; margin: 0 auto;">
              </a>
          </div>
  
          <!-- Greeting Section -->
          <h1 style="font-size: 24px; font-weight: bold; color: #2a2e7b; text-align: center; margin: 0 0 20px;">Dear ${data}</h1>
          
          <!-- Introductory Message -->
          <p style="font-size: 16px; text-align: center; color: #555555; margin: 0 0 30px;">
              Thank you for sharing the order details with us! We are currently reviewing your request and will provide the best price quote within the next <strong>45 minutes</strong>.
          </p>
  
          <!-- Main Content Section -->
          <div style="padding: 30px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); margin-bottom: 30px;">
              <p style="font-size: 16px; color: #333333; margin: 0 0 10px;">
                  We greatly appreciate the opportunity to serve your packaging needs. In the meantime, if you have any urgent inquiries, feel free to contact us using the information below.
              </p>
  
              <!-- Contact Info Section -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                  <!-- Left Column -->
                  <div style="text-align: left; flex: 1;">
                      <p style="margin: 0; font-weight: bold;">Best regards,</p>
                      <p style="margin: 0;">Manager Sales<br><span style="color: #2a2e7b;">Umbrella Custom Packaging</span></p>
                  </div>
                  <!-- Right Column (Contact Details) -->
                  <div style="text-align: right; flex: 1;">
                      <p style="margin: 0;"><a href="https://xcustompackaging.com/" style="text-decoration: none; color: #0076a8; font-weight: bold;">www.umbrellapackaging.com</a></p>
                      <p style="margin: 0;"><a href="tel:+17472470456" style="text-decoration: none; color: #0076a8; font-weight: bold;">+1-747-247-0456</a></p>
                  </div>
              </div>
          </div>
  
          <!-- Social Media Links Section -->
          <div style="text-align: center; margin-bottom: 20px;">
              <table style="display: inline-block;">
                  <tr>
                      <td style="padding: 0 10px;">
                          <a href="https://www.facebook.com/Umbrella-Custom-Packaging-102088152747218/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/facebook@2x.png" alt="Facebook" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://twitter.com/umbrellapack" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/twitter@2x.png" alt="Twitter" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.linkedin.com/in/umbrella-custom-packaging-2a3b60257/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/linkedin@2x.png" alt="LinkedIn" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.instagram.com/umbrellacustompackaging/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/instagram@2x.png" alt="Instagram" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.pinterest.com/UmbrellaCustomPackaging/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/pinterest@2x.png" alt="Pinterest" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                  </tr>
              </table>
          </div>
  
          <!-- Footer Section -->
          <p style="text-align: center; font-size: 14px; color: #888888;">
              For further inquiries, please contact us at <a href="mailto:inquiry@umbrellapackaging.com" style="text-decoration: underline; color: #0076a8;">inquiry@umbrellapackaging.com</a>
          </p>
      </div>
  
      <!-- Responsive Design Media Queries -->
      <style>
          @media only screen and (max-width: 600px) {
              body {
                  padding: 10px;
              }
              div {
                  padding: 20px;
              }
              h1 {
                  font-size: 20px;
              }
              p {
                  font-size: 14px;
              }
              table {
                  display: block;
                  width: 100%;
              }
          }
      </style>
  </body>
  </html>`;
var adminTemplate = (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <body>
        <div>
           <!-- Header Section -->
           <div>
            <h1>New Quote Request</h1>
            <p>A customer has submitted a request for a quote. Below are the details.</p>
        </div>
        
            <div  style="padding-bottom: 50px;">
                
                <table>
                    <tr>
                        <td>Name:</td>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <td>Company Name:</td>
                        <td>${data.companyName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <td>Phone Number:</td>
                        <td>${data.phoneNumber}</td>
                    </tr>
                </table>
            </div>
    
            
    
            <!-- Quote Details Table -->
            
            <table>
            
                    <tr>
                    <td>Box Style :</td>
                    <td>${data.boxStyle}</td>
                </tr>
                <tr>
                    <td>Length:</td>
                    <td>${data.length}</td>
                </tr>
                <tr>
                    <td>Width:</td>
                    <td>${data.width}</td>
                </tr>
                <tr>
                    <td>Depth:</td>
                    <td>${data.depth}</td>
                </tr>
                <tr>
                    <td>Stock:</td>
                    <td>${data.stock}</td>
                </tr>
                <tr>
                    <td>Colors:</td>
                    <td>${data.color}</td>
                </tr>
                <tr>
                    <td>Unit:</td>
                    <td>${data.unit}</td>
                </tr>
                <tr>
                    <td>Quantity:</td>
                    <td>${data.quantity}</td>
                </tr>
                <tr>
                    <td>Add-ons:</td>
                    <td>${data.addons}</td>
                </tr>
                <td>File:</td>
              <td>
  ${data?.image ? `<img style="width: 100%; max-width: 300px; height: auto; display: block;" 
           src="https://xcustompackaging.com/${data.image}" 
           alt="Uploaded file" />` : "No image provided"}
</td>
                <tr>
                    <td>Description:</td>
                    <td>${data.message}</td>
                </tr>

                 <tr>
                    <td>---</td>
                </tr>

                 <tr>
                    <td>Date:</td>
                    <td>${moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                </tr>
               
                <tr>
                    <td>Page URL:</td>
                    <td>${data.pageUrl}</td>
                </tr>
                 <tr>
                    <td>User Agent:</td>
                    <td>${data.device}</td>
                </tr>
                 <tr>
                    <td>Remote IP:</td>
                    <td>${data.ip}</td>
                </tr>
            </table>
 
        </div>
    </body>`;
var instantTemplate = (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Quote Request</title>
</head>
<body>
    <div>
        <!-- Header Section -->
        <div>
            <h1>New Quote Request</h1>
            <p>A customer has submitted a request for a quote. Below are the details.</p>
        </div>
        
        <div style="padding-bottom: 50px;">
            <table>
                <tr>
                    <td>Name:</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>${data.email}</td>
                </tr>
                <tr>
                    <td>Phone Number:</td>
                    <td>${data.phoneNumber}</td>
                </tr>
            </table>
        </div>

        <!-- Quote Details Table -->
        <table>
            <tr>
                <td>File:</td>
                <td>
                    ${data.image ? `<img style="width: 100%; max-width: 300px; height: auto; display: block;" src=${`https://xcustompackaging.com/${data.image}`} alt="Uploaded file" />` : "No image provided"}
                </td>
            </tr>
            <tr>
                <td>Description:</td>
                <td>${data.message || "No description provided"}</td>
            </tr>

                <tr>
                    <td>---</td>
                </tr>
              
                <tr>
                    <td>Date:</td>
                      <td>${moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                </tr>
                  <tr>
                    <td>Page URL:</td>
                    <td>${data.pageUrl}</td>
                </tr>
                 <tr>
                    <td>User Agent:</td>
                    <td>${data.device}</td>
                </tr>
                 <tr>
                    <td>Remote IP:</td>
                    <td>${data.ip}</td>
                </tr>

        </table>
    </div>
</body>
</html>`;

// controller/RequestQuote.js
init_ipDetection();
import { detect } from "detect-browser";
import fs6 from "fs";
import path8 from "path";
import { fileURLToPath as fileURLToPath8 } from "url";
var __filename6 = fileURLToPath8(import.meta.url);
var __dirname8 = path8.dirname(__filename6);
var transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
var createRequestQuote = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log(data);
  let imagePath = null;
  try {
    if (req.files.image) {
      imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
    }
    const clientIp = getClientIP(req);
    const browserInfo = detect(req.headers["user-agent"]);
    const deviceInfo = browserInfo ? `${browserInfo.name} ${browserInfo.version} on ${browserInfo.os}` : "Unknown device";
    const quoteData = {
      image: imagePath,
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      companyName: data?.companyName,
      boxStyle: data?.boxStyle,
      length: data?.length,
      width: data?.width,
      depth: data?.depth,
      unit: data?.unit,
      quantity: data?.quantity,
      stock: data?.stock,
      color: data?.color,
      addons: data?.addons,
      message: data?.message,
      pageUrl: data?.pageUrl,
      device: deviceInfo,
      ip: clientIp
    };
    const newRequestQuote = await RequestQuote.create(quoteData);
    const mailOptions = {
      from: EMAIL,
      to: data?.email,
      subject: "Thank You for Your Quote Request - Umbrella Packaging",
      html: customerTemplate(data?.name)
    };
    const adminMailOptions = {
      from: EMAIL,
      to: EMAIL,
      subject: `${data?.name} <${data?.email}> | ${EMAIL}`,
      html: adminTemplate(quoteData)
    };
    try {
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(adminMailOptions);
    } catch (error) {
    }
    res.status(201).json({
      status: "success",
      message: "Request Quote created successfully and confirmation email sent!",
      data: newRequestQuote
    });
  } catch (error) {
    if (req.files?.image) {
      fs6.unlinkSync(path8.join(__dirname8, "..", req.files.image[0].path));
    }
    return next(error);
  }
});
var getRequestQuoteById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await RequestQuote.findById(id);
    res.json({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
};
var updateRequestQuote = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const requestQuoteId = req.params.id;
  const existingRequestQuote = await RequestQuote.findById(requestQuoteId);
  if (!existingRequestQuote) {
    return res.status(404).json({
      status: "fail",
      message: "Request quote not found"
    });
  }
  try {
    let updateData = { ...data };
    if (req.files?.image) {
      if (existingRequestQuote.image) {
        const oldImagePath = path8.join(
          __dirname8,
          "..",
          "public",
          existingRequestQuote.image.replace(process.env.BASEURL, "")
        );
        if (fs6.existsSync(oldImagePath)) {
          fs6.unlinkSync(oldImagePath);
        }
      }
      updateData.image = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
    }
    const updatedRequestQuote = await RequestQuote.findByIdAndUpdate(
      requestQuoteId,
      updateData,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedRequestQuote,
      message: "Request Quote updated successfully!"
    });
  } catch (error) {
    if (req.files?.image) {
      fs6.unlinkSync(path8.join(__dirname8, "..", req.files.image[0].path));
    }
    return next(error);
  }
});
var getAllRequestQuote = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const blogs = await RequestQuote.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);
    const totalRequestQuote = await RequestQuote.countDocuments();
    res.status(200).json({
      status: "success",
      data: blogs,
      pagination: {
        total: totalRequestQuote,
        page,
        limit,
        totalPages: Math.ceil(totalRequestQuote / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching blogs with pagination:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteRequestQuoteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteRequestQuote = await RequestQuote.findByIdAndDelete(id);
    if (!deleteRequestQuote) {
      return res.json({ status: "fail", message: "Blog not Found" });
    }
    res.json({
      status: "success",
      message: "Request Quote deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// routes/RequestQuote.js
var blogRouter2 = express14.Router();
blogRouter2.route("/create").post(uploadRequestQuoteImages, createRequestQuote);
blogRouter2.route("/getAll").get(getAllRequestQuote);
blogRouter2.route("/update/:id").put(uploadRequestQuoteImages, updateRequestQuote);
blogRouter2.route("/get/:id").get(getRequestQuoteById);
blogRouter2.route("/delete/:id").delete(deleteRequestQuoteById);
var RequestQuote_default = blogRouter2;

// routes/InstantQuote.js
import express15 from "express";

// controller/InstantQuote.js
import requestIp2 from "request-ip";
import { detect as detect2 } from "detect-browser";

// model/InstantQuote.js
import mongoose17 from "mongoose";
var Schema15 = mongoose17.Schema;
var instantQuoteSchema = new Schema15({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pageUrl: {
    type: String,
    require: true
  },
  device: {
    type: String,
    require: true
  },
  ip: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});
instantQuoteSchema.index({ email: 1, createdAt: -1 });
instantQuoteSchema.index({ phoneNumber: 1, createdAt: -1 });
instantQuoteSchema.index({ status: 1, createdAt: -1 });
instantQuoteSchema.index({ pageUrl: 1 });
var InstantQuote = mongoose17.model("InstantQuote", instantQuoteSchema);

// controller/InstantQuote.js
import nodemailer2 from "nodemailer";
import fs7 from "fs";
import path9 from "path";
import { fileURLToPath as fileURLToPath9 } from "url";
var __filename7 = fileURLToPath9(import.meta.url);
var __dirname9 = path9.dirname(__filename7);
var transporter2 = nodemailer2.createTransport({
  // service: 'gmail',
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
var createInstantQuote = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  let imagePath = null;
  try {
    if (req.files.image) {
      imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
    }
    const clientIp = requestIp2.getClientIp(req);
    console.log(requestIp2);
    const browserInfo = detect2(req.headers["user-agent"]);
    const deviceInfo = browserInfo ? `${browserInfo.name} ${browserInfo.version} on ${browserInfo.os}` : "Unknown device";
    console.log(browserInfo);
    const quoteData = {
      image: imagePath,
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      message: data?.message,
      pageUrl: data?.pageUrl,
      device: deviceInfo,
      ip: clientIp
    };
    const newInstantQuote = await InstantQuote.create(quoteData);
    const mailOptions = {
      from: EMAIL,
      to: data?.email,
      subject: "Thank You for Your Quote Request - Umbrella Packaging",
      html: customerTemplate(data?.name)
    };
    const adminMailOptions = {
      from: EMAIL,
      to: EMAIL,
      subject: `${data?.name} <${data?.email}> | ${EMAIL}`,
      html: instantTemplate(quoteData)
    };
    try {
      await transporter2.sendMail(mailOptions);
      await transporter2.sendMail(adminMailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
    res.status(201).json({
      status: "success",
      message: "Request Quote created successfully and confirmation email sent!",
      data: newInstantQuote
    });
  } catch (error) {
    if (req.files?.image) {
      fs7.unlinkSync(path9.join(__dirname9, "..", req.files.image[0].path));
    }
    return next(error);
  }
});
var getInstantQuoteById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await InstantQuote.findById(id);
    res.json({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
};
var updateInstantQuote = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const InstantQuoteId = req.params.id;
  const existingInstantQuote = await InstantQuote.findById(InstantQuoteId);
  if (!existingInstantQuote) {
    return res.status(404).json({
      status: "fail",
      message: "Request quote not found"
    });
  }
  try {
    let updateData = { ...data };
    if (req.files?.image) {
      if (existingInstantQuote.image) {
        const oldImagePath = path9.join(
          __dirname9,
          "..",
          "public",
          existingInstantQuote.image.replace(process.env.BASEURL, "")
        );
        if (fs7.existsSync(oldImagePath)) {
          fs7.unlinkSync(oldImagePath);
        }
      }
      updateData.image = `images/${req.files.image[0].filename}`.replace(/\\/g, "/");
    }
    const updatedInstantQuote = await InstantQuote.findByIdAndUpdate(
      InstantQuoteId,
      updateData,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: updatedInstantQuote,
      message: "Request Quote updated successfully!"
    });
  } catch (error) {
    if (req.files?.image) {
      fs7.unlinkSync(path9.join(__dirname9, "..", req.files.image[0].path));
    }
    return next(error);
  }
});
var getAllInstantQuote = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const blogs = await InstantQuote.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);
    const totalInstantQuote = await InstantQuote.countDocuments();
    res.status(200).json({
      status: "success",
      data: blogs,
      pagination: {
        total: totalInstantQuote,
        page,
        limit,
        totalPages: Math.ceil(totalInstantQuote / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching blogs with pagination:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error"
    });
  }
});
var deleteInstantQuoteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteInstantQuote = await InstantQuote.findByIdAndDelete(id);
    if (!deleteInstantQuote) {
      return res.json({ status: "fail", message: "Blog not Found" });
    }
    res.json({
      status: "success",
      message: "Request Quote deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
var testIPDetection = catchAsyncError(async (req, res, next) => {
  const { getClientIP: getClientIP2 } = await Promise.resolve().then(() => (init_ipDetection(), ipDetection_exports));
  const clientIp = getClientIP2(req);
  console.log("Client IP in controller:", clientIp);
  res.status(200).json({
    status: "success",
    message: "IP Detection Test",
    clientIP: clientIp,
    headers: {
      "x-forwarded-for": req.headers["x-forwarded-for"],
      "x-real-ip": req.headers["x-real-ip"],
      "x-client-ip": req.headers["x-client-ip"],
      "user-agent": req.headers["user-agent"]
    }
  });
});

// routes/InstantQuote.js
var instantQuoteRouter = express15.Router();
instantQuoteRouter.route("/create").post(uploadInstantQuoteImages, createInstantQuote);
instantQuoteRouter.route("/getAll").get(getAllInstantQuote);
instantQuoteRouter.route("/update/:id").put(uploadInstantQuoteImages, updateInstantQuote);
instantQuoteRouter.route("/get/:id").get(getInstantQuoteById);
instantQuoteRouter.route("/delete/:id").delete(deleteInstantQuoteById);
instantQuoteRouter.route("/test-ip").get(testIPDetection);
var InstantQuote_default = instantQuoteRouter;

// routes/sitemapRouter.js
import express16 from "express";
var sitemapRouter = express16.Router();
var sitemapRouter_default = sitemapRouter;

// app.js
import path10 from "path";
import { fileURLToPath as fileURLToPath10, pathToFileURL } from "url";
import fs8 from "node:fs/promises";
var __filename8 = fileURLToPath10(import.meta.url);
var __dirname10 = path10.dirname(__filename8);
var backendDir = path10.resolve(__dirname10, path10.basename(__dirname10) === "dist" ? ".." : ".");
var projectRoot = path10.resolve(backendDir, "..");
var numCPUs = os.cpus().length;
var isProduction = process.env.NODE_ENV === "production" || path10.basename(__dirname10) === "dist";
if (isProduction && cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${numCPUs} CPUs`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log("Starting a new worker");
    cluster.fork();
  });
  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });
} else {
  let moveModuleScriptsAfterStylesheets = function(html) {
    if (!html || typeof html !== "string") return html;
    const headOpenIndex = html.indexOf("<head");
    const headCloseIndex = html.indexOf("</head>");
    if (headOpenIndex === -1 || headCloseIndex === -1) return html;
    const headStart = html.indexOf(">", headOpenIndex);
    if (headStart === -1) return html;
    const headInner = html.slice(headStart + 1, headCloseIndex);
    const moduleScriptRegex = /<script\b[^>]*type=["']module["'][^>]*>\s*<\/script>\s*/gi;
    const scripts = headInner.match(moduleScriptRegex) || [];
    if (scripts.length === 0) return html;
    const headWithoutScripts = headInner.replace(moduleScriptRegex, "");
    const lastStylesheetIndex = headWithoutScripts.lastIndexOf('rel="stylesheet"');
    if (lastStylesheetIndex === -1) return html;
    const insertAfterIndex = headWithoutScripts.indexOf(">", lastStylesheetIndex);
    if (insertAfterIndex === -1) return html;
    const newHeadInner = headWithoutScripts.slice(0, insertAfterIndex + 1) + "\n    " + scripts.join("").trim() + "\n" + headWithoutScripts.slice(insertAfterIndex + 1);
    return html.slice(0, headStart + 1) + newHeadInner + html.slice(headCloseIndex);
  }, getCacheKey = function(req) {
    return req.originalUrl;
  }, cleanCache = function() {
    const now = Date.now();
    for (const [key, value] of ssrCache.entries()) {
      if (value.expiry < now) {
        ssrCache.delete(key);
      }
    }
    if (ssrCache.size > MAX_CACHE_SIZE) {
      const entries = Array.from(ssrCache.entries());
      for (let i = 0; i < entries.length - MAX_CACHE_SIZE; i++) {
        ssrCache.delete(entries[i][0]);
      }
    }
  };
  console.log(`Worker ${process.pid} started`);
  connectDB();
  const app = express17();
  app.use(compression());
  app.use(express17.static(path10.join(backendDir, "static"), { maxAge: "365d" }));
  app.use("/images", express17.static(path10.join(backendDir, "images"), { maxAge: "365d" }));
  app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Cache-Control", "Pragma"],
    exposedHeaders: ["Content-Length", "Content-Type"],
    credentials: false,
    // Set to false for iOS Safari compatibility
    maxAge: 86400,
    // 24 hours
    optionsSuccessStatus: 200
    // Some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
  app.use(express17.json());
  app.use(express17.urlencoded({ extended: true }));
  const apiCacheConfig = {
    "/products": 60 * 5,
    // 5 minutes
    "/faq": 60 * 10,
    // 10 minutes
    "/banner": 60 * 10,
    // 10 minutes
    "/blog": 60 * 10,
    // 10 minutes
    "/blog-product": 60 * 10,
    // 10 minutes
    // BottomNav critical data: cache aggressively (6 hours)
    "/brands": 60 * 60 * 6,
    "/category": 60 * 60 * 6,
    "/subcategory": 60 * 10,
    // 10 minutes
    "/sitemap": 60 * 60
    // 1 hour
  };
  Object.entries(apiCacheConfig).forEach(([pathPrefix, ttl]) => {
    app.use(pathPrefix, cacheMiddleware(ttl));
  });
  app.use("/brands", BrandRouter_default);
  app.use("/user", userRoute_default);
  app.use("/banner", bannerRoute_default);
  app.use("/contactus", contactusrouter_default);
  app.use("/blog", blogRouter_default);
  app.use("/blog-product", blogProductRouter_default);
  app.use("/faq", FaqRouter_default);
  app.use("/admin", AdminRouter_default);
  app.use("/category", MidCategoryRouter_default);
  app.use("/subcategory", MidCategoryRouter_default);
  app.use("/products", ProductRouter_default);
  app.use("/checkout", CheckoutRouter_default);
  app.use("/rating", RatingRouter_default);
  app.use("/subscribe", SubscribeRouter_default);
  app.use("/requestQuote", RequestQuote_default);
  app.use("/instantQuote", InstantQuote_default);
  app.use("/", sitemapRouter_default);
  app.get("/apis", async (req, res) => {
    res.send("App Is Running backend!");
  });
  app.use(Error_default);
  const base = process.env.BASE || "/";
  let productionTemplate = "";
  let productionRender = null;
  let vite = null;
  if (isProduction) {
    try {
      const templatePath = path10.join(projectRoot, "frontend/dist/client/index.html");
      const serverEntryPath = path10.join(projectRoot, "frontend/dist/server/entry-server.js");
      const [template, serverModule] = await Promise.all([
        fs8.readFile(templatePath, "utf-8"),
        import(pathToFileURL(serverEntryPath).href)
      ]);
      productionTemplate = moveModuleScriptsAfterStylesheets(template);
      productionRender = serverModule.render;
      console.log("Production assets preloaded successfully");
    } catch (error) {
      console.error("Failed to preload production assets:", error);
    }
  } else {
    try {
      const { createServer } = await import("vite");
      const { resolve } = await import("path");
      vite = await createServer({
        server: { middlewareMode: true },
        appType: "custom",
        base,
        root: path10.join(projectRoot, "frontend"),
        configFile: path10.join(projectRoot, "frontend/vite.config.js"),
        ssr: {
          // Ensure React resolves from frontend node_modules
          resolve: {
            conditions: ["node", "import"],
            external: ["react", "react-dom", "react-dom/server"]
          }
        }
      });
      app.use(vite.middlewares);
    } catch (error) {
      console.error("Failed to start Vite:", error);
    }
  }
  if (isProduction) {
    try {
      const sirv = (await import("sirv")).default;
      app.use(base, sirv(path10.join(projectRoot, "frontend/dist/client"), {
        extensions: [],
        maxAge: 31536e3,
        // 1 year
        immutable: true
      }));
    } catch (error) {
      console.error("Failed to set up static file serving:", error);
    }
  }
  const ssrCache = /* @__PURE__ */ new Map();
  const SSR_CACHE_TTL_DEFAULT = 1e3 * 60 * 10;
  const SSR_CACHE_TTL_HOME = 1e3 * 60 * 15;
  const MAX_CACHE_SIZE = 200;
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
  setInterval(cleanCache, 6e4);
  app.use("*", async (req, res, next) => {
    const startTime = Date.now();
    const url = req.originalUrl;
    if (url.startsWith("/api/") || url.startsWith("/_vite") || url.includes(".")) {
      return next();
    }
    if (url.length > 1 && url.endsWith("/")) {
      const newUrl = url.slice(0, -1);
      return res.redirect(301, newUrl);
    }
    const cacheKey = getCacheKey(req);
    const cached = ssrCache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      res.set(cached.headers).status(200).send(cached.html);
      ssrLogDebug(`SSR Cache hit for ${url}: ${Date.now() - startTime}ms`);
      return;
    }
    let template, render;
    let rendered = { html: "", helmet: {}, serverData: {} };
    try {
      if (!isProduction && vite) {
        try {
          template = await fs8.readFile(
            path10.join(projectRoot, "frontend/index.html"),
            "utf-8"
          );
          template = await vite.transformIndexHtml(url, template);
          if (!template.includes('href="/src/App.css"') && !template.includes("href='/src/App.css'")) {
            template = template.replace(
              "</head>",
              `    <link href="/src/App.css" rel="stylesheet" />
  </head>`
            );
          }
          const serverModule = await vite.ssrLoadModule("/src/entry-server.jsx");
          render = serverModule?.render;
        } catch (error) {
          ssrLogError("Vite development error:", error);
          ssrLogError("Error details:", error.message);
          ssrLogError("Error stack:", error.stack);
        }
      } else if (isProduction && productionTemplate && productionRender) {
        template = productionTemplate;
        render = productionRender;
      } else {
      }
      if (!render || typeof render !== "function") {
        console.error(`Render function not available for ${url}. Falling back to client-side rendering.`);
        if (template) {
          const fallbackHtml = template.replace("<!--app-head-->", "").replace("<!--app-html-->", '<div id="root"></div>').replace("<!--server-data-->", "<script>window.__SERVER_DATA__ = null;</script>\n<script>window.__CATEGORY_PRODUCTS__ = null;</script>\n<script>window.__HOME_PAGE_DATA__ = null;</script>");
          return res.status(200).set({ "Content-Type": "text/html" }).send(fallbackHtml);
        } else {
          return res.status(500).send("Server error");
        }
      }
      const renderPromise = render(url);
      const timeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("SSR timeout")), 3e3)
      );
      rendered = await Promise.race([renderPromise, timeoutPromise]);
      ssrLogDebug(`SSR render result for ${url}:`, {
        hasHtml: !!rendered.html,
        hasServerData: !!rendered.serverData,
        hasCategoryProducts: !!rendered.CategoryProducts,
        hasHomePageData: !!rendered.homePageData,
        homePageDataKeys: rendered.homePageData ? Object.keys(rendered.homePageData) : []
      });
      const serverDataScript = rendered.serverData ? `<script>window.__SERVER_DATA__ = ${JSON.stringify({ serverData: rendered.serverData })};</script>` : "<script>window.__SERVER_DATA__ = null;</script>";
      const categoryProductsScript = rendered.CategoryProducts ? `<script>window.__CATEGORY_PRODUCTS__ = ${JSON.stringify(rendered.CategoryProducts)};</script>` : "<script>window.__CATEGORY_PRODUCTS__ = null;</script>";
      const homePageDataScript = rendered.homePageData ? `<script>window.__HOME_PAGE_DATA__ = ${JSON.stringify(rendered.homePageData)};</script>` : "<script>window.__HOME_PAGE_DATA__ = null;</script>";
      ssrLogDebug(`SSR scripts prepared for ${url}:`, {
        serverData: rendered.serverData ? "present" : "null",
        categoryProducts: rendered.CategoryProducts ? "present" : "null",
        homePageData: rendered.homePageData ? "present" : "null"
      });
      if (rendered.serverData) {
        const hasDataInHtml = rendered.html.includes(
          rendered.serverData.name || rendered.serverData.title || rendered.serverData.slug || ""
        );
        ssrLogDebug(`SSR: Data visible in HTML for ${url}:`, hasDataInHtml, {
          dataKey: rendered.serverData.name || rendered.serverData.title || rendered.serverData.slug || "N/A"
        });
      }
      const html = template.replace(
        "<!--app-head-->",
        `
${rendered.helmet?.title || ""}
${rendered.helmet?.meta || ""}
${rendered.helmet?.link || ""}
${rendered.helmet?.script || ""}
`
      ).replace("<!--app-html-->", rendered.html || "").replace(
        "<!--server-data-->",
        `${serverDataScript}
${categoryProductsScript}
${homePageDataScript}`
      );
      if (isProduction && res.statusCode === 200) {
        const isHomePageRequest = url === "/" || url === "" || url.startsWith("/?");
        const ttl = isHomePageRequest ? SSR_CACHE_TTL_HOME : SSR_CACHE_TTL_DEFAULT;
        const headers = {
          "Content-Type": "text/html",
          "Cache-Control": isHomePageRequest ? "public, max-age=300, stale-while-revalidate=900" : "public, max-age=60, stale-while-revalidate=300"
        };
        ssrCache.set(cacheKey, {
          html,
          headers,
          expiry: Date.now() + ttl
        });
        res.set(headers);
      }
      if (!isProduction) {
        res.status(200).set({ "Content-Type": "text/html" }).send(html);
      } else {
        res.status(200).send(html);
      }
      ssrLogDebug(`SSR completed for ${url}: ${Date.now() - startTime}ms`);
    } catch (e) {
      if (e.message === "SSR timeout") {
        console.error(`SSR timeout for ${url}: ${Date.now() - startTime}ms`);
        if (template) {
          const fallbackHtml = template.replace("<!--app-head-->", "").replace("<!--app-html-->", '<div id="root"></div>').replace("<!--server-data-->", "<script>window.__SERVER_DATA__ = null;</script>\n<script>window.__CATEGORY_PRODUCTS__ = null;</script>\n<script>window.__HOME_PAGE_DATA__ = null;</script>");
          return res.status(200).set({ "Content-Type": "text/html" }).send(fallbackHtml);
        } else {
          return res.status(500).send("Server error");
        }
      } else {
        ssrLogError("SSR Error:", e.stack);
        if (template) {
          const errorHtml = template.replace("<!--app-head-->", "").replace("<!--app-html-->", '<div id="root"></div>').replace("<!--server-data-->", "<script>window.__SERVER_DATA__ = null;</script>\n<script>window.__CATEGORY_PRODUCTS__ = null;</script>\n<script>window.__HOME_PAGE_DATA__ = null;</script>");
          res.status(200).set({ "Content-Type": "text/html" }).send(errorHtml);
        } else {
          res.status(500).send("Server error");
        }
      }
    }
  });
  const PORT = process.env.PORT || 8e3;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Worker ${process.pid} is running on port ${PORT} in ${isProduction ? "production" : "development"} mode`);
  });
}
