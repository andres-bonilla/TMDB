const Seq = require("sequelize"),
      db = require("./db"),
      bcrypt = require("bcrypt")

class User extends Seq.Model{}

User.init( {
   email: { 
      type: Seq.STRING,
      allowNull: false,
      validate: {
         isEmail: true
      },
      unique: true
   },
   password: { 
      type: Seq.STRING,
      allowNull: false
   },
   salt: { type: Seq.STRING }
}, { sequelize: db, modelName: "users" } )


User.prototype.hash = ( pass, salt ) => {

   return bcrypt.hash( pass, salt )
}

User.beforeCreate( usuario => {

   return bcrypt.genSalt( 10 )
   .then( salt => { 
      usuario.salt = salt
      return usuario.hash( usuario.password, salt )
   } )
   .then( hash => usuario.password = hash )
} )

module.exports = User