"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
// require("./models/connection");
// var indexRouter = require("./routes/index");
// var weatherRouter = require("./routes/weather");
// var userRouter = require("./routes/users");
var app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// async function main() {
//   const allWine = await prisma.wine.findMany();
//   console.log(allWine);
//   console.log("reached database");
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
function addNewWine() {
    return __awaiter(this, void 0, void 0, function* () {
        const newWine = yield prisma.wine.create({
            data: {
                wine_id: 10,
                appellation_id: 29,
                wine_color_id: 1,
                wine_blend_id: 9,
                grape_variety_id: null,
            },
        });
        const allWine = yield prisma.wine.findMany();
        console.log(allWine);
        console.log("new wine added successfully!");
    });
}
// addNewWine()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
function deleteWine() {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteUser = yield prisma.wine.delete({
            where: {
                wine_id: 10,
            },
        });
        const allWine = yield prisma.wine.findMany();
        console.log(allWine);
        console.log("new wine added successfully!");
    });
}
// deleteWine()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
// app.use("/", indexRouter);
// app.use("/weather", weatherRouter);
// app.use("/users", userRouter);
const wine_1 = __importDefault(require("./routes/wine"));
const pairing_1 = __importDefault(require("./routes/pairing"));
const grapeVariety_1 = __importDefault(require("./routes/grapeVariety"));
app.use("/wine", wine_1.default);
app.use("/pairing", pairing_1.default);
app.use("/grape-variety", grapeVariety_1.default);
module.exports = app;
