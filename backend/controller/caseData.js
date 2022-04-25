const axios = require("axios");
const caseModel = require("../model/caseSchema");
const cases = [
  //   "Snakebite",
  //   "Fracture",
  "Prisma",
  //   "CS20",
  //   "Prisma 2",
  //   "Danger",
  //   "Horizon",
  "Clutch",
  //   "Spectrum",
  //   "Spectrum 2",
  "Glove",
  "Gamma",
  //   "Gamma 2",
  //   "Chroma",
  //   "Chroma",
  //   "Chroma 2",
  //   "Chroma 3",
  //   "Revolver",
  //   "Shadow",
  //   "Falchion",
];

const getAllPrice = (req, res) => {
  const result = [];
  const repeat = async (index) => {
    const responce = await axios.get(
      `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${cases[index]}%20Case`
    );
    responce.data.case = cases[index];
    const newCase = new caseModel(responce.data);
    result.push(newCase);
    newCase
      .save()
      .then((Done) => {
        if (index == cases.length - 1) {
          res.status(200).json(result);
        } else {
          setTimeout(() => {
            repeat(index + 1);
          }, 300);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  };
  repeat(0);
};
module.exports = { getAllPrice };
