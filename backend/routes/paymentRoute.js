const express = require("express");
const { createPayment, getAllPayment, updatePayment, deletePayment } = require("../controllers/paymentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router
.route("/payment/new")
.post(isAuthenticatedUser, authorizeRoles("admin"), createPayment);

router
.route("/payment")
.get(isAuthenticatedUser, authorizeRoles("admin"), getAllPayment);

router
  .route("/payment/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePayment)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePayment);

module.exports = router;