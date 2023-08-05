const express = require("express"),
  tv = require("../controllers/tv");

const tvRouter = express.Router();

tvRouter.get("/:id", tv.getById);

module.exports = tvRouter;
