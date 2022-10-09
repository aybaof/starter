const express = require("express");

const { initBdd, pingbdd } = require("./config_bdd")
const { auth } = require("./router/default.js")
const cookieparser = require("cookie-parser");


initBdd()

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization , Refresh-Token"
  );
  res.setHeader("Access-Control-Expose-Headers" , "Refresh-Token");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.use("/api/", auth)


module.exports = app;
