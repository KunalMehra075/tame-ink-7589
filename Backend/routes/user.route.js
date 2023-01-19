const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json({ data });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
userRouter.post("/create", async (req, res) => {
  let data = req.body;
  let email = req.body.email;
  let name = req.body.name;
  if (!data.role) {
    data.role = "Explorer";
  }

  try {
    let user = await UserModel.find({ email });
    let user1 = await UserModel.find({ name });

    if (user.length || user1.length) {
      res.json({ Message: "User Already Exists", exist: true, User: user });
    } else {
      bcrypt.hash(data.pass, 5, async function (err, hash) {
        if (hash) {
          data.pass = hash;
          const instance = new UserModel(data);
          await instance.save();
          res.json({ Message: "Added User Successfully", User: instance });
        } else {
          res.json({ Message: "Something Went Wrong" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});
module.exports = { userRouter };
