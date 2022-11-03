const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { SignupModel } = require("../Models/Signup.Model");

const SignupRouter = Router();

SignupRouter.get("/", (req, res) => {
  res.send("You Are On HomePage");
});

SignupRouter.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 6, async function (err, hash) {
    if (err) {
      res.send({ "Error:": "something error" });
    } else {
      const newUser = new SignupModel({ email, password: hash, name });
      await newUser.save();
      res.send({ message: "successfully registered" });
    }
  });
});

SignupRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await SignupModel.findOne({ email });
  let hash = user.password;
  console.log(hash);

  bcrypt.compare(password, hash, async function (err, result) {
    if (user && result) {
      let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({
        message: "Login successful",
        token,
      });
    } else {
      res.send({ err: "Login Unsuccessfull" });
    }
  });
});

module.exports = { SignupRouter };
