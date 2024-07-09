import express from "express";
import { verifyToken } from "../helper/verifyToken";
import { addOrderItems } from "../controller/order.controller";

const router = express.Router();

router.post("/order", verifyToken, addOrderItems);
export default router;
