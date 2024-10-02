const search = require("../config/search");

const resError = (res, { status, message }) =>
  res.status(status || 500).send({ message });

const initParams = (values) => {
  const words = values["by_words"];
  const page = Number(values["on_page"]);
  const limit = Number(values["limit"]);
  const tmdbIndex = Number(values["tmdb_index"]);

  console.log("\n", "primitive", words, page, limit, tmdbIndex);

  const fitter = page < 0 ? -1 : 1;
  const firstPage = fitter * Math.ceil((tmdbIndex + fitter) / 20) || 1;
  const localIndex = page < 0 ? page * -1 * limit + 1 : (page - 1) * limit;
  const index = {
    tmdb: tmdbIndex,
    local: tmdbIndex ? 0 : localIndex,
  };

  console.log(
    "params",
    words,
    "$",
    firstPage,
    "$",
    index.tmdb,
    "$",
    index.local,
    "$",
    limit,
    "\n"
  );
  /*

if (!last && !init) {
  if (page > 0) {
    firstPage = Math.ceil(((page - 1) * limit + 1) / 20);
  } else {
    firstPage = Math.ceil((-page * limit) / 20);
  }
} else if (last) {
  if (page > 0) {
    firstPage = Math.ceil((last + 1) / 20);
  }
} else if (init) {
  if (page < 0) {
    firstPage = Math.ceil((init - 1) / 20);
  }
}
  
  firstPage = (page - 1) * limit
  if (init === 0 && last !== 0) {
    firstPage = Math.ceil(last / 20)
  }

  if (init !== 0 && last === 0) {

  }

  if ((last === 0) & (page > 1)) last = (page - 1) * limit;

  let firstPage = Math.ceil(((page - 1) * limit) / 20);
  firstPage = firstPage === 0 ? 1 : firstPage;

  if (last !== 0) firstPage = Math.floor(last / 20);
  console.log(words, "$$", firstPage, "$$", init, "$$", last, "$$", limit);*/
  return { words, firstPage, index, limit };
};

exports.anyByWords = (req, res) => {
  const { words, firstPage, index, limit } = initParams(req.query);

  search
    .anyByWords(words, firstPage, index, limit)
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.movieOrTvByWords = (req, res) => {
  const { words, firstPage, index, limit } = initParams(req.query);

  search
    .movieOrTvByWords(words, firstPage, index, limit)
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.movieByWords = (req, res) => {
  const { words, firstPage, index, limit } = initParams(req.query);
  const fitter = firstPage > 0 ? 1 : -1;
  onPage = !index.tmdb
    ? fitter * Math.ceil((index.local + fitter) / 20)
    : firstPage;

  if (!index.tmdb) index.tmdb = index.local;

  search
    .movieByWords(words, onPage, index, limit)
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.tvByWords = (req, res) => {
  const { words, firstPage, index, limit } = initParams(req.query);

  search
    .tvByWords(words, firstPage, index, limit)
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};

exports.personByWords = (req, res) => {
  const { words, firstPage, index, limit } = initParams(req.query);
  const fitter = firstPage > 0 ? 1 : -1;
  onPage = !index.tmdb
    ? fitter * Math.ceil((index.local + fitter) / 20)
    : firstPage;

  if (!index.tmdb) index.tmdb = index.local;

  search
    .personByWords(words, onPage, index, limit)
    .then(({ err, data }) => (err ? resError(res, data) : res.send(data)));
};
