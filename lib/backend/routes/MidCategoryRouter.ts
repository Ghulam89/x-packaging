// @ts-nocheck
import express from "express";

import {
  createCategory,
  getCategoryById,
  getAllCategory,
  deleteCategoryById,
  updateCategory
} from "../services/MidCategory";
import { uploadCategoryImages } from "../upload/UploadFile";
const categoryRouter = express.Router();
categoryRouter.route("/create").post(uploadCategoryImages,createCategory);
categoryRouter.route("/getAll").get(getAllCategory);
categoryRouter.route("/update/:id").put(uploadCategoryImages,updateCategory);
categoryRouter.route("/get").get(getCategoryById);
categoryRouter.route("/delete/:id").delete(deleteCategoryById);

export default categoryRouter;

