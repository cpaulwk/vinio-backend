import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";

// require("./models/connection");

// var indexRouter = require("./routes/index");
// var weatherRouter = require("./routes/weather");
// var userRouter = require("./routes/users");

var app = express();

import cors from "cors";

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function main() {
//   const allWine = await prisma.wine.findMany();
//   console.log(allWine);
//   console.log("reached database");
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

async function addNewWine() {
  const newWine = await prisma.wine.create({
    data: {
      wine_id: 10,
      appellation_id: 29,
      wine_color_id: 1,
      wine_blend_id: 9,
      grape_variety_id: null,
    },
  });

  const allWine = await prisma.wine.findMany();
  console.log(allWine);
  console.log("new wine added successfully!");
}

// addNewWine()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

async function deleteWine(): Promise<void> {
  const deleteUser = await prisma.wine.delete({
    where: {
      wine_id: 10,
    },
  });

  const allWine = await prisma.wine.findMany();
  console.log(allWine);
  console.log("new wine added successfully!");
}

// deleteWine()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// app.use("/", indexRouter);
// app.use("/weather", weatherRouter);
// app.use("/users", userRouter);
import wineRouter from "./routes/wine";
import pairingRouter from "./routes/pairing";
import grapeVarietyRouter from "./routes/grapeVariety";
import appellationRouter from "./routes/appellation";
import productRouter from "./routes/product";
app.use("/wine", wineRouter);
app.use("/pairing", pairingRouter);
app.use("/grape-variety", grapeVarietyRouter);
app.use("/appellation", appellationRouter);
app.use("/product", productRouter);

module.exports = app;
