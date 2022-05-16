const categoryModel = require("../model/categorySchema");
const caseModel = require("../model/caseSchema");

const createCategory = (req, res) => {
  const { caseName } = req.body;
  console.log(caseName);
  const newCategory = new categoryModel({ caseName });
  newCategory
    .save()
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      return res.json(err);
    });
};
const getCasesByCategoryId = (req, res) => {
  const category = req.query.caseName;
  console.log(category);
  caseModel
    .find({ category })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: `All cases with category name ${category}`,
        cases: result,
      });
    })
    .catch((err) => {
      return res.json(err);
    });
};

module.exports = { createCategory, getCasesByCategoryId };
/*   "Snakebite",
    "Fracture",
    "Prisma",
    "CS20",
    "Prisma 2",
    "Horizon",
    "Clutch",
    "Spectrum",
    "Spectrum 2",
    "Glove",
    "Gamma",
    "Gamma 2",
    "Chroma",
    "Chroma 2",
    "Chroma 3",
    "Revolver",
    "Shadow",
    "Falchion",*/
