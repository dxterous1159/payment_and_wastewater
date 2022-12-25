const express = require("express");
const { createYear, getAllYear } = require("../controllers/monthAndyear/yearController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router
.route("/year/new")
.post(isAuthenticatedUser, authorizeRoles("admin", "employee"), createYear);

router
.route("/getall/year")
.get(isAuthenticatedUser, authorizeRoles("admin", "employee"), getAllYear);

module.exports = router;