// @ts-nocheck
import express from "express";

import {createFaq,getAllFaq,getFaqById,deleteFaqById,updateFaq} from '../services/FaqController'

const FaqRouter = express.Router();

FaqRouter.route("/create").post(createFaq);
FaqRouter.route("/getAll").get(getAllFaq);
FaqRouter.route("/get/:id").get(getFaqById);
FaqRouter.route("/update/:id").put(updateFaq);
FaqRouter.route("/delete/:id").delete(deleteFaqById);


export default FaqRouter;

