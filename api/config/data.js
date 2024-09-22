const axios = require("axios");
const { urlImgDataMaker, urlTopListMaker } = require("./utils/urlMaker");
const { filterList } = require("./utils/filters");

exports.urlImgData = () => {
  return axios.get(urlImgDataMaker()).then(({ data }) => data.images);
};

exports.topLists = () => {
  const reqs = [];
  const media = ["movie", "any", "tv"];
  const listUrl = urlTopListMaker();
  listUrl.map((url) => reqs.push(axios.get(url)));

  return Promise.all(reqs)
    .then((allRes) =>
      allRes.map(({ data }, i) =>
        filterList(data.results.slice(0, 10), media[i])
      )
    )
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, data: err };
    });
};
