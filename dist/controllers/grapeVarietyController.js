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
Object.defineProperty(exports, "__esModule", { value: true });
exports.grapeVarietyWineType = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const grapeVarietyWineType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grape_variety_id, grape_variety } = req.body;
    try {
        const grapeVariety = yield prisma.grape_variety.findMany({
            where: {
                // grape_variety_id: parseInt(grape_variety_id),
                grape_variety: grape_variety,
            },
            include: {
                wine_type: {
                    select: {
                        wine_type: true,
                    },
                },
            },
        });
        return res.json({ result: true, wines: grapeVariety });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.grapeVarietyWineType = grapeVarietyWineType;
