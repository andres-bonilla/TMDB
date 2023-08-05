const User = require("../models/user");

exports.enroll = (userData) => {
  return User.create(userData)
    .then((usuario) => {
      return { error: false, data: usuario.email };
    })
    .catch(({ errors }) => {
      return { error: true, data: errors[0].message };
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

/*exports.leave = (req) => {
  req.logout();
  return '/access';
};*/
