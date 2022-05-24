const express = require("express");
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");

const rooms = ["general", "tech", "finance", "crypto"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("dotenv").config();
const connectDB = require("./connectDB");
connectDB();

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http:/localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
