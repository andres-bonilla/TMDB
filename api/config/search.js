const { reqsByPage, filterRes } = require("./utils/filters");

exports.anyByWords = (words, page) => {
  /*index of first element*/
  const num = 36;
  const initIndex = ((page - 1) * num) % 20;
  const reqs = reqsByPage("multi", words, page, num);

  return Promise.all(reqs)
    .then((allRes) => filterRes(allRes, "any", initIndex, initIndex + num))
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.movieByWords = (words, page) => {
  /*index of first element*/
  const num = 36;
  const initIndex = ((page - 1) * num) % 20;
  const reqs = reqsByPage("movie", words, page, num);

  return Promise.all(reqs)
    .then((allRes) => filterRes(allRes, "movie", initIndex, initIndex + num))
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.tvByWords = (words, page) => {
  /*index of first element*/
  const num = 36;
  const initIndex = ((page - 1) * num) % 20;
  const reqs = reqsByPage("tv", words, page, num);

  return Promise.all(reqs)
    .then((allRes) => filterRes(allRes, "tv", initIndex, initIndex + num))
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};

exports.personByWords = (words, page) => {
  /*index of first element*/
  const num = 36;
  const initIndex = ((page - 1) * num) % 20;
  const reqs = reqsByPage("person", words, page, num);

  return Promise.all(reqs)
    .then((allRes) => filterRes(allRes, "person", initIndex, initIndex + num))
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};
