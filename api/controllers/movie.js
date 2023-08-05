const movie = require("../config/movie");

exports.getById = (req, res) => {
  movie.getById(req.params.id).then((data) => res.send(data));
};
