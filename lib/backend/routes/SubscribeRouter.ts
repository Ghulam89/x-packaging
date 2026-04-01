// @ts-nocheck
import express from "express";
import {
  subscribeCreation,
  getAllSubscribtion,
} from "../services/SubscribeController";
const subscribeRouter = express.Router();

subscribeRouter.route("/create").post(subscribeCreation);
subscribeRouter.route("/getAll").get(getAllSubscribtion);

export default subscribeRouter;

