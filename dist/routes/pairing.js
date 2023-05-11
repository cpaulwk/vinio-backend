"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pairingController_1 = require("../controllers/pairingController");
const router = express_1.default.Router();
router.get("/grape-variety", pairingController_1.grapeVarietyPairing);
router.get("/appellation", pairingController_1.appellationPairing);
exports.default = router;
