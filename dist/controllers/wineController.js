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
exports.deleteWine = exports.addNewWine = exports.getAllWines = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllWines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wines = yield prisma.wine.findMany();
        return res.json({ result: true, wines: wines });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.getAllWines = getAllWines;
// WIP add case management ie selected wine_id is a duplicate
const addNewWine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wine_id, appellation_id, wine_color_id, wine_blend_id, grape_variety_id, } = req.body;
    try {
        const createdWine = yield prisma.wine.create({
            data: {
                wine_id: parseInt(wine_id),
                appellation_id,
                wine_color_id,
                wine_blend_id,
                grape_variety_id,
            },
        });
        const allWines = yield prisma.wine.findMany();
        return res.status(200).json({ result: true, newWineList: allWines });
        // return res.status(201).json(createdWine);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            return res.status(409).json({ result: false, error: error.message });
        }
        console.error("error => ", error, " //END OF ERROR");
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.addNewWine = addNewWine;
// WIP add case management ie selected wine_id not found
const deleteWine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wine_id } = req.body;
        const deletedWine = yield prisma.wine.delete({
            where: {
                wine_id: Number(wine_id),
            },
        });
        const allWines = yield prisma.wine.findMany();
        return res.status(200).json({ result: true, newWineList: allWines });
        //return res.status(204).send();
    }
    catch (error) {
        console.error("error => ", error, " //END OF ERROR");
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            return res.status(409).json({ result: false, error: error.message });
        }
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.deleteWine = deleteWine;
