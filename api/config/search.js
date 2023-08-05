const axios = require("axios"),
  { urlSearchMaker } = require("./utils/utils");

exports.anyByWords = (words, page) => {
  return axios
    .get(urlSearchMaker("multi", words, page))
    .then((res) => res.data)
    .then((data) => {
      return { error: false, data: data.results };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.movieByWords = (words, page) => {
  return axios
    .get(urlSearchMaker("movie", words, page))
    .then((res) => res.data)
    .then((data) => {
      return { error: false, data: data.results };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.tvByWords = (words, page) => {
  return axios
    .get(urlSearchMaker("tv", words, page))
    .then((res) => res.data)
    .then((data) => {
      return { error: false, data: data.results };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.personByWords = (words, page) => {
  return axios
    .get(urlSearchMaker("person", words, page))
    .then((res) => res.data)
    .then((data) => {
      return { error: false, data: data.results };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};
