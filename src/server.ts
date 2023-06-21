import express from "express";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";

const app = express();

import cors from "cors";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import wineRouter from "./routes/wine";
import pairingRouter from "./routes/pairing";
import grapeVarietyRouter from "./routes/grapeVariety";
import appellationRouter from "./routes/appellation";
import productRouter from "./routes/product";
import autocompleteRouter from "./routes/autocomplete";
app.use("/wine", wineRouter);
app.use("/pairing", pairingRouter);
app.use("/grape-variety", grapeVarietyRouter);
app.use("/appellation", appellationRouter);
app.use("/product", productRouter);
app.use("/autocomplete", autocompleteRouter);

app.get("/", (req: Request, res: Response) => {
  console.log("Here");
  res.send("Hi");
});

app.get("/users", (req: Request, res: Response) => {
  res.send("User List");
});

app.get("/users/new", (req: Request, res: Response) => {
  res.send("User New Form");
});

// app.listen(3001);

// export default app;
module.exports = app;
