import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const extractProducts = (obj: Record<string, any>, arr: any[]): any[] => {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object") {
      extractProducts(value, arr);
    } else if (key === "product") {
      arr.push(value);
    }
  }
  return arr;
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { product_id, product, parent_id } = req.body;
  try {
    const productList = await prisma.$queryRaw`WITH RECURSIVE children AS (
	SELECT DISTINCT p.*
	FROM product p, wine_type_pairs_with_product wtp
	WHERE p.product_id = wtp.product_id
	AND wtp.wine_type_id IN (SELECT wb.wine_type_id FROM appellation a, wine_blend wb WHERE
		wb.appellation_id = a.appellation_id
		AND a.appellation = ${req.body.appellation})

	UNION ALL

	SELECT product.*
	FROM children
	JOIN product ON product.parent_id = children.product_id
)
SELECT product_id, product
FROM children;`;

    // const productList = await prisma.$queryRaw`
    // WITH RECURSIVE children AS (
    // SELECT *
    // FROM product
    // WHERE parent_id = ${req.body.appellation}

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
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
