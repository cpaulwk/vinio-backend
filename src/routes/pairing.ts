import express from "express";
import {
  suggestionForGrapeVariety,
  suggestionForWineBlend,
  findCheesePairing,
  pairingGrapeVarietyResult,
  additionalSuggestionForGrapeVariety,
} from "../controllers/pairingController";

const router = express.Router();

router.post("/grape-variety", suggestionForGrapeVariety);
router.post("/wine-blend", suggestionForWineBlend);
router.post("/cheese-pairing", findCheesePairing);
router.post("/pairing-result", pairingGrapeVarietyResult);
router.post("/additional-suggestion", additionalSuggestionForGrapeVariety);

export default router;
