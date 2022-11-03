const jwt = require("jsonwebtoken");
require("dotenv").config();

const authetication = (req, res, next) => {
  const token = req.headers?.authetication?.split(" ")[1];

  console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      res.send("Error in Authetication");
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};
module.exports = { authetication };
