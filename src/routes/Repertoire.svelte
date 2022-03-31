<script>
  
  import Loading from "../components/Loading.svelte";
  import Error from '../components/Error.svelte'
  import RepertoireItem from "../components/RepertoireItem.svelte";
  import fetchData from '../utils/fetchData.js'
  import { repertoire } from "../components/stores.js"
  import { onMount } from "svelte";
  import { hostname } from '../utils/hostname.js';

  // let data;

  // onMount(async () => {
  //   try {
  //     if (!$repertoire.length) {
  //       data = await fetchData(hostname, __myapp.env.GET_REPERTOIRE_PAGE, null, repertoire);
  //     } else {
  //       data = $repertoire
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // })

</script>

<div class="content_container"> 
  <h1>Repertoire</h1>
  <!-- {#await data}
    <Loading />
  {:then resolved}
    <div class="column_container">
      {#if resolved}
        <ul class="left_column">
          <h2>Opera</h2>
          {#each resolved as composer}
            {#if composer.opera}    
              <RepertoireItem surname={composer.surname} works={composer.opera} />
            {/if}
          {/each}
        </ul>
        <ul class="right_column">
          <h2>Concert</h2>
          {#each resolved as composer}
            {#if composer.concert}    
              <RepertoireItem surname={composer.surname} works={composer.concert} />
            {/if}
          {/each}
        </ul>
      {:else}
        <h3>
          No repertoire found.
        </h3>
      {/if}
    </div>
  {:catch error}
    <Error {error} />
  {/await} -->
</div>

<style>

  ul {
    padding: 0;
  }

  .left_column {
    margin-top: 0;
  }

  .right_column {
    margin-top: 0;
  }
  
  h3 {
    font-weight: normal;
    margin: 0;
  }

  /* all devices > 768px */
  
  @media (min-width: 768px) {
    .column_container {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  /* medium devices 768px to 991.98px */

  @media (min-width: 768px) and (max-width: 991.98px)  {
    .left_column {
      padding-left: 7vw;
      margin-right: 2.5vw;
    }

    .right_column {
      margin-left: 2.5vw;
      padding-left: 2.5vw;
    }
  }

  /* large devices 992px to 1199.98 */

  @media (min-width: 992px) and (max-width: 1199.98px) {
    .left_column {
      padding-left: 7.5vw;
      margin-right: 2.5vw;
    }

    .right_column {
      margin-left: 7.5vw;
      padding-left: 5vw;
    }
  }

  /* extra large devices >= 1200px */

  @media(min-width: 1200px) {
    .left_column {
      padding-left: 2.5vw;
    }

    .right_column {
      padding-left: 10vw;
      margin-left: 2.5vw;
    }
  }

</style>
