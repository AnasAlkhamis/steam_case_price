const axios = require("axios");
const caseModel = require("../model/caseSchema");
const cases = [
  "Falchion",
  "Snakebite",
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
];

const postAllPrice = (req, res) => {
  const result = [];
  const repeat = async (index) => {
    const responce = await axios.get(
      `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${cases[index]}%20Case`
    );
    if (!responce.error) {
      responce.data.case = cases[index];
      const newCase = new caseModel(responce.data);
      result.push(newCase);
      newCase
        .save()
        .then((Done) => {
          if (index !== cases.length - 1) {
            setTimeout(() => {
              repeat(index + 1);
            }, 10000);
          } else {
            return res.status(200).json(result);
          }
        })
        .catch((err) => {
          return res.json(err);
        });
    } else {
      repeat(index + 1);
    }
  };
  repeat(0);
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

module.exports = { postAllPrice, getAllPrice };
