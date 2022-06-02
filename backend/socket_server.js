require("dotenv").config();


const io = require("socket.io")(process.env.SOCKET_PORT, {
  cors: {
    origin: process.env.ORIGIN,
  },
});
module.exports = io;
