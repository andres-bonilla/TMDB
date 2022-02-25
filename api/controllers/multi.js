const multi = require( "../config/multi" )

exports.search = ( req, res ) => {

   multi.search( req.query.words )
   .then( ( { err, data } ) => {
      err 
         ? res.status( data.status || 500 ).send( { message: data.message } )
         : res.send( data )
   } )
}

exports.imgData = ( req, res ) => {

   multi.imgData()
   .then( data => res.send( data ) )
}

exports.getByTypeId = ( req, res ) => {
   
   multi.getByTypeId( req.params )
   .then( data => res.send( data ) )
}