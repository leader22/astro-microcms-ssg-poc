<script>
  import { onMount } from "svelte";
  import Article from "./article.svelte";

  let articlePromise = new Promise(() => {/* ;D */});
  onMount(() => {
    const params = new URLSearchParams(location.search);
    const contentId = params.get("contentId");
    const draftKey = params.get("draftKey");
    const apiKey = params.get("apiKey");
    const serviceDomain = params.get("serviceDomain");

    articlePromise = fetch(
      `https://${serviceDomain}.microcms.io/api/v1/articles/${contentId}?draftKey=${draftKey}`,
      { headers: { "X-MICROCMS-API-KEY": apiKey } }
    )
    .then(res => res.json())
  });
</script>

{#await articlePromise}
  <div>LOADING...</div>
{:then article}
  <Article {article} />
{:catch err}
  <p>{err.message}</p>
{/await}
