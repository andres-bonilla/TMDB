const multi = require("../config/multi")


exports.search = ( req, res ) => {

   multi.search( req.query.words )
   .then( ( { err, data } ) => {
      err 
      ? res.status( data.status || 500 ).send( { message: data.message } )
      : res.send( data )
   } )
}

exports.getByTypeId = ( req, res ) => {
   const { type, id } = req.params

   multi.getByTypeId( type, id )
   .then( ( { err, data } ) => {
      err 
      ? res.status( data.status || 500 ).send( { message: data.message } )
               : res.send( data )
   } )
}