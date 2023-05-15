import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const appellationWineBlend = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { appellation_id, appellation } = req.body;
  try {
    const getAppellation = await prisma.appellation.findMany({
      where: {
        // appellation_id: parseInt(appellation_id),
        appellation: appellation,
      },
      include: {
        wine_blend: {
          select: {
            wine_blend: true,
          },
        },
      },
    });
    return res.json({ result: true, appellations: getAppellation });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
