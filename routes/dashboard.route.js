const express=require('express');
const { getDashboardController } = require('../controller/dashboard.controller');
const { verifyToken } = require("../middleware/verifyToken");
const router=express.Router();
router.get("/admin/dashboard/status-count",verifyToken,getDashboardController);
module.exports=router;