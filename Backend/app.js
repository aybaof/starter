const express = require("express");
const path = require("path")

const { initBdd, pingbdd } = require("./config_bdd")
const appRoute = require("./router/default.js")
const cookieparser = require("cookie-parser");

const jwtMiddleware = require("./middleware/jwt")


initBdd()

const app = express();

var dir = path.join(__dirname, 'public/images');
app.use("/api/images", express.static(dir));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.URL);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization , Refresh-Token"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Expose-Headers", "Refresh-Token");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.options("/*", (req, res) => res.sendStatus(200));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.use("/api/auth/", appRoute.auth)
app.use("/api/userPost/", jwtMiddleware, appRoute.userPost)



module.exports = app;
