import * as express from "express";
const cheeses = require("./data/cheeses.json");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/api/cheeses", (req, res, next) => {
  res.json(cheeses);
});

router.post("/api/purchase", (req, res) => {
  const items = JSON.stringify(req.body.items);
  const filePath = path.resolve(
    __dirname,
    "../src/server/data/purchase-history.json"
  );
  fs.writeFile(filePath, items, function(err: Error) {
    if (err) throw err;
    res.json(items);
  });
});

export default router;
