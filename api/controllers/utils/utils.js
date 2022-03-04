exports.movieTvFilter = lista => {

   return lista.filter( item => 
      item[ "media_type" ] === "movie" || item[ "media_type" ] === "tv" )
}