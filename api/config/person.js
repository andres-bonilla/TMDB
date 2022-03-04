const axios = require( "axios" ),
      { urlIdMaker } = require("./utils/utils")

exports.getById = id => {

   return axios
   .get( urlIdMaker( "person", id ) )
   .then( res => res.data )
}