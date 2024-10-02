const axios = require("axios");
const {
  reqsByPage,
  filterRes,
  amountFilter,
  removeTvShows,
  filterMovieOrTv,
} = require("./utils/filters");
const { urlSearchMaker } = require("./utils/urlMaker");

const recursiveReq = (
  query,
  tmdbPage,
  index,
  amount,
  filter = amountFilter,
  result = [],
  isLastPage = false
) =>
  new Promise((resolve, reject) => {
    console.log(
      "rq:",
      query[1],
      tmdbPage,
      "length:",
      amount,
      "/",
      result.length,
      "index:",
      index.tmdb,
      index.local
    );
    if (tmdbPage > 500) isLastPage = true;

    if (!isLastPage && amount > 0) {
      return axios
        .get(urlSearchMaker(...query, Math.abs(tmdbPage)))

        .then((res) => {
          const nextPage = Math.abs(tmdbPage + 1);
          const isLast = !(
            1 <= nextPage && nextPage <= res.data["total_pages"]
          );
          console.log(res.data);

          return {
            data: filter(res.data.results, tmdbPage, amount, index, query[0]),
            isLast,
          };
        })

        .then(({ data, isLast }) => {
          const remaining = amount - data.length;
          data = tmdbPage < 0 ? [...data, ...result] : [...result, ...data];
          return resolve(
            recursiveReq(
              query,
              tmdbPage + 1,
              index,
              remaining,
              filter,
              data,
              isLast
            )
          );
        })

        .catch((err) => reject(err));
    }
    return resolve(result);
  });

exports.anyByWords = (words, firstPage, index, amount) => {
  return recursiveReq(["multi", words], firstPage, index, amount, removeTvShows)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.movieOrTvByWords = (words, firstPage, index, amount) => {
  return recursiveReq(
    ["multi", words],
    firstPage,
    index,
    amount,
    filterMovieOrTv
  )
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.movieByWords = (words, firstPage, index, amount) => {
  return recursiveReq(["movie", words], firstPage, index, amount)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.tvByWords = (words, firstPage, index, amount) => {
  return recursiveReq(["tv", words], firstPage, index, amount, removeTvShows)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.personByWords = (words, firstPage, index, amount) => {
  return recursiveReq(["person", words], firstPage, index, amount)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.anyByWords2 = (words, page, dim) => {
  /*const promise1 = Promise.resolve(anyByWords2(words, page, dim));
  promise1.then((value) => console.log(value.data.length));
  index of first element*/
  const initIndex = ((page - 1) * dim) % 20;
  const reqs = reqsByPage("multi", words, page, dim);

  return Promise.all(reqs)
    .then((allRes) => filterRes(allRes, "any", initIndex, initIndex + dim))
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.movieByWords2 = (words, page, dim) => {
  /*index of first element*/
  const initIndex = ((page - 1) * dim) % 20;
  const reqs = reqsByPage("movie", words, page, dim);

  return Promise.all(reqs)
    .then((allRes) => filterRes(allRes, "movie", initIndex, initIndex + dim))
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.tvByWords2 = (words, page, dim) => {
  /*index of first element*/
  const initIndex = ((page - 1) * dim) % 20;
  const reqs = reqsByPage("tv", words, page, dim);

  return Promise.all(reqs)
    .then((allRes) => filterRes(allRes, "tv", initIndex, initIndex + dim))
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.personByWords2 = (words, page, dim) => {
  /*index of first element*/
  const initIndex = ((page - 1) * dim) % 20;
  const reqs = reqsByPage("person", words, page, dim);

  return Promise.all(reqs)
    .then((allRes) => filterRes(allRes, "person", initIndex, initIndex + dim))
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};
