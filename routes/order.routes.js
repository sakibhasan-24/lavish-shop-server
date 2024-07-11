import express from "express";
import { verifyToken } from "../helper/verifyToken.js";
import { addOrderItems } from "../controller/order.controller.js";

const router = express.Router();

router.post("/add-order", verifyToken, addOrderItems);
export default router;
