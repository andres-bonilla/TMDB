const tv = require("../config/tv");

exports.getById = (req, res) => {
  tv.getById(req.params.id).then((data) => res.send(data));
};
