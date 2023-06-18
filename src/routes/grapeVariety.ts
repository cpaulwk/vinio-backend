import express from "express";
import {
  grapeVarietyWineType,
  allGrapeVariety,
} from "../controllers/grapeVarietyController";

const router = express.Router();

router.get("/", allGrapeVariety);
router.post("/", grapeVarietyWineType);

export default router;
