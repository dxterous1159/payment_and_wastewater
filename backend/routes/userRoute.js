const express = require("express");
const {
  registerUser,
//   loginUser,
//   logout,
//   forgotPassword,
//   resetPassword,
//   getUserDetails,
//   updatePassword,
//   updateProfile,
//   getAlluser,
//   getSingleUser,
//   updateUserRole,
//   deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

module.exports = router;