import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllWines = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const wines = await prisma.wine.findMany();
    return res.json({ result: true, wines: wines });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};

// WIP add case management ie selected wine_id is a duplicate
export const addNewWine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { wine_id, appellation_id, wine_color_id, wine_blend_id } = req.body;

  try {
    const createdWine = await prisma.wine.create({
      data: {
        wine_id: parseInt(wine_id),
        appellation_id: parseInt(appellation_id),
        wine_color_id: parseInt(wine_color_id),
        wine_blend_id: parseInt(wine_blend_id),
      },
    });

    const allWines = await prisma.wine.findMany();
    return res.status(200).json({ result: true, newWineList: allWines });
    // return res.status(201).json(createdWine);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ result: false, error: error.message });
    }
    console.error("error => ", error, " //END OF ERROR");
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};

// WIP add case management ie selected wine_id not found
export const deleteWine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { wine_id } = req.body;
    const deletedWine = await prisma.wine.delete({
      where: {
        wine_id: Number(wine_id),
      },
    });

    const allWines = await prisma.wine.findMany();
    return res.status(200).json({ result: true, newWineList: allWines });
    //return res.status(204).send();
  } catch (error) {
    console.error("error => ", error, " //END OF ERROR");
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ result: false, error: error.message });
    }
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
