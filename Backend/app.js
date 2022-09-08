const express = require("express");
const mariadb = require("mariadb");

const createConnection = () => {
  mariadb
    .createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    })
    .then((conn) => console.log("MariadbConnected"))
    .catch((err) => {
      setTimeout(createConnection, 30000);
    });
};

createConnection();

const app = express();

module.exports = app;
