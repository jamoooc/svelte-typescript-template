<script lang='ts'>
  
  import Loading from "../components/Loading.svelte";
  import ErrorPage from "../components/Error.svelte"
  import fetchData from "../utils/fetchData";
  import { onMount } from 'svelte';
  import type { Biography, ImageSrcSet } from '../utils/types';

  let bio: Promise<Biography>;
  let img: Promise<ImageSrcSet>;

  onMount(async () => {
    bio = fetchData<Biography>(`${process.env.GET_BIOGRAPHY}`);
    img = fetchData<ImageSrcSet>(`${process.env.GET_PROFILE_IMAGE}`);
  })

</script>

<div class="content_container">
  <h1>About me</h1>

  {#await Promise.all([bio, img])} 
    <Loading />
  {:then [biography, image]}

    <img 
      class="img" 
      src={image.src} 
      srcset={image.srcset} 
      sizes={image.sizes} 
      alt="headshot"
    >

    {#each biography.text.split('\n') as para}
      <p>{para}</p>
    {/each}

    <p>
      Please click
      <a href="repertoire">
        here
      </a>
      to see a list of stage and concert repertoire and
      <a href="performances">
        here
      </a>
      to see upcoming performances.
    </p>

  {:catch error}
    <ErrorPage {error} />
  {/await}
</div>
  
<style>

  a {
    color: rgb(0,100,200);
    text-decoration: none;
  }

  .img {
    float: right;
    width: 35vw;
    margin: 0 0 1rem 1rem;
  }

  /* extra small devices up to 575.98px */

  @media (max-width: 575.98px)  {
    .img {
      width: 80vw;
      margin: 0 0 1rem 1rem;
    }
  }

  /* small devices 576 to 767.98 */

  @media (min-width: 576px) and (max-width: 767.98px)  {
    .img {
      float: right;
      width: 40vw;
      margin: 0 0 0.5rem 0.5rem;
    }
  }

  /* medium devices 768px and up */

  @media (min-width: 768px) {
    .img {
      float: right;
      width: 45%;
      margin:  0 0 1rem 1rem;
    }
  }

</style>
