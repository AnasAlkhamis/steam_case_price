const caseModel = require("../models/caseSchema");
const axios = require("axios");
const { priceIo } = require("../index");

const categories = [
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
  "Falchion",
];

let connected;

priceIo.on("connection", (socket) => {
  connected = true;
  socket.on("disconnect", () => {});
});
let index = 0;
const getData = async (category) => {
  try {
    const response = await axios.get(
      `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${category}%20Case`
    );
    if (response.data.success) {
      ++index;
      if (index === categories.length) {
        index = 0;
      }
      response.data.category = category;
      response.data.createdAt = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Amman",
      });
      const newCase = new caseModel(response.data);

      const data = await newCase.save();
      console.log(data);

      if (connected) {
        priceIo.emit("data", data);
        console.log(data);
      }
    }
  } catch (error) {
    console.log(error);
    ++index;
    if (index === categories.length) {
      index = 0;
    }
  }
};

setInterval(() => {
  getData(categories[index]);
}, 30000);

/*
market_url = ("https://steamcommunity.com/market/search/render/?
    category_730_Type%5B%5D=tag_CSGO_Type_Case
    "&norender=1"
    "&count=100"
    "&sort_column=name"
    "&sort_dir=asc"
    "&currency={currency}"
    "&start={start}")
https://steamapis.com/docs/market#cards
    */
