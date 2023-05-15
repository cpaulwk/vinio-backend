import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const extractProducts = (obj: Record<string, any>, arr: any[]): any[] => {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object") {
      extractProducts(value, arr);
    } else if (key === "product_id") {
      arr.push(value);
    }
  }
  return arr;
};

export const grapeVarietyPairing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { grape_variety_id, grape_variety } = req.body;
  try {
    const grapeVarietyMatch = await prisma.grape_variety.findMany({
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
                    product_id: true,
                    product: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const productsList = extractProducts(grapeVarietyMatch, []);
    console.log("productsList =>", productsList);

    const pairedProducts = await prisma.product.findMany({
      where: {
        parent_id: {
          in: productsList,
        },
      },
      select: {
        product_id: true,
        product: true,
      },
    });

    // return res.json({ result: true, pairing: grapeVariety });
    return res.json({ result: true, pairing: pairedProducts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};

export const appellationPairing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { appellation_id, appellation } = req.body;
  try {
    const appellationMatch = await prisma.appellation.findMany({
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

    const appellationList = extractProducts(appellationMatch, []);
    console.log("productsList =>", appellationList);

    const pairedProducts = await prisma.product.findMany({
      where: {
        parent_id: {
          in: appellationList,
        },
      },
      select: {
        product_id: true,
        product: true,
      },
    });
    return res.json({ result: true, pairing: pairedProducts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
