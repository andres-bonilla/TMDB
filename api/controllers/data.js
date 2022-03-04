const data = require( "../config/data" )

exports.urlImgData = ( req, res ) => {

   data.urlImgData()
   .then( datos => res.send( datos ) )
}