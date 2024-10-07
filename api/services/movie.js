const axios = require("axios"),
  { urlIdMaker } = require("./helpers/urlMakers");
const { filterList } = require("./helpers/filters");

const filterInfo = (data) => {
  let info = {};
  info.id = data["id"];
  info.name = data["title"];
  info.img = data["poster_path"];
  info.backdrop = data["backdrop_path"];
  info.description = data["overview"].split(". ");
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
  info.related = filterList(info.related, "movie");
  console.log(data.videos.results);
  return info;
};

exports.getById = (id) => {
  return axios.get(urlIdMaker("movie", id)).then((res) => filterInfo(res.data));
};
