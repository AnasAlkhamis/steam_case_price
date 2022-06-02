const express = require("express");
const caseRouter = express.Router();

const {
  getAllPrice,

  removeData,
  removeDataById,
} = require("../controller/caseData");
caseRouter.get("/all", getAllPrice);
caseRouter.delete("/", removeData);
caseRouter.delete("/:category", removeDataById);

module.exports = caseRouter;
