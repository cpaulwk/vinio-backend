import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const suggestionForGrapeVariety = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { grape_variety } = req.body;
  try {
    const pairingForGrapeVariety =
      await prisma.$queryRaw`WITH RECURSIVE children AS (
    SELECT DISTINCT p.*
    FROM product p, wine_type_pairs_with_product wtp
    WHERE p.product_id = wtp.product_id
    AND wtp.wine_type_id IN (SELECT gv.wine_type_id FROM grape_variety gv WHERE
    gv.grape_variety = ${grape_variety})

    UNION ALL

    SELECT product.*
    FROM children
    JOIN product ON product.parent_id = children.product_id
    )
    SELECT *
    FROM children;`;

    console.log("Requested this route");
    return res.json({ result: true, pairing: pairingForGrapeVariety });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};

export const additionalSuggestionForGrapeVariety = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { grape_variety } = req.body;
  try {
    const sameWineType = await prisma.$queryRaw`
    SELECT grape_variety
		FROM grape_variety
		WHERE wine_type_id = (
			SELECT wine_type_id
			FROM grape_variety
			WHERE grape_variety = ${grape_variety}
		) AND grape_variety <> ${grape_variety}
		ORDER BY RAND() ASC
		LIMIT 5;
    `;

    console.log("Requested this route");
    return res.json({ result: true, pairing: sameWineType });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};

export const suggestionForWineBlend = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { wine_blend } = req.body;
  try {
    const pairingForWineBlend =
      await prisma.$queryRaw`WITH RECURSIVE children AS (
    SELECT DISTINCT p.*
    FROM product p, wine_type_pairs_with_product wtp
    WHERE p.product_id = wtp.product_id
    AND wtp.wine_type_id IN (SELECT wb.wine_type_id FROM wine_blend wb WHERE
    wb.wine_blend = ${wine_blend})

    UNION ALL

    SELECT product.*
    FROM children
    JOIN product ON product.parent_id = children.product_id
    )
    SELECT *
    FROM children;`;

    console.log("Requested this route");
    return res.json({ result: true, pairing: pairingForWineBlend });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};

export const findCheesePairing = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { grape_variety, cheese } = req.body;
  try {
    const resultCheesePairing =
      await prisma.wine_type_pairs_with_product.findFirst({
        where: {
          product: { product: cheese },
          wine_type: { wine_type: grape_variety },
        },
      });

    console.log("resultCheesePairing => ", resultCheesePairing);

    console.log("Requested this route");
    return res.json({ result: true, pairing: resultCheesePairing });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};

export const pairingGrapeVarietyResult = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { grape_variety, product } = req.body;
  try {
    const pairingForGrapeVariety = await prisma.$queryRaw`
				WITH RECURSIVE get_product_parents (product_id, product, parent_id, recursion_level) AS (
				  SELECT
					  product_id,
						product,
						parent_id,
						2
					FROM product
					WHERE product = ${product}

					UNION ALL

					SELECT
					  p.product_id,
						p.product,
						p.parent_id,
						gpp.recursion_level - 1
					FROM get_product_parents gpp, product p
					WHERE p.product_id = gpp.parent_id
			),
		
				get_product_family (product_id, product) AS (
					SELECT
						product_id,
						product
					FROM get_product_parents
					WHERE recursion_level = 1
				),

				get_wine_type (wine_type_id, wine_type) AS (
					SELECT 
						wt.wine_type_id,
					  wt.wine_type
					FROM wine_type wt
					JOIN grape_variety gv
					ON wt.wine_type_id = gv.wine_type_id
					WHERE gv.grape_variety = ${grape_variety}
				),

				result (wine_type_id, product_id, excellent_pairing) AS (
					SELECT
						wtpwp.wine_type_id,
						wtpwp.product_id,
						wtpwp.excellent_pairing
					FROM wine_type_pairs_with_product wtpwp
					JOIN wine_type wt
					ON wt.wine_type_id = wtpwp.wine_type_id
					JOIN product p
					ON p.product_id = wtpwp.product_id
					WHERE wt.wine_type_id = (
						SELECT wine_type_id
						FROM get_wine_type
					)
					AND p.product_id = (
						SELECT product_id
						FROM get_product_family
          )
				)

				SELECT *
				FROM result;`;

    console.log("pairingForGrapeVariety =>", pairingForGrapeVariety);
    console.log("Requested this route");
    return res.json({ result: true, pairing: pairingForGrapeVariety });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ result: false, error: "Internal Server Error" });
  }
};
