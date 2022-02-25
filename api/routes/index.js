const express = require("express");
const multi = require("./multi")

const routes = express.Router();

routes.use("/multi", multi);

module.exports = routes