
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  messageBody: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
