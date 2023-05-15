import express from "express";
import { appellationWineBlend } from "../controllers/appellationController";

const router = express.Router();

router.get("/", appellationWineBlend);

export default router;
