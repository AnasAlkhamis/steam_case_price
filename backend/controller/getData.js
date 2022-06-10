const caseModel = require("../models/caseSchema");
const axios = require("axios");
const io = require("../socket_server");

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

io.on("connection", (socket) => {
  connected = true;
  socket.on("disconnect", () => {
    connected = false;
  });
});
let index = 0;
const getData = async (category) => {
  try {
    const responce = await axios.get(
      `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${category}%20Case`
    );
    if (responce.data.success) {
      index++;
      if (index === categories.length) {
        index = 0;
      }
      responce.data.category = category;

      const newCase = new caseModel(responce.data);
      const data = await newCase.save();
      if (connected) {
        io.emit("data", data);
      }
    }
  } catch (error) {
    index++;
    if (index === categories.length) {
      index = 0;
    }
  }
};

setInterval(() => {
  getData(categories[index]);
}, 60000);
