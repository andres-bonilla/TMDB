const express = require( "express" ),
      user = require( "../controllers/user" ),
      passport = require("passport")

const userRouter = express.Router()

userRouter.post(
   "/access",
   passport.authenticate( "local", { successRedirect: 'access', failureRedirect: "access", failureMessage: true } ))
userRouter.post( "/enroll", user.enroll )

userRouter.get("/access", user.access)

module.exports = userRouter