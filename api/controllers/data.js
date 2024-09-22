const data = require("../config/data");

const resError = (res, { status, message }) =>
  res.status(status || 500).send({ message });

exports.topLists = (req, res) => {
  data
    .topLists()
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.urlImgData = (req, res) => {
  data.urlImgData().then((datos) => res.send(datos));
};
