import express from "express";
import { getProductFromAppellation } from "../controllers/productController";

const router = express.Router();

router.post("/", getProductFromAppellation);

export default router;
