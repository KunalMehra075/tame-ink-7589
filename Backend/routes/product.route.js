const express = require("express");
const productRouter = express.Router();
const { ProductModel } = require("../models/products.model");

productRouter.get("/", async (req, res) => {
  try {
    const Products = await ProductModel.find();
    res.json({ Products });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
productRouter.post("/create", async (req, res) => {
  let data = req.body;
  try {
    const instance = new ProductModel(data);
    await instance.save();
    res.json({ Message: "Added product Successfully", Instance: instance });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
module.exports = { productRouter };
