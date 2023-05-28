import express from "express";
import {
  appellationPairing,
  grapeVarietyPairing,
} from "../controllers/pairingController";

const router = express.Router();

router.post("/grape-variety", grapeVarietyPairing);
router.post("/appellation", appellationPairing);

export default router;
