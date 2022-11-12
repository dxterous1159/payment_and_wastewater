const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const ApiFeatures = require("../utils/apifeatures");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
//   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//     folder: "avatars",
//     width: 150,
//     crop: "scale",
//   });

  const { titlename, firstname, lastname, identification, phone, jobtitle, email, password } = req.body;

  const user = await User.create({
    identification,
    titlename,
    firstname,
    lastname,
    phone,
    jobtitle,
    email,
    password,
    avatar: {
      public_id: "sapleID",
      url: "saple_url",
    },
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Payment And Wastewater Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    identification: req.body.identification,
    titlename: req.body.titlename,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    jobtitle: req.body.jobtitle,
    email: req.body.email,
  };

  // We will add cloundinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    identification: req.body.identification,
    titlename: req.body.titlename,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    jobtitle: req.body.jobtitle,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password isincorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Delete User -- Admin - Employee
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  // We will remove cloundinary later

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Delete Successfully",
  });
});

// Create New AddresUser or Update the AddresUser Admin - Employee
exports.createAddresUser = catchAsyncErrors(async (req, res, next) => {
  const { paymenttype,place,homenumber,lane,villageno,road,province,district,subdistrict,zipcode, userId } = req.body;

  const addressUser = {
    user: req.user._id,
    firstname: req.user.firstname,
    paymenttype,
    place,
    homenumber,
    lane,
    villageno: Number(villageno),
    road,
    province,
    district,
    subdistrict,
    zipcode,
  };

  const user = await User.findById(userId);

  user.myaddress.push(addressUser);


  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Create New AddresUser or Update the AddresUser Admin - Employee
exports.createInstallmenUser = catchAsyncErrors(async (req, res, next) => {
  const { trash,monthtrash,yeartrash,wastewater,monthwastewater,yearmonth, addressId } = req.body;

  const addressUser = {

    user: req.user._id,
    trash,
    monthtrash,
    yeartrash,

    wastewater,
    monthwastewater,
    yearmonth,

  };

  const user = await User.findById(addressId);

  user.myaddress[0].myinstallment.push(addressUser);


  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});



// Get All Review of a product
exports.getUserAddress = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  res.status(200).json({
    success: true,
    myaddress: user.myaddress,
  });
});

// Delete Address Admin - Employee
exports.deleteAddress = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.query.userId);

  if (!user) {
    return next(new ErrorHander("address not found", 404));
  }


  const myaddress = user.myaddress.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );


  await User.findByIdAndUpdate(
    req.query.userId,
    {
      myaddress,

    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

/*------------------------------------------------------------------------------------------------------------------------------- */

// // Get All users (Admin, And Employee)
// exports.getAlluser = catchAsyncErrors(async (req, res, next) => {
//  // const users = await User.find();
//   const usersCount = await User.countDocuments();
//   const resultPerPage = 8;

//   const apiFeature = new ApiFeatures(User.find(), req.query)
//     .search()
//     .filter()
//    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

//    let users = await apiFeature.query;

//   res.status(200).json({
//     success: true,
//     users,
//     usersCount,
//     resultPerPage,
//   });
// });

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Get Single user (Admin, And Employee)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});