const express = require("express");
const { createMonth, getAllMonth } = require("../controllers/monthAndyear/monthController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router
.route("/month/new")
.post(isAuthenticatedUser, authorizeRoles("admin", "employee"), createMonth);

router
.route("/getall/month")
.get(isAuthenticatedUser, authorizeRoles("admin", "employee"), getAllMonth);
module.exports = router;