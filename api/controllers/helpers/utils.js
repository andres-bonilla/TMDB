exports.resError = (res, { status, message }) =>
  res.status(status || 500).send({ message });

exports.initRules = (amount, page, tmdbIndex, sameIndex = false) => {
  let prevIndex;

  if (sameIndex)
    prevIndex = page < 0 ? Math.abs(page) * amount + 1 : (page - 1) * amount;
  else prevIndex = tmdbIndex;

  if (page < 0 && !prevIndex) page = Math.abs(page);

  const fitter = page < 0 ? -1 : 1;
  const stPage = fitter * Math.ceil((prevIndex + fitter) / 20) || -1;
  const index = {};
  index.init = (Math.abs(stPage) - 1) * 20 + 1;
  index.tmdb = prevIndex;
  index.local = page < 0 ? Math.abs(page) * amount + 1 : (page - 1) * amount;

  return { stPage, rules: { index, fitter, amount } };
};
