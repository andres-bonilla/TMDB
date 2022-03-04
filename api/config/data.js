const axios = require( "axios" )
const { urlImgDataMaker } = require("./utils/utils")

exports.urlImgData = () => {

   return axios
   .get( urlImgDataMaker() )
   .then( ( { data } ) => data.images )
}