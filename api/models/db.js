const Sequelize = require("sequelize");

const db = new Sequelize("moviebasedb", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
