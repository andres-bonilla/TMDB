const axios = require("axios"),
  { urlIdMaker } = require("./utils/utils");

const filterInfo = (data) => {
  let info = {};
  info.imgPath = data["poster_path"];
  info.name = data["name"];
  info.description = data["overview"].split(".");
  info.state = data["in_production"];
  info.lang = data["original_language"];
  info.genres = data["genres"];
  info.companies = data["production_companies"];
  info.stars = data["vote_average"];
  info.numOfEpisodes = data["number_of_episodes"];
  info.numOfSeasons = data["number_of_seasons"];
  info.origin = data["production_countries"];

  // lastOn
  info.lastOn = data["last_air_date"];
  info.lastOn = info.lastOn ? info.lastOn.split("-") : [];

  // startOn
  info.startOn = data["first_air_date"];
  info.startOn = info.startOn ? info.startOn.split("-") : [];

  // similar
  info.related = data["similar"] ? data["similar"]["results"] : [];
  info.related = info.related
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  return info;
};

exports.getById = (id) => {
  return axios.get(urlIdMaker("tv", id)).then((res) => filterInfo(res.data));
};
