const express = require("express");
const { saveUpdatePortfolioController, getPortfolioListController,getPortfolioPublicListController,getPortfolioByIdController } = require("../controller/portfolio.controller");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();
router.post("/admin/portfolio/save-update",verifyToken, saveUpdatePortfolioController);
router.get("/admin/portfolio/get-portfolio-list",verifyToken, getPortfolioListController);
router.post("/admin/portfolio/get-portfolio-by-id",verifyToken, getPortfolioByIdController);

//Public Routes
router.get("/jabit/portfolio/get-portfolio-list", getPortfolioPublicListController);
router.post("/jabit/portfolio/get-portfolio-by-id", getPortfolioByIdController);


module.exports = router;
