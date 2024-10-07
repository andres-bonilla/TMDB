const data = require("../services/data");

const resError = (res, { status, message }) =>
  res.status(status || 500).send({ message });

exports.topLists = (req, res) => {
  data
    .topLists()
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.imgData = (req, res) => {
  data
    .imgData()
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};
