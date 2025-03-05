
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "User name is required" });
  }

  let user = await User.findOne({ userName });

  if (!user) {
    user = new User({ userName, userId: Math.random().toString(36).substr(2, 9) });
    await user.save();
  }

  res.json(user);
});

module.exports = router;
