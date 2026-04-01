// @ts-nocheck
import express from "express";
import {
  createBlogProduct,
  getAllBlogProducts,
  getBlogProductsByBlogId,
  updateBlogProduct,
  deleteBlogProduct,
  getBlogProductById,
} from "../services/BlogProductController";

const blogProductRouter = express.Router();

blogProductRouter.route("/create").post(createBlogProduct);
blogProductRouter.route("/getAll").get(getAllBlogProducts);
blogProductRouter.route("/get/:id").get(getBlogProductById);
blogProductRouter.route("/blog/:blogId").get(getBlogProductsByBlogId);
blogProductRouter.route("/update/:id").put(updateBlogProduct);
blogProductRouter.route("/delete/:id").delete(deleteBlogProduct);

export default blogProductRouter;

