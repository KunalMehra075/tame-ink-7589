const express = require("express");
const { authenticator } = require("../middlewares/authenticator.middleware");

const { ProductModel } = require("../models/products.model");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  let query = req.query;
  console.log(query);
  try {
    const Products = await ProductModel.find(query);
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
productRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const deleted = await ProductModel.findByIdAndDelete({ _id: id });
    res.json({ Message: "Deleted product Successfully", Deleted: deleted });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
productRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    const updated = await ProductModel.findByIdAndUpdate({ _id: id }, payload);
    res.json({ Message: "Updated product Successfully", Updated: updated });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
module.exports = { productRouter };
