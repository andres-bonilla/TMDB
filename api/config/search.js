const axios = require("axios"),
  { urlSearchMaker } = require("./utils/utils");

exports.anyByWords = (words) => {
  return axios
    .get(urlSearchMaker("multi", words))
    .then((res) => res.data)
    .then((data) => {
      return { error: false, data: data.results };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.movieByWords = (words) => {
  return axios
    .get(urlSearchMaker("movie", words))
    .then((res) => res.data)
    .then((data) => {
      return { error: false, data: data.results };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.tvByWords = (words) => {
  return axios
    .get(urlSearchMaker("tv", words))
    .then((res) => res.data)
    .then((data) => {
      return { error: false, data: data.results };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.personByWords = (words) => {
  return axios
    .get(urlSearchMaker("person", words))
    .then((res) => res.data)
    .then((data) => {
      return { error: false, data: data.results };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};
