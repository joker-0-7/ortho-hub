var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var questionsRouter = require("./routes/question");
const { connectDB } = require("./utils/db");
const compression = require("compression");
const ErrorMiddleware = require("./middlewares/error");
// const { csrfProtection } = require("./middlewares/csrf");
var app = express();
app.use(compression());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/questions", questionsRouter);
app.use(
  "/api/v1/public/images",
  express.static(path.join(__dirname, "/uploads/questions"))
);
// app.get("/api/v1/csrf-token", csrfProtection, (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
  });
}
app.use(ErrorMiddleware);

module.exports = app;
