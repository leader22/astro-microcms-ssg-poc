import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_API_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// Ensure only 1 shot to fetch
let cachePromise = null;
const fetchAllArticles = async () => {
  if (cachePromise === null) {
    console.log("🌀 fetchAllArticles() w/o cachePromise");
    return (cachePromise = fetchAllData());
  }

  console.log("✨ fetchAllArticles() w/  cachePromise");
  return cachePromise;
};

const fetchAllData = async () => {
  console.time("fetchAllData()");

  const allArticles = [];

  let offset = 0;
  const limit = 10;
  while (true) {
    const res = await client.get({
      endpoint: "articles",
      queries: { offset, limit, orders: "publishedAt" }
    });
    allArticles.push(...res.contents);

    offset += limit;
    if (offset > res.totalCount) break;
  }

  console.timeEnd("fetchAllData()");

  return allArticles;
};

//
// Setup each page data
//

// /
export const setupIndexPage = async () => {
  const allArticles = await fetchAllArticles();

  return { articles: allArticles.slice(0, 3) };
};

// /articles/:id
export const setupArticlePage = async ({ props }) => {
  return { article: props.article }
};

// /categories/:slug/:page
export const setupCategoryPage = async ({ props }) => {
  return { page: props.page };
};

//
// Define dynamic page paths
//

// /articles/:id
export const getStaticPathsForArticlePages = async () => {
  const allArticles = await fetchAllArticles();

  return allArticles.map((article) => ({
    params: { id: article.id },
    props: { article }
  }));
};

// /categories/:slug/:page
export const getStaticPathsForCategoryPages = async ({ paginate }) => {
  const allArticles = await fetchAllArticles();

  // XXX: 記事が存在しないカテゴリーは表示されない
  const allCategories = [...new Set(allArticles.map((article) => article.category.slug))];
  return allCategories.map((categorySlug) =>
    paginate(
      allArticles.filter((article) => article.category.slug === categorySlug),
      { params: { category: categorySlug }, pageSize: 2 }
    )
  );
};
