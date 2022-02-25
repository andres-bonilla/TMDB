const axios = require( "axios" )

const apiKey = "api_key=c9b9995a47cd29251414aa37ee7df674",
      urlTmdb = "https://api.themoviedb.org/3",
      apiLang = "language=es"

exports.search = searchWords => {

   return axios
   .get( `${ urlTmdb }/search/multi?query=${ searchWords }&${ apiKey }&${ apiLang }` )
   .then( res => res.data )
   .then( data => {
      return { error: false, data: data.results } 
   } )
   .catch( err => {
      console.log( err )
      return { error: true, data: err }
   } )
}

exports.imgData = () => {

   return axios
   .get( `${ urlTmdb }/configuration?${ apiKey }` )
   .then( res => res.data )
   .then( data => data.images )
} 

exports.getByTypeId = ( { type, id } ) => {

   return axios
   .get( `${ urlTmdb }/${ type }/${ id }?${ apiKey }&${ apiLang }` )
   .then( res => res.data )
}