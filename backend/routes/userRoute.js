const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAlluser,
//   forgotPassword,
//   resetPassword,
//   getUserDetails,
//   updatePassword,
//   updateProfile,
//   getSingleUser,
//   updateUserRole,
//   deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAlluser);

module.exports = router;