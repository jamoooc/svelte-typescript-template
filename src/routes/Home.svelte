<script lang="ts">

  import { mediaButtons } from '../utils/data';
  import { onMount } from 'svelte';
  import { home } from "../utils/data";
  import Loading from "../components/Loading.svelte";
  import MediaIcon from "../components/MediaIcon.svelte";
  import Error from "../components/Error.svelte"
  import hostname from '../utils/hostname';
  import type { Review } from '../utils/types';

  const viewBox = "0 0 48 48";

  let data: Review[] = [];

  onMount(async () => {
    data = await fetch(`${hostname}${process.env.GET_REVIEWS}`)
      .then(res => res.json())
      .catch(e => console.error(e));
  })

</script>

<div class="title_container">
  <div class="headings">
    <h1>{home.headingOne}</h1>
    <h2>{home.headingTwo}</h2>
  </div>
</div>

<div class="content_container review_container">
  {#await data}
    <Loading />
  {:then reviewItems}
    {#each reviewItems as item}
      <span>
        <p class="review">
          {item.review}
        </p>
        <p class="reviewer">
          - {item.reviewer} {item.work ? `- ${item.work}` : ''}
        </p>
      </span>
    {/each}
  {:catch error}
    <Error {error} />
  {/await}
</div>


<div class="media_button_container">
  {#each mediaButtons as button}
    <a href={button.href}>
      <div class="media_button">
        <MediaIcon svg={button.svg} href={button.href} {viewBox} />
      </div>
    </a>
  {/each}
</div>

<style>

  h1 {
		font-size: 4rem;
    padding: 0 0.5rem 1rem 0.5rem;
    border-bottom: 1px solid rgba(93, 93, 93, 0.3);
  }

  h2 {
    font-size: 2rem;
    font-weight: normal;
    padding: 0 0 0 0.5rem;
  }

  .title_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
  }

  .reviewer {
    padding-left: 5rem;
    margin-top: 0.5rem;
    margin-bottom: 3rem;
    font-weight: lighter;
    font-size: medium;
  }

  .review {
    padding: 0 1rem 3rem 1rem;
    font-style: oblique;
    display: inline;
  }

  .review_container {
    margin: 5vh 0 0 0;
  }

  .media_button_container {
    margin: 5vh 0 10vh 0;
    width: 60vw;
    padding: 0 10vw 0 20vw;
    display: inline-flex;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    justify-content: space-around;
  }

  /* up to 350px */

  @media (max-width: 349.98px)  {
    .title_container {
      display: inline;
      text-align: center;
    }
    h1 {
      font-size: 3rem;
      margin: 1rem 3rem 0 3rem;
      padding-bottom: 1rem;
    }
    h2 {
      font-size: 2rem;
      margin: 1rem 1rem 0 1rem;
    }
    .media_button_container {
      margin-top: 7vh;
      width: 60vw;
      padding: 0 20vw 0 20vw;
      display: grid;
      row-gap: 1rem;
    }
  }

  /* 350.98 to 414.98px */

  @media (min-width: 350px) and (max-width: 414.98px) {
    .title_container {
      display: inline;
      text-align: center;
    }
    h1 {
      font-size: 3rem;
      margin: 3rem 3rem 0 3rem;
      padding: 0 0 1rem 0;
    }
    h2 {
      font-size: 2rem;
      padding: 0;
      margin: 1rem 1rem 0 1rem;
    }
    .review_container {
      padding: 6vh 7vw 0 7vw;
    }
    .media_button_container {
      margin-top: 10vh;
      width: 60vw;
      padding: 0 20vw 0 20vw;
      display: grid;
      row-gap: 2rem;
    }
  }  

  /* 414.98 to 575.98px */

  @media (min-width: 415px) and (max-width: 575.98px) {
    .title_container {
      display: inline;
      text-align: center;
    }
    h1 {
      margin: 3rem 3rem 0 3rem;
      padding-bottom: 1rem;
      font-size: 3rem;
    }
    h2 {
      font-size: 2rem;
      padding: 0;
      margin: 1rem 1rem 0 1rem;
    }
    .review_container {
      padding: 6vh 10vw 0 10vw;
    }
    .media_button_container {
      margin: 10vh 0 5vh 0;
      width: 60vw;
      padding: 0 20vw 0 20vw;
      display: grid;
      row-gap: 2rem;
    }
  }  

  /* 576px to 767.98 */

  @media (min-width: 576px) and (max-width: 767.98px) {
    h1 {
      margin: 2rem 0 0 2rem;
      padding: 0 0 1rem 0.5rem;
    }
    h2 {
      margin: 1rem 0 0 2rem;
    }
    .review_container {
      padding: 6vh 15vw 0 15vw;
    }
    .media_button_container {
      width: 70vw;
      padding: 0 15vw 0 15vw;
    }
  }

  /* 768px to 991.98px */

  @media (min-width: 768px) and (max-width: 991.98px) {
    h1 {
      margin: 2rem 0 0 2rem;
      padding: 0 0.5rem 1rem 0.5rem;

    }
    h2 {
      margin: 1rem 0 0 2rem;
    }
    .review_container {
      padding: 6vh 20vw 0 20vw;
    }
  }

  /* 992px to 1199.98 */

  @media (min-width: 992px) and (max-width: 1199.98px) {
    h1 {
      margin: 4rem 2rem 0 5rem;
    }
    h2 {
      margin: 1rem 0 0 5rem;
    }
    .review_container {
      padding: 6vh 20vw 0 20vw;
    }
  }

  /* 1200px to 1499.98px */

  @media(min-width: 1200px) and (max-width: 1499.98px) {
    h1 {
      margin: 4rem 6rem 0 7rem;
    }
    h2 {
      margin: 1rem 0 0 7rem;
    }
    .review_container {
      padding: 6vh 20vw 0 20vw;
    }
  }

  /* >= 1500px */

  @media(min-width: 1500px) {
    h1 {
      margin: 4rem 10rem 0 10rem;
    }
    h2 {
      margin: 1rem 0 0 10rem;
    }
    .review_container {
      padding: 6vh 20vw 0 20vw;
    }
  }

</style>
