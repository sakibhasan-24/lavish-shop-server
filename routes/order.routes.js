import express from "express";
import { verifyToken } from "../helper/verifyToken.js";
import {
  addOrderItems,
  cancelPayment,
  getOrder,
  successfullyPayment,
  updatePaymentStatus,
} from "../controller/order.controller.js";

const router = express.Router();

router.post("/add-order", verifyToken, addOrderItems);
router.get("/get-order/:orderId", verifyToken, getOrder);
router.put("/payment/:id", verifyToken, updatePaymentStatus);
router.post("/payment-success/:id", verifyToken, successfullyPayment);
router.put("/payment-failed/:id", verifyToken, cancelPayment);

export default router;
