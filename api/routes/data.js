const express = require("express"),
  data = require("../controllers/data");

const dataRouter = express.Router();

dataRouter.get("/img_data", data.imgData);

dataRouter.get("/top_lists", data.topLists);

module.exports = dataRouter;
