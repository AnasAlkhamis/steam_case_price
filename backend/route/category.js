const express = require("express");
const categoryRouter = express.Router();

const {
  createCategory,
  getCasesByCategoryId,
} = require("../controller/category");
categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCasesByCategoryId);

module.exports = categoryRouter;
