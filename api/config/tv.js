const axios = require("axios"),
  { urlIdMaker } = require("./utils/urlMaker"),
  { filterList } = require("./utils/filters");

const filterInfo = (data) => {
  let info = {};
  info.id = data["id"];
  info.name = data["name"];
  info.backdrop = data["backdrop_path"];
  info.img = data["poster_path"];
  info.description = data["overview"].split(". ");
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

  // related
  info.related = data["similar"] ? data["similar"]["results"] : [];
  info.related = info.related
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);
  info.related = filterList(info.related, "tv");
  /////////////////////////////////////////////////////////////////
  console.log(info);
  return info;
};

exports.getById = (id) => {
  return axios.get(urlIdMaker("tv", id)).then((res) => filterInfo(res.data));
};
