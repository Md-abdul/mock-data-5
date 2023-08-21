const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.models");

router.post("/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(401).json({ msg: "User alredy exist" });
    } else {
      bcrypt.hash(req.body.password, 12, async (error, hash) => {
        if (error) {
          res.status(500).json({ msg: "error" });
        } else {
          const newUser = new UserModel({
            ...req.body,
            password: hash,
          });
          await newUser.save();
          res.status(200).json({ msg: "user register successfully" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, "masai");

          res.status(200).json({ msg: "Loing success", token });
        } else {
          res.status(401).json({ msg: "Incorrect password" });
        }
      });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
