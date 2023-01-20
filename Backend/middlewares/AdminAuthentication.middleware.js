const jwt = require("jsonwebtoken");

const AdminAuthenticator = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.json("Please Login First");
    return;
  }
  jwt.verify(token, "Yukino", (err, decoded) => {
    if (decoded) {
      console.log(decoded);
      if (decoded.user.role == "Admin") {
        next();
      } else {
        res.json({ Message: "You are not Authorized" });
      }
    } else {
      res.json({ Message: "Please Login First" });
    }
  });
};
module.exports = { AdminAuthenticator };
