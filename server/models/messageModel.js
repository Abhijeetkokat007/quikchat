import { Schema, model } from "mongoose";
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const MessageSchema = new Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Messages = model('Messages', MessageSchema);
export default Messages ;