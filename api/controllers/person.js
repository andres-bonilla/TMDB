const person = require("../config/person");

exports.getById = (req, res) => {
  person.getById(req.params.id).then((data) => res.send(data));
};
