const apiKey = "api_key=22d3fd94d0f9fd60515cd799770db756",
  urlTmdb = "https://api.themoviedb.org/3",
  apiLang = "language=es-MX";

exports.urlSearchMaker = (mediaType, words, page = "1") =>
  `${urlTmdb}/search/${mediaType}?query=${words}&${apiKey}&${apiLang}&page=${page}`;

exports.urlIdMaker = (mediaType, id) => {
  if (mediaType === "person") {
    return `${urlTmdb}/${mediaType}/${id}?append_to_response=combined_credits&${apiKey}&${apiLang}`;
  } else {
    return `${urlTmdb}/${mediaType}/${id}?append_to_response=similar&${apiKey}&${apiLang}`;
  }
};

exports.urlImgDataMaker = () => `${urlTmdb}/configuration?${apiKey}`;
