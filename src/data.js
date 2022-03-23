import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_API_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

const fetchAllArticles = async () => {
  // Should cache? but it may break something if this called in async
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

  return allArticles;
};

//
// Setup each page data
//

// /
export const setupIndexPage = async () => {
  const { contents } = await client.get({
    endpoint: "articles",
    queries: { limit: 4, orders: "-publishedAt" }
  });

  return { articles: contents };
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
