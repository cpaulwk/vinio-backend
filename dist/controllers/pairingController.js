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
exports.pairingGrapeVarietyResult = exports.findCheesePairing = exports.suggestionForWineBlend = exports.additionalSuggestionForGrapeVariety = exports.suggestionForGrapeVariety = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const suggestionForGrapeVariety = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grape_variety } = req.body;
    try {
        const pairingForGrapeVariety = yield prisma.$queryRaw `WITH RECURSIVE children AS (
    SELECT DISTINCT p.*
    FROM product p, wine_type_pairs_with_product wtp
    WHERE p.product_id = wtp.product_id
    AND wtp.wine_type_id IN (SELECT gv.wine_type_id FROM grape_variety gv WHERE
    gv.grape_variety = ${grape_variety})

    UNION ALL

    SELECT product.*
    FROM children
    JOIN product ON product.parent_id = children.product_id
    )
    SELECT *
    FROM children;`;
        console.log("Requested this route");
        return res.json({ result: true, pairing: pairingForGrapeVariety });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.suggestionForGrapeVariety = suggestionForGrapeVariety;
const additionalSuggestionForGrapeVariety = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grape_variety } = req.body;
    try {
        const sameWineType = yield prisma.$queryRaw `
    SELECT grape_variety
		FROM grape_variety
		WHERE wine_type_id = (
			SELECT wine_type_id
			FROM grape_variety
			WHERE grape_variety = ${grape_variety}
		) AND grape_variety <> ${grape_variety}
		ORDER BY RAND() ASC
		LIMIT 5;
    `;
        console.log("Requested this route");
        return res.json({ result: true, pairing: sameWineType });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.additionalSuggestionForGrapeVariety = additionalSuggestionForGrapeVariety;
const suggestionForWineBlend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { wine_blend } = req.body;
    try {
        const pairingForWineBlend = yield prisma.$queryRaw `WITH RECURSIVE children AS (
    SELECT DISTINCT p.*
    FROM product p, wine_type_pairs_with_product wtp
    WHERE p.product_id = wtp.product_id
    AND wtp.wine_type_id IN (SELECT wb.wine_type_id FROM wine_blend wb WHERE
    wb.wine_blend = ${wine_blend})

    UNION ALL

    SELECT product.*
    FROM children
    JOIN product ON product.parent_id = children.product_id
    )
    SELECT *
    FROM children;`;
        console.log("Requested this route");
        return res.json({ result: true, pairing: pairingForWineBlend });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.suggestionForWineBlend = suggestionForWineBlend;
const findCheesePairing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grape_variety, cheese } = req.body;
    try {
        const resultCheesePairing = yield prisma.wine_type_pairs_with_product.findFirst({
            where: {
                product: { product: cheese },
                wine_type: { wine_type: grape_variety },
            },
        });
        console.log("resultCheesePairing => ", resultCheesePairing);
        console.log("Requested this route");
        return res.json({ result: true, pairing: resultCheesePairing });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.findCheesePairing = findCheesePairing;
const pairingGrapeVarietyResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grape_variety, product } = req.body;
    try {
        const pairingForGrapeVariety = yield prisma.$queryRaw `
				WITH RECURSIVE get_product_parents (product_id, product, parent_id, recursion_level) AS (
				  SELECT
					  product_id,
						product,
						parent_id,
						2
					FROM product
					WHERE product = ${product}

					UNION ALL

					SELECT
					  p.product_id,
						p.product,
						p.parent_id,
						gpp.recursion_level - 1
					FROM get_product_parents gpp, product p
					WHERE p.product_id = gpp.parent_id
			),
		
				get_product_family (product_id, product) AS (
					SELECT
						product_id,
						product
					FROM get_product_parents
					WHERE recursion_level = 1
				),

				get_wine_type (wine_type_id, wine_type) AS (
					SELECT 
						wt.wine_type_id,
					  wt.wine_type
					FROM wine_type wt
					JOIN grape_variety gv
					ON wt.wine_type_id = gv.wine_type_id
					WHERE gv.grape_variety = ${grape_variety}
				),

				result (wine_type_id, product_id, excellent_pairing) AS (
					SELECT
						wtpwp.wine_type_id,
						wtpwp.product_id,
						wtpwp.excellent_pairing
					FROM wine_type_pairs_with_product wtpwp
					JOIN wine_type wt
					ON wt.wine_type_id = wtpwp.wine_type_id
					JOIN product p
					ON p.product_id = wtpwp.product_id
					WHERE wt.wine_type_id = (
						SELECT wine_type_id
						FROM get_wine_type
					)
					AND p.product_id = (
						SELECT product_id
						FROM get_product_family
          )
				)

				SELECT *
				FROM result;`;
        console.log("pairingForGrapeVariety =>", pairingForGrapeVariety);
        console.log("Requested this route");
        return res.json({ result: true, pairing: pairingForGrapeVariety });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.pairingGrapeVarietyResult = pairingGrapeVarietyResult;
