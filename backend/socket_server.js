require("dotenv").config();

const io = require("socket.io")(process.env.SOCKET_PORT||9800, {
  cors: {
    origin: "*",
  },
});
module.exports = io;
