const apiKey = "api_key=c9b9995a47cd29251414aa37ee7df674",
      urlTmdb = "https://api.themoviedb.org/3",
      apiLang = "language=es"

exports.urlSearchMaker = ( mediaType, words ) => 
   `${ urlTmdb }/search/${ mediaType }?query=${ words }&${ apiKey }&${ apiLang }`

exports.urlIdMaker = ( mediaType, id ) => 
   `${ urlTmdb }/${ mediaType }/${ id }?${ apiKey }&${ apiLang }`

exports.urlImgDataMaker = () => 
   `${ urlTmdb }/configuration?${ apiKey }`