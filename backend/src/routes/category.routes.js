const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
} = require("../controllers/category.controller");

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);

module.exports = router;
