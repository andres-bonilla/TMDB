const User = require("../models/user");

exports.enroll = (userData) => {
  return User.findOne({ where: { email: userData.email } }).then((usuario) => {
    if (usuario)
      return { error: true, data: "El email ingresado ya esta en uso" };

    return User.create(userData)
      .then((usuario) => {
        return { error: false, data: usuario.email };
      })
      .catch(({ errors }) => {
        return { error: true, data: errors[0].message };
      });
  });
};

exports.access = ({ user, session }) => {
  if (user && user.email) {
    return User.findOne({ where: { email: user.email } })
      .then((usuario) => {
        return { error: false, data: usuario.email };
      })
      .catch(({ errors }) => {
        return { error: true, data: errors[0].message };
      });
  } else {
    return Promise.resolve({
      error: true,
      data: session.messages[0],
    });
  }
};

exports.leave = (req) => {
  req.logout((err) => {
    if (err) throw new Error(err);
  });
  return Promise.resolve({ error: false, data: "/" });
};
