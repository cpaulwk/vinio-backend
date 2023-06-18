import express from "express";
import { allData } from "../controllers/autocompleteController";

const router = express.Router();

router.get("/", allData);

export default router;
