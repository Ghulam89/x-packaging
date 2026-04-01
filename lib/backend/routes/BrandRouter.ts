// @ts-nocheck
import express from "express";

import {
  createBrand,
  getAllBrand,
  getBrandById,
  deleteBrandById,
  updateBrand,
  
} from "../services/BrandController";
import { uploadBrandImages } from "../upload/UploadFile";
const  brandRouter = express.Router();
brandRouter.route("/create").post(uploadBrandImages, createBrand);
brandRouter.route("/getAll").get(getAllBrand);
brandRouter.route("/update/:id").put(uploadBrandImages,updateBrand);
brandRouter.route("/get").get(getBrandById);
brandRouter.route("/delete/:id").delete(deleteBrandById);

export default brandRouter;

