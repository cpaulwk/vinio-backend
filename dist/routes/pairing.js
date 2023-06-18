"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pairingController_1 = require("../controllers/pairingController");
const router = express_1.default.Router();
router.post("/grape-variety", pairingController_1.suggestionForGrapeVariety);
router.post("/wine-blend", pairingController_1.suggestionForWineBlend);
router.post("/cheese-pairing", pairingController_1.findCheesePairing);
router.post("/pairing-result", pairingController_1.pairingGrapeVarietyResult);
router.post("/additional-suggestion", pairingController_1.additionalSuggestionForGrapeVariety);
exports.default = router;
