const express = require("express"),
  movie = require("../controllers/movie");

const movieRouter = express.Router();

movieRouter.get("/:id", movie.getById);

module.exports = movieRouter;
