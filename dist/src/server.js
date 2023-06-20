"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
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
app.get("/users", (req, res) => {
    res.send("User List");
});
app.get("/users/new", (req, res) => {
    res.send("User New Form");
});
app.listen(3001);
exports.default = app;
