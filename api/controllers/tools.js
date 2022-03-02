const tools = require( "../config/tools" )

exports.movieTvFilter = data => {

   return data.filter( item => 
      item[ "media_type" ] === "movie" || item[ "media_type" ] === "tv" )
}

exports.urlImgData = ( req, res ) => {

   tools.urlImgData()
   .then( data => res.send( data ) )
}