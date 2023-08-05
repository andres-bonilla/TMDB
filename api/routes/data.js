const express = require("express"),
  data = require("../controllers/data");

const dataRouter = express.Router();

dataRouter.get("/img_data", data.urlImgData);

module.exports = dataRouter;
