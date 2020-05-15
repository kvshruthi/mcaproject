const express = require("express");
const router = express.Router();
const {
  getallNews,
  getNews,
  addNews,
  updateNews,
  deleteNews,
  newsphotoUpload
} = require("../controllers/news");

const News = require("../models/News");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

// router
//   .route("/")
//   .get(
//     advancedResults(News, {
//       path: "admin",
//       select: "name description",
//     }),
//     getallNews
//   )
//   .post(protect, authorize("user", "admin"), addNews);

  router
  .route("/")
  .get(advancedResults(News, {path: "news",select: "name",}),getallNews)
  .post(protect, authorize("admin"), addNews);

// router
//   .route("/:id")
//   .get(getNews)
//   .put(protect, authorize("admin", "admin"), updateNews)
//   .delete(protect, authorize("admin", "admin"), deleteNews);

  router
  .route("/:id")
  .get(getNews)
  .put(protect, authorize("admin"), updateNews)
  .delete(protect, authorize("admin"), deleteNews);

  router
  .route("/photo")
  .post(protect, newsphotoUpload);

module.exports = router;
