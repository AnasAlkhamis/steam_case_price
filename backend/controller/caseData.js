const caseModel = require("../model/caseSchema");
const axios = require("axios");
const getData = async (req, res, next) => {
  const { category } = req.body;
  const responce = await axios.get(
    `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${category}%20Case`
  );
  responce.data.category = category;
  req.body.data = responce.data;
  next();
};

const postAllPrice = (req, res) => {
  const newCase = new caseModel(req.body.data);
  newCase
    .save()
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      return res.json(err);
    });
};
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
const getCasesByCategoryId = (req, res) => {
  const category = req.query.category;
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
module.exports = {
  postAllPrice,
  getAllPrice,
  getData,
  getCasesByCategoryId,
  removeData,
};
