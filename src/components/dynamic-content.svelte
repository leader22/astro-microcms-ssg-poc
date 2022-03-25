<script>
  import { onMount } from "svelte";

  let now = "...";
  let ua = "...";
  onMount(() => {
    now = new Date();
    ua = navigator.userAgent;
  });
</script>

<div>
  NOW: <time>{now.toLocaleString()}</time>
  <hr />
  UA: <span>{ua}</span>
</div>

<style>
  time { color: blueviolet; }
</style>
