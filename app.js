var path = require("path");
var express = require("express");
var path = require("path");

// Get routes
var indexRoute = require("./routes/index");

// Create express app
var app = express();

// Set ejs view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoute);

// Catch a 404 status code

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
