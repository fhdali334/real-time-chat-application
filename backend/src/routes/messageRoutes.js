
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/history", async (req, res) => {
  const messages = await Message.find().sort({ timeStamp: 1 });
  res.json(messages);
});

module.exports = router;
