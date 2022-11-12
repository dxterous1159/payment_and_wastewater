const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAlluser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getSingleUser,
  updateUserRole,
  deleteUser,
  createAddresUser,
  deleteAddress,
  getUserAddress,
  createInstallmenUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/addresed")
  .get(getUserAddress)
  .delete(isAuthenticatedUser, deleteAddress);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin", "employee"), getAlluser);

  router.route("/address").put(isAuthenticatedUser, authorizeRoles("admin", "employee"), createAddresUser);
  // router.route("/installmen").put(isAuthenticatedUser, authorizeRoles("admin", "employee"), createInstallmenUser);

// router
//   .route("/admin/users")
//   .get(getAlluser);

  router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin", "employee"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;