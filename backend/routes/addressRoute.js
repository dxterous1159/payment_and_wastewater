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
} = require("../controllers/addressController");
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

/*------------------------------------------------------------------------------------------------------------------ */

router
  .route("/installment")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    createInstallmentUser
  );

router
  .route("/installments")
  .get(getInstallmentAddress)
  .delete(isAuthenticatedUser, deleteInstallment);

module.exports = router;
