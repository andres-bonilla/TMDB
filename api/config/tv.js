const axios = require( "axios" )

const apiKey = "api_key=c9b9995a47cd29251414aa37ee7df674",
      urlTmdb = "https://api.themoviedb.org/3",
      apiLang = "language=es"

exports.getById = ( id ) => {

   return axios
   .get( `${ urlTmdb }/tv/${ id }?${ apiKey }&${ apiLang }` )
   .then( res => res.data )
}