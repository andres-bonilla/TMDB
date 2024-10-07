const axios = require("axios");
const { filterByRules } = require("./helpers/filters");
const { urlSearchMaker } = require("./helpers/urlMakers");

const recursiveReq = (query, page, rules, result = [], isLast = page > 500) =>
  new Promise((resolve, reject) => {
    let w = query[1],
      t = query[0][0] + query[0][1],
      p = page,
      amount = rules.amount,
      index = rules.index;
    console.log(t, ":", w, "-", p, "|", amount, "/", result.length, "|", index);
    if (!isLast && rules.amount > 0) {
      return axios
        .get(urlSearchMaker(...query, Math.abs(page)))
        .then((res) => ({
          ...filterByRules(res.data.results, rules),
          isLast: page === -1 || page + 1 > res.data["total_pages"],
        }))
        .then(({ data, newRules, isLast }) => {
          data = page < 0 ? [...data, ...result] : [...result, ...data];

          return resolve(recursiveReq(query, page + 1, newRules, data, isLast));
        })
        .catch((err) => reject(err));
    }
    return resolve(result);
  });

exports.anyByWords = (words, stPage, rules) => {
  return recursiveReq(["multi", words], stPage, rules)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.movieOrTvByWords = (words, stPage, rules) => {
  return recursiveReq(["multi", words], stPage, rules)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.movieByWords = (words, stPage, rules) => {
  return recursiveReq(["movie", words], stPage, rules)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.tvByWords = (words, stPage, rules) => {
  return recursiveReq(["tv", words], stPage, rules)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.personByWords = (words, stPage, rules) => {
  return recursiveReq(["person", words], stPage, rules)
    .then((data) => {
      return { error: false, data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};
