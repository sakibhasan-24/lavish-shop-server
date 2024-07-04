import express from "express";
import {
  getProductById,
  getProducts,
} from "../controller/products.controller.js";

const router = express.Router();
router.get("/get-products", getProducts);
router.get("/get-product/:id", getProductById);

export default router;
