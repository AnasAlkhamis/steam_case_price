const express = require("express");
const caseRouter = express.Router();
const authentication = require("../middleware/authentication");

const {
  getAllPrice,
  removeData,
  removeDataById,
} = require("../controller/caseData");
caseRouter.get("/all", authentication, getAllPrice);
caseRouter.delete("/", authentication, removeData);
caseRouter.delete("/:category", authentication, removeDataById);

module.exports = caseRouter;
