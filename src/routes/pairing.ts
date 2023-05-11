import express from "express";
import {
  appellationPairing,
  grapeVarietyPairing,
} from "../controllers/pairingController";

const router = express.Router();

router.get("/grape-variety", grapeVarietyPairing);
router.get("/appellation", appellationPairing);

export default router;
