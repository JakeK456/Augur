const unionBy = require("lodash/unionBy.js");
const fetch = require("node-fetch");

let news = [];

const DELAY = 1800000; // 30 minutes

const pollNews = () => {
  fetchNews();
  setInterval(fetchNews, DELAY);
};

const getNews = () => {
  return news;
};

const fetchNews = async () => {
  const maUrl = `https://api.marketaux.com/v1/news/all?filter_entities=true&language=en&api_token=${process.env.MA_KEY2}`;

  const response = await fetch(maUrl);
  const rawdata = await response.json();

  const data = rawdata.data.map(({ uuid, title, source, image_url, url }) => {
    if (image_url === "") {
      image_url =
        "https://static.businessworld.in/article/article_extra_large_image/1663780107_A00qNn_jensen_huang.jpg";
    }
    return {
      uuid,
      title,
      source,
      image_url,
      url,
    };
  });
  news = unionBy(data, news, "uuid");

  if (news.length > 15) {
    news.length = 15;
  }
};

module.exports = {
  pollNews,
  getNews,
};
