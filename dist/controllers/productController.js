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
exports.getProductFromAppellation = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProductFromAppellation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appellation } = req.body;
    try {
        const productList = yield prisma.$queryRaw `WITH RECURSIVE children AS (
    SELECT DISTINCT p.*
    FROM product p, wine_type_pairs_with_product wtp
    WHERE p.product_id = wtp.product_id
    AND wtp.wine_type_id IN (SELECT wb.wine_type_id FROM appellation a, wine_blend wb WHERE
    wb.appellation_id = a.appellation_id
    AND a.appellation = ${appellation})

    UNION ALL

    SELECT product.*
    FROM children
    JOIN product ON product.parent_id = children.product_id
    )
    SELECT *
    FROM children;`;
        // const productList = await prisma.$queryRaw`
        // WITH RECURSIVE children AS (
        // SELECT *
        // FROM product
        // WHERE parent_id = ${product_id}
        // UNION ALL
        // SELECT product.*
        // FROM children
        // JOIN product ON product.parent_id = children.product_id
        // )
        // SELECT product_id, product
        // FROM children;
        // `;
        console.log("Requested this route");
        return res.json({ result: true, products: productList });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.getProductFromAppellation = getProductFromAppellation;
