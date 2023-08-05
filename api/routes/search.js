const express = require("express"),
  search = require("../controllers/search");

const searchRouter = express.Router();

searchRouter.get("/any", search.anyByWords);
searchRouter.get("/movie_or_tv", search.movieOrTvByWords);
searchRouter.get("/movie", search.movieByWords);
searchRouter.get("/tv", search.tvByWords);
searchRouter.get("/person", search.personByWords);

module.exports = searchRouter;
