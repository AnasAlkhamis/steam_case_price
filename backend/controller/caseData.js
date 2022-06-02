const caseModel = require("../models/caseSchema");

const getAllPrice = (req, res) => {
  caseModel
    .find()
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "All cases",
        cases: result,
      });
    })
    .catch((err) => {
      return res.json(err);
    });
};

const removeData = (req, res) => {
  caseModel
    .deleteMany({})
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: `All cases deleted sccessfuly `,
      });
    })
    .catch((err) => {
      return res.json(err);
    });
};
const removeDataById = (req, res) => {
  const { category } = req.params;
  caseModel
    .deleteMany({ category: category })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: `All cases with di ${id} deleted sccessfuly `,
      });
    })
    .catch((err) => {
      return res.json(err);
    });
};
module.exports = {
  getAllPrice,
  removeData,
  removeDataById,
};
