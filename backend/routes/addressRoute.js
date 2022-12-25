const express = require("express");
const {
  createAddress,
  getAllAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress,
  createInstallmentUser,
  getInstallmentAddress,
  deleteInstallment,
  myAddress,
} = require("../controllers/address/addressController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/address/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    createAddress
  );

router
  .route("/admin/address")
  .get(isAuthenticatedUser, authorizeRoles("admin", "employee"), getAllAddress);

router
  .route("/admin/address/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    getSingleAddress
  )
  .put(isAuthenticatedUser, authorizeRoles("admin", "employee"), updateAddress)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    deleteAddress
  );

  router.route("/address/me").get(isAuthenticatedUser, myAddress);

/*------------------------------------------------------------------------------------------------------------------ */


module.exports = router;
