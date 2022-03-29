<script lang="ts">

	import { Router, Route } from "svelte-routing";
  import { home } from "./utils/data";

  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Footer from "./components/Footer.svelte";
  import Navigation from "./components/Navigation.svelte";

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
        <Route path="/" component="{Home}" />
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