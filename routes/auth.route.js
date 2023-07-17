const express=require('express');
const { loginController,loginVerifyController } = require('../controller/auth.controller');
const router=express.Router();
router.post("/admin/login",loginController);
router.post("/admin/login-verification",loginVerifyController);
module.exports=router;

