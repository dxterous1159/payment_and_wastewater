const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// const bodyParser = require("body-parser");

/*------------------------------------------------ */
// const fileUpload = require("express-fileupload");
/*------------------------------------------------ */

app.use(express.json());
app.use(cookieParser());

/*------------------------------------------------ */
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());
/*------------------------------------------------ */

// Route Import
const user = require("./routes/userRoute");

app.use("/api/v1", user);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
});

app.get("/", (req, res) => {
  res.send(lists);
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
