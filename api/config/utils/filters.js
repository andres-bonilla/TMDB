const axios = require("axios"),
  { urlSearchMaker } = require("./urlMaker");

exports.narrowData2 = (data, init, last, media) =>
  data
    .slice(init, last)
    .map(({ id, media_type, name, title, poster_path, profile_path }) => {
      /*Return only key data*/
      const mediaType = media === "any" ? media_type : media;
      name = mediaType === "movie" ? title : name;
      const img = mediaType === "person" ? profile_path : poster_path;

      return { id, mediaType, name, img };
    });

const narrowData = (
  { id, media_type, name, title, poster_path, profile_path },
  media
) => {
  /*Return only key data*/
  const mediaType = media === "multi" ? media_type : media;
  name = mediaType === "movie" ? title : name;
  const img = mediaType === "person" ? profile_path : poster_path;

  return { id, mediaType, name, img };
};

exports.amountFilter = (list, page, limit, index, media) => {
  const filtered = [];
  let initIndex = (Math.abs(page) - 1) * 20 + 1;
  let onRange;

  if (limit < 20) {
    list = page < 0 ? list.slice(20 - limit) : list.slice(0, limit);
    initIndex = page < 0 ? initIndex + 20 - limit : initIndex;
  }

  list.map((item, i) => {
    onRange =
      page < 0 ? initIndex + i < index.tmdb : initIndex + i > index.tmdb;
    if (onRange) {
      filtered.push({ index: initIndex + i, ...narrowData(item, media) });
    }
  });

  return filtered;
};

exports.removeTvShows = (list, page, limit, index, media) => {
  /*Remove Talk, News, Reality
  console.log("on-remove:", index);*/
  const filtered = [];
  const initIndex = (Math.abs(page) - 1) * 20 + 1;
  let isOnRange;

  //console.log("filter:", index);
  list.map((item, i, arr, reverseItem = arr[arr.length - 1 - i]) => {
    if (page < 0) {
      item = reverseItem;
      i = arr.length - 1 - i;
    }
    isOnRange =
      !index.tmdb ||
      (page < 0 ? index.tmdb > initIndex + i : index.tmdb < initIndex + i);
    /* console.log(
      "filter:",
      initIndex + i,
      "---",
      limit,
      "-",
      isOnRange,
      "-",
      !item["genre_ids"] ||
        (!item["genre_ids"].includes(10767) &&
          !item["genre_ids"].includes(10763) &&
          !item["genre_ids"].includes(10764))
    );*/
    if (
      limit &&
      isOnRange &&
      (!item["genre_ids"] ||
        (!item["genre_ids"].includes(10767) &&
          !item["genre_ids"].includes(10763) &&
          !item["genre_ids"].includes(10764)))
    ) {
      if (!index.local) {
        limit--;
        filtered.push({ index: initIndex + i, ...narrowData(item, media) });
      } else index.local--;
    }
  });

  return page < 0 ? filtered.reverse() : filtered;
};

exports.filterMovieOrTv = (list, page, limit, index, media) => {
  /*Remove Talk, News, Reality
  console.log("on-remove:", index);*/
  const filtered = [];
  const initIndex = (Math.abs(page) - 1) * 20 + 1;
  let isOnRange;

  //console.log("filter:", index);
  list.map((item, i, arr, reverseItem = arr[arr.length - 1 - i]) => {
    if (page < 0) {
      item = reverseItem;
      i = arr.length - 1 - i;
    }
    isOnRange =
      !index.tmdb ||
      (page < 0 ? index.tmdb > initIndex + i : index.tmdb < initIndex + i);
    /* console.log(
      "filter:",
      initIndex + i,
      "---",
      limit,
      "-",
      isOnRange,
      "-",
      !item["genre_ids"] ||
        (!item["genre_ids"].includes(10767) &&
          !item["genre_ids"].includes(10763) &&
          !item["genre_ids"].includes(10764))
    );*/
    if (
      limit &&
      isOnRange &&
      item["media_type"] !== "person" &&
      (!item["genre_ids"] ||
        (!item["genre_ids"].includes(10767) &&
          !item["genre_ids"].includes(10763) &&
          !item["genre_ids"].includes(10764)))
    ) {
      if (!index.local) {
        limit--;
        filtered.push({ index: initIndex + i, ...narrowData(item, media) });
      } else index.local--;
    }
  });

  return page < 0 ? filtered.reverse() : filtered;
};

exports.filterMovieOrTv3 = (list, page, limit, index, media) => {
  /*Remove Persons, Talk, News, Reality*/
  const filtered = [];
  const initIndex = (Math.abs(page) - 1) * 20 + 1;
  let isOnRange;

  list.map((item, i) => {
    isOnRange =
      page < 0 ? index.tmdb > initIndex + i : index.tmdb < initIndex + i;
    if (
      limit &&
      isOnRange &&
      item["media_type"] !== "person" &&
      (!item["genre_ids"] ||
        (!item["genre_ids"].includes(10767) &&
          !item["genre_ids"].includes(10763) &&
          !item["genre_ids"].includes(10764)))
    ) {
      filtered.push({ index: initIndex + i, ...narrowData(item, media) });
      limit--;
    }
  });

  return filtered;
};

exports.reqsByPage = (mediaType, words, page, num) => {
  let reqs = [];
  let lastPage = Math.ceil((page * num) / 20);
  let firstPage = Math.ceil(((page - 1) * num) / 20);
  firstPage = firstPage === 0 ? 1 : firstPage;

  for (let tmdbPage = firstPage; tmdbPage <= lastPage; tmdbPage++)
    reqs.push(axios.get(urlSearchMaker(mediaType, words, tmdbPage)));
  /*TMDB request for num number of elements*/

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
