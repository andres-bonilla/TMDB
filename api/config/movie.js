const axios = require( "axios" ),
      { urlIdMaker } = require("./utils/utils")

exports.getById = ( id ) => {

   return axios
   .get( urlIdMaker( "movie", id ) )
   .then( res => res.data )
}