//const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
//const sendEmail = require("../utils/sendEmail");
//const crypto = require("crypto");
//const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
//   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//     folder: "avatars",
//     width: 150,
//     crop: "scale",
//   });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sapleID",
      url: "saple_url",
    },
  });

  sendToken(user, 201, res);
});