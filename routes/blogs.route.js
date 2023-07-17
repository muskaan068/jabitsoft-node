const express = require("express");
const {
  createPostController,
  getBlogsController,
  getCategoryController,
  draftToPublishController,
  getBlogsByIdController,
  getLatestBlogsController,
  getAllBlogsByCategoryController,
  getLatestThreeBlogsController,
  blogToUnPublishController,
} = require("../controller/blogs.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { getBlogByIdServices } = require("../services/blogs.services");
const router = express.Router();
router.post("/admin/blogs/publish-blog", verifyToken, createPostController);
router.get("/admin/blogs/blog-list", verifyToken, getBlogsController);
router.post(
  "/admin/blogs/draft-to-publish",
  verifyToken,
  draftToPublishController
);
router.post(
  "/admin/blogs/blog-to-unpublish",
  verifyToken,
  blogToUnPublishController
);
router.post("/admin/blogs/blog-getby-id", verifyToken, getBlogsByIdController);
router.get("/admin/blogs/blog-category-list", getCategoryController);

// Public Blog route
router.get("/jabit/blogs/latest-blogs", getLatestBlogsController);
router.get("/jabit/blogs/latest-three-blogs", getLatestThreeBlogsController);
router.post(
  "/jabit/blogs/blog-list-by-category",
  getAllBlogsByCategoryController
);
router.post("/jabit/blogs/blog-getby-id", getBlogsByIdController);
module.exports = router;
