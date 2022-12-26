const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  settingtype: {
    type: String,
    required: [true, "Please Enter product SettingType"], 
  },
  sticker: [
    {
      selecttype: {
        type: String,
        required: true,
      },
      titletype: {
        type: String,
        required: true,
      },
    },
  ],
  bankname: {
    type: String,
    required: [true, "Please Enter product Bankname"],
    minLength: [4, "Bankname cannot exceed 4 characters"], 
  },
  bankbranch: {
    type: String,
    required: [true, "Please Enter product BacnkBranch"],
    minLength: [4, "BacnkBranch cannot exceed 4 characters"], 
  },
accountbankname: {
    type: String,
    required: [true, "Please Enter product AccountBankName"],
    minLength: [3, "AccountBankName cannot exceed 4 characters"], 
  },
  banknumber: {
    type: String,
    required: [true, "Please Enter product BacnkNumber"],
    minLength: [1, "BacnkNumber cannot exceed 10 characters"], 
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
