const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "Yukino", (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.json({ Message: "Please Login First" });
      }
    });
  } else {
    res.json({ Message: "Please Login First" });
  }
};
module.exports = { authenticator };
