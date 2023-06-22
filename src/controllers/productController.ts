import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductFromAppellation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { appellation } = req.body;
  try {
    const productList = await prisma.$queryRaw`WITH RECURSIVE children AS (
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

    return res.json({ result: true, products: productList });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
