const express = require("express");
const router = express.Router();
const {
  saveContactController,
  getContactlistController,
} = require("../controller/contact.controller");
const { verifyToken } = require("../middleware/verifyToken");
router.get(
  "/admin/contact/contact-list",
  verifyToken,
  getContactlistController
);
module.exports = router;
//PUBLIC ROUTE
router.post("/jabit/contact/save", saveContactController);
module.exports = router;
