const express = require("express");
const { UserModel } = require("../models/users.model");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
userRouter.post("/", async (req, res) => {
  let data = req.body;
  try {
    const instance = new UserModel(data);
    await instance.save();
    res.send("Added User Successfully");
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});
module.exports = { userRouter };
