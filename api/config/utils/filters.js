const axios = require("axios"),
  { urlSearchMaker } = require("./urlMaker");

exports.reqsByPage = (mediaType, words, page, num) => {
  let reqs = [];
  let lastPage = Math.ceil((page * num) / 20);
  let firstPage = Math.ceil(((page - 1) * num) / 20);
  firstPage = firstPage === 0 ? 1 : firstPage;

  for (let tmdbPage = firstPage; tmdbPage <= lastPage; tmdbPage++)
    reqs.push(axios.get(urlSearchMaker(mediaType, words, tmdbPage)));
  /*TMDB request for 36 elements*/

  return reqs;
};

exports.filterRes = (allRes, media, init, last) =>
  []
    .concat(allRes.map(({ data }) => data.results).flat(1)) /*Data Union*/
    .slice(init, last) /*Fixing to 36 elements*/
    .map(({ id, media_type, name, title, poster_path, profile_path }) => {
      /*Return only key data*/
      let mediaType = media === "any" ? media_type : media;
      return {
        id,
        mediaType,
        name: mediaType === "movie" ? title : name,
        img: mediaType === "person" ? profile_path : poster_path,
      };
    });

exports.filterList = (list, media) =>
  list.map(
    ({
      id,
      media_type,
      name,
      original_name,
      title,
      original_title,
      poster_path,
      profile_path,
      backdrop_path,
    }) => {
      /*Return only key data*/
      let mediaType =
        media === "any" && media_type !== undefined ? media_type : media;
      return {
        id,
        mediaType,
        backdrop: backdrop_path,
        name: mediaType === "movie" && title !== undefined ? title : name,
        img:
          mediaType === "person" && profile_path !== undefined
            ? profile_path
            : poster_path,
      };
    }
  );
