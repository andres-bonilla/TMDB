const search = require("../config/search"),
  { movieTvFilter } = require("./utils/utils");

const resError = (res, { status, message }) =>
  res.status(status || 500).send({ message });

exports.anyByWords = (req, res) => {
  search
    .anyByWords(req.query["by_words"])
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.movieOrTvByWords = (req, res) => {
  search
    .anyByWords(req.query["by_words"])
    .then(({ err, data }) =>
      err ? resError(res, data) : res.send(movieTvFilter(data))
    );
};

exports.movieByWords = (req, res) => {
  search
    .movieByWords(req.query["by_words"])
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.tvByWords = (req, res) => {
  search
    .tvByWords(req.query["by_words"])
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.personByWords = (req, res) => {
  search
    .personByWords(req.query["by_words"])
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};
