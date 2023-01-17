const express = require("express");
const { connection } = require("./configs/db");
const { UserModel } = require("./models/users.model");
const { userRouter } = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  try {
    res.send("Welcome to Pepperfry");
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to DB");
  }
  console.log(`Server is Running on port ${process.env.port}`);
});
