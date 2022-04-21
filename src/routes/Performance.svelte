<script lang="ts">
  
  import Loading from "../components/Loading.svelte";
  import PerformanceItem from "../components/PerformanceItem.svelte";
  import Error from '../components/Error.svelte'
  import fetchData from '../utils/fetchData.js'
  import { onMount } from "svelte";
  import type { Performance } from '../utils/types';
  // import NavLink from "../components/NavLink.svelte";

  let perf: Promise<Performance[]>;

  onMount(async () => {
    perf = fetchData<Performance[]>(`${process.env.GET_PERFORMANCE}`);

  })
$: console.log(perf)
</script>

<div class="content_container">
  <h1>Performances</h1>
  <div>
    {#await perf}
      <Loading />
    {:then perfItems}
      {#if perfItems}
        <ul>
          {#each perfItems as perfItem}
            <PerformanceItem { ...perfItem} /> 
          {/each}
        </ul>
      {/if}
    {:catch error}
      <Error {...error} />
    {/await}
  </div>
  <!-- <nav>
    <NavLink to={'past-performances'}>View past performances</NavLink>
  </nav> -->
</div>

<style>

  ul {
    padding: 0;
    margin: 0;
  }

  /* nav {
    padding: 0 0 0 0;
    margin: 2rem 0 1rem 0.5rem;
    font-size: large;
    position: absolute;
    bottom: 3rem;
  } */

</style>

