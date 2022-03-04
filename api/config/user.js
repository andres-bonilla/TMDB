const User = require("../models/user")

exports.enroll = userData => {
   
   return User.create( userData )
   .then( usuario => {
      return { error: false, data: usuario.email }
   } )
   .catch( ( { errors } ) => {
      return { error: true, data: errors[ 0 ].message } 
   } )
}

exports.access = userData => {
   
   if (userData.email){
   return User.findOne( { where: { email: userData.email } } )
   .then( usuario => {
      console.log("O aqui")
      return { error: false, data: usuario.email }
   } )
   .catch( ( { errors } ) => {
      return { error: true, data: errors[ 0 ].message } 
   } )
}  else {  return () => "No hay email" }
}