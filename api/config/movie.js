const axios = require("axios"),
  { urlIdMaker } = require("./utils/utils");

const filterInfo = (data) => {
  let info = {};
  info.imgPath = data["poster_path"];
  info.name = data["title"];
  info.description = data["overview"].split(".");
  info.state = data["status"];
  info.lang = data["original_language"];
  info.genres = data["genres"];
  info.companies = data["production_companies"];
  info.stars = data["vote_average"];
  info.origin = data["production_countries"];
  info.lastOn = [];

  // startOn
  info.startOn = data["release_date"];
  info.startOn = info.startOn ? info.startOn.split("-") : [];

  // similar
  info.related = data["similar"] ? data["similar"]["results"] : [];
  info.related = info.related
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  return info;
};

exports.getById = (id) => {
  return axios.get(urlIdMaker("movie", id)).then((res) => filterInfo(res.data));
};
