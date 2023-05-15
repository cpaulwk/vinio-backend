import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const productRecursiveList = async (
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
    return res.json({ result: true, products: productList });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
