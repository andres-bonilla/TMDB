const tv = require("../services/tv");

exports.getById = (req, res) => {
  tv.getById(req.params.id).then((data) => res.send(data));
};
