import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const grapeVarietyPairing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { grape_variety_id, grape_variety } = req.body;
  // console.log("req.body.wine_type =>", grape_variety);
  try {
    const grapeVariety = await prisma.grape_variety.findMany({
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
    const grapeVariety = await prisma.appellation.findMany({
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
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
