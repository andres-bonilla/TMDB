const axios = require( "axios" ),
      { urlIdMaker } = require("./utils/utils")

exports.getById = ( id ) => {

   return axios
   .get( urlIdMaker( "tv", id ) )
   .then( res => res.data )
}