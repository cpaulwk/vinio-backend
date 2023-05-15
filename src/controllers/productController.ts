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
    /*
    const productList = await prisma.$queryRaw`
  WITH RECURSIVE children AS (
    SELECT *
    FROM product
    WHERE parent_id = ${product_id}
    
    UNION ALL
    
    SELECT product.*
    FROM children
    JOIN product ON product.parent_id = children.product_id
  )
  SELECT *
  FROM children;
`;
*/
    /*
        const productList = await prisma.$queryRaw`
      WITH RECURSIVE children AS (
        SELECT *
        FROM product
        WHERE parent_id IN (3,4,5)
        
        UNION ALL
        
        SELECT product.*
        FROM children
        JOIN product ON product.parent_id = children.product_id
      )
      SELECT *
      FROM children;
    `;
    */

    const productList = await prisma.$queryRaw`
    SELECT *
    FROM product
    WHERE parent_id IN (3,4,5)
`;

    return res.json({ result: true, products: productList });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
