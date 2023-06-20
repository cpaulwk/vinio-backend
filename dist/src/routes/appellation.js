"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appellationController_1 = require("../controllers/appellationController");
const router = express_1.default.Router();
router.get("/", appellationController_1.appellationWineBlend);
exports.default = router;
