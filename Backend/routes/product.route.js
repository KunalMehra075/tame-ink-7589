const express = require("express");
const productRouter = express.Router();
const { ProductModel } = require("../models/products.model");

productRouter.get("/", async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
productRouter.post("/", async (req, res) => {
  let data = req.body;
  try {
    const instance = new ProductModel(data);
    await instance.save();
    res.send("Added product Successfully");
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
module.exports = { productRouter };
