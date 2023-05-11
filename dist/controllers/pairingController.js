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
exports.appellationPairing = exports.grapeVarietyPairing = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const grapeVarietyPairing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grape_variety_id, grape_variety } = req.body;
    // console.log("req.body.wine_type =>", grape_variety);
    try {
        const grapeVariety = yield prisma.grape_variety.findMany({
            where: {
                // grape_variety_id: parseInt(grape_variety_id),
                grape_variety: grape_variety,
            },
            include: {
                wine_type: {
                    include: {
                        wine_type_pairs_with_product: {
                            include: {
                                product: {
                                    select: {
                                        product: true,
                                    },
                                },
                            },
                        },
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
exports.grapeVarietyPairing = grapeVarietyPairing;
const appellationPairing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appellation_id, appellation } = req.body;
    try {
        const grapeVariety = yield prisma.appellation.findMany({
            where: {
                // appellation_id: parseInt(appellation_id),
                appellation: appellation,
            },
            include: {
                wine_blend: {
                    include: {
                        wine_type: {
                            include: {
                                wine_type_pairs_with_product: {
                                    include: {
                                        product: {
                                            select: {
                                                product: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
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
exports.appellationPairing = appellationPairing;
