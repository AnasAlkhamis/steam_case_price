const caseModel = require("../models/caseSchema");
const axios = require("axios");
const server = require("../index");
const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "*",
  },
});
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
    const response = await axios.get(
      `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${category}%20Case`
    );
    if (response.data.success) {
      ++index;
      if (index === categories.length) {
        index = 0;
      }
      response.data.category = category;

      const newCase = new caseModel(response.data);
      const data = await newCase.save();
      if (true) {
        io.emit("data", data);
        console.log(data);
      }
    }
  } catch (error) {
    ++index;
    if (index === categories.length) {
      index = 0;
    }
  }
};

setInterval(() => {
  getData(categories[index]);
}, 6000);
