"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const wine_1 = __importDefault(require("./routes/wine"));
const pairing_1 = __importDefault(require("./routes/pairing"));
const grapeVariety_1 = __importDefault(require("./routes/grapeVariety"));
const appellation_1 = __importDefault(require("./routes/appellation"));
const product_1 = __importDefault(require("./routes/product"));
const autocomplete_1 = __importDefault(require("./routes/autocomplete"));
app.use("/wine", wine_1.default);
app.use("/pairing", pairing_1.default);
app.use("/grape-variety", grapeVariety_1.default);
app.use("/appellation", appellation_1.default);
app.use("/product", product_1.default);
app.use("/autocomplete", autocomplete_1.default);
app.get("/", (req, res) => {
    console.log("Here");
    res.send("Hi");
});
app.listen(3001);
