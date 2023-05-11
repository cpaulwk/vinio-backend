import express from "express";
import {
  getAllWines,
  addNewWine,
  deleteWine,
} from "../controllers/wineController";

const router = express.Router();

router.get("/", getAllWines);

router.post("/", addNewWine);

router.delete("/", deleteWine);

export default router;
