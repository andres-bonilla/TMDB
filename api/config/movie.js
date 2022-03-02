const axios = require( "axios" ),
      { urlIdMaker } = require("./tools")

exports.getById = ( id ) => {

   return axios
   .get( urlIdMaker( "movie", id ) )
   .then( res => res.data )
}