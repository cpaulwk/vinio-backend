import { Request, Response } from "express";

import express from "express";
const app = express();

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

app.listen(3001);
