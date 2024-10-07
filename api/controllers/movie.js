const movie = require("../services/movie");

exports.getById = (req, res) => {
  movie.getById(req.params.id).then((data) => res.send(data));
};
