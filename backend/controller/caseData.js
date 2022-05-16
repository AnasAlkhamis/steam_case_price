const caseModel = require("../model/caseSchema");
const axios = require("axios");
const getData = async (req, res, next) => {
  const { caseName } = req.body;
  const responce = await axios.get(
    `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${caseName}%20Case`
  );
  responce.data.category = caseName;
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

module.exports = { postAllPrice, getAllPrice, getData };
