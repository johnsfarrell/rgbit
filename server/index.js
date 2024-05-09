const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/UserRoutes");
const imageRoutes = require("./routes/ImageRoutes");
const baseRoutes = require("./routes/BaseRoutes");
const logger = require("./middlewares/logger");

const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const tf = require("@tensorflow/tfjs-node");

mongoose.connect(process.env.DATABASE_ACCESS).then((data) => {
  console.log(
    data.connection.readyState ? "MongoDB Connected" : "MongoDB Not Connected"
  );
});

app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(express.static("static"));

app.use(logger);

app.use(cookieParser());
app.use(express.json());

app.use("/api/image/", imageRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/", baseRoutes);

app.listen(process.env.PORT, function () {
  console.log(`Listening on Port ${process.env.PORT}`);
});
