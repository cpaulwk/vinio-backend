import express from "express";
import { grapeVarietyWineType } from "../controllers/grapeVarietyController";

const router = express.Router();

router.get("/", grapeVarietyWineType);

export default router;
