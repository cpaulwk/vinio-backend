"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wineController_1 = require("../controllers/wineController");
const router = express_1.default.Router();
router.route("/");
// .get(getAllWines)
// .post(addNewWine)
// .delete(deleteWine);
router.get("/", wineController_1.getAllWines);
router.post("/", wineController_1.addNewWine);
router.delete("/", wineController_1.deleteWine);
exports.default = router;
