const user = require( "../config/user" )

exports.enroll = ( req, res ) => {
   
   user.enroll( req.body )
   .then( data => 
      res.status( 201 ).send( data ) )
}

exports.access = ( req, res ) => {
   
   user.access( req.user )
   .then( data => res.status( 201 ).send( data ) )
}