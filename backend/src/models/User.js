const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    memberLevel: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum"],
      default: "bronze"
    },
    joinDate: {
      type: String,
      default: () => new Date().toLocaleDateString("vi-VN")
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);