const express = require("express");
const {
  createInstallment,
  myInstallment,
  getAllInstallment,
  updateInstallment,
} = require("../controllers/installment/installmentControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/installment/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    createInstallment
  );

router
  .route("/data/installments")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    getAllInstallment)

router
  .route("/update/installments/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    updateInstallment);

router
  .route("/installments/me")
  .get(myInstallment)

module.exports = router;
