const apiKey = "api_key=22d3fd94d0f9fd60515cd799770db756",
  urlTmdb = "https://api.themoviedb.org/3",
  apiLang = "language=es";

exports.urlSearchMaker = (mediaType, words) =>
  `${urlTmdb}/search/${mediaType}?query=${words}&${apiKey}&${apiLang}`;

exports.urlIdMaker = (mediaType, id) =>
  `${urlTmdb}/${mediaType}/${id}?${apiKey}&${apiLang}`;

exports.urlImgDataMaker = () => `${urlTmdb}/configuration?${apiKey}`;
