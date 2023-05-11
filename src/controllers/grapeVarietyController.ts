import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const grapeVarietyWineType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { grape_variety_id, grape_variety } = req.body;
  try {
    const grapeVariety = await prisma.grape_variety.findMany({
      where: {
        // grape_variety_id: parseInt(grape_variety_id),
        grape_variety: grape_variety,
      },
      include: {
        wine_type: {
          select: {
            wine_type: true,
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
