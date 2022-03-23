<script>
  export let article;
</script>

<h2>{article.title}</h2>
<div>
  <img src={article.author.profile_image.url} alt={article.author.name} width="40" height="40" />
  <span>{article.author.name}</span>
</div>
カテゴリー: <a href="/categories/{article.category.slug}">{article.category.title}</a>
{article.publishedAt ?? "下書き中"}

<main class="content">{@html article.body}</main>

<style>
  h2 {
    margin: 0;
    text-align: center;
    border-bottom: 3px double orange;
  }

  .content {
    padding: 16px;
    background-color: #fff;
  }
</style>
