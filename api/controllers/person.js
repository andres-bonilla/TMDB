const person = require("../services/person");

exports.getById = (req, res) => {
  person.getById(req.params.id).then((data) => res.send(data));
};
