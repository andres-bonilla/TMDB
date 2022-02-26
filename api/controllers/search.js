const search = require( "../config/search" )

exports.anyByWords = ( req, res ) => {

   search.anyByWords( req.query["by_words"] )
   .then( ( { err, data } ) => {
      err 
         ? res.status( data.status || 500 ).send( { message: data.message } )
         : res.send( data )
   } )
}

exports.imgData = ( req, res ) => {

   search.imgData()
   .then( data => res.send( data ) )
}