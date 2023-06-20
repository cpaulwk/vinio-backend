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
exports.allData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const allData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllData = yield prisma.$queryRaw `
      WITH RECURSIVE get_all_products (product_id, product, parent_id, recursion_level) AS (
        SELECT 
          product_id,
          product,
          parent_id,
          0 AS recursion_level
        FROM product
        WHERE parent_id IS NULL

        UNION ALL

        SELECT
          p.product_id,
          p.product,
          p.parent_id,
          gap.recursion_level + 1
        FROM product p, get_all_products gap
        WHERE p.parent_id = gap.product_id
      ),

      get_all_cheese (product_id, product, parent_id) AS (
      SELECT
        g3.product_id,
        g3.product,
        g3.parent_id
      FROM get_all_products g1
      INNER JOIN get_all_products g2 ON g2.parent_id = g1.product_id
      INNER JOIN get_all_products g3 ON g3.parent_id = g2.product_id
      WHERE g1.recursion_level = 0
        AND g1.product = 'cheese'
      ),

      get_all_meat (product_id, product, parent_id) AS (
      SELECT
        g3.product_id,
        g3.product,
        g3.parent_id
      FROM get_all_products g1
      INNER JOIN get_all_products g2 ON g2.parent_id = g1.product_id
      INNER JOIN get_all_products g3 ON g3.parent_id = g2.product_id
      WHERE g1.recursion_level = 0
        AND g1.product = 'meat'
      ),

      get_all_grape_variety (grape_variety_id, grape_variety, wine_type_id) AS (
        SELECT grape_variety_id, grape_variety, wine_type_id
        FROM grape_variety
      )

      SELECT
        product AS name,
        'cheese' AS category
      FROM get_all_cheese

      UNION ALL 
      
      SELECT
        product AS name,
        'meat' AS category
      FROM get_all_meat

      UNION ALL

      SELECT
        grape_variety AS name,
        'grape_variety' AS category
      FROM get_all_grape_variety

      UNION ALL

      SELECT
        appellation AS name,
        'appellation' AS category
      FROM appellation
      ORDER BY 1 ASC;
      `;
        return res.json({ result: true, allData: getAllData });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ result: false, error: "Internal Server Error" });
    }
});
exports.allData = allData;
