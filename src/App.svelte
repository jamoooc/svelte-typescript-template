<script lang="ts">

	import { Router, Route } from "svelte-routing";
	import { home } from "./utils/data";

	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Footer from "./components/Footer.svelte";
  import Default from "./routes/Default.svelte";
  import Gallery from "./routes/Gallery.svelte";
	import Navigation from "./components/Navigation.svelte";
	import Repertoire from "./routes/Repertoire.svelte";
  import Performance from "./routes/Performance.svelte";

	export let url: string = '';

</script>

<svelte:head>
  <title>{home.headingOne}</title>
</svelte:head>

<main>
  <Router url="{url}">
    <div class="app-container">
      <div class="page-container">
        <Navigation />
        <Route path="about" component="{About}" />
        <Route path="repertoire" component="{Repertoire}" />
        <Route path="performances" component="{Performance}" />
        <Route path="gallery" component="{Gallery}" />
        <Route path="/" component="{Home}" />
        <Route path="" component="{Default}" />
      </div>
      <Footer />
    </div>
  </Router>
</main>

<style>

	.app-container {
    position: relative;
    min-height: 100vh;
  }

  .page-container {
    padding-bottom: 2.5rem;
  }

</style>