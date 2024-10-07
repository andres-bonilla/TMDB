const axios = require("axios"),
  { urlIdMaker } = require("./helpers/urlMakers");
const { filterList } = require("./helpers/filters");

const filterInfo = (data) => {
  let info = {};
  info.img = data["profile_path"];
  info.name = data["name"];
  info.description = data["biography"].split(". ");

  info.stars = data["popularity"];
  info.origin = data["place_of_birth"];
  // startOn

  info.startOn = data["birthday"];
  info.startOn = info.startOn ? info.startOn.split("-") : [];
  // lastOn

  info.lastOn = data["deathday"];
  info.lastOn = info.lastOn ? info.lastOn.split("-") : [];
  // similar

  info.related = data["combined_credits"]
    ? data["combined_credits"]["cast"].length >
      data["combined_credits"]["crew"].length
      ? data["combined_credits"]["cast"]
      : data["combined_credits"]["crew"]
    : [];
  info.related = info.related
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);
  info.related = filterList(info.related, "any");

  return info;
};

exports.getById = (id) => {
  return axios
    .get(urlIdMaker("person", id))
    .then((res) => filterInfo(res.data));
};
