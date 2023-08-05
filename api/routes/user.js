const express = require("express"),
  user = require("../controllers/user"),
  passport = require("passport");

const userRouter = express.Router();

userRouter.post(
  "/access",
  passport.authenticate("local", {
    successRedirect: "access",
    failureRedirect: "access",
    failureMessage: true,
  })
);
userRouter.post("/enroll", user.enroll);

userRouter.get("/access", user.access);

/*userRouter.get('/leave', user.leave);*/

/*Este middleware es para verificar si la sesion esta activa
function auth(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  } else {
      return res.redirect('/login');
  }
}

//Aqui vemos que usamos auth middleware
app.get('/dashboard', auth, (req, res) => {
  res.render('dashboard');
});*/

module.exports = userRouter;
