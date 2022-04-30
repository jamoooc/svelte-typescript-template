<script lang="ts">

  import { mediaButtons } from '../utils/data';
  import { onMount } from 'svelte';
  import { home } from "../utils/data";
  import Loading from "../components/Loading.svelte";
  import MediaIcon from "../components/MediaIcon.svelte";
  import Error from "../components/Error.svelte";
  import fetchData from "../utils/fetchData";
  import type { Review } from '../utils/types';

  const viewBox = "0 0 48 48";

  let reviews: Promise<Review[]>;

  onMount(async () => {
    reviews = fetchData<Review[]>(`${process.env.GET_REVIEWS}`);
  })

</script>

<div class="title_container">
  <div class="headings">
    <h1>{home.headingOne}</h1>
    <h2>{home.headingTwo}</h2>
  </div>
</div>

<div class="content_container">
  {#await reviews}
    <Loading />
  {:then reviewItems}
    {#if reviewItems}
      <ul>
        {#each reviewItems as item}
          <li>
            <p class="review">
              {item.review}
            </p>
            <p class="reviewer">
              - {item.reviewer} {item.work ? `- ${item.work}` : ''}
            </p>
          </li>
        {/each}
      </ul>
    {/if}
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

  p {
    padding: 0;
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    margin: 2rem 0 0 0;
    list-style: none;
  }

  .title_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
  }

  .review {
    font-style: oblique;
    display: inline;
  }

  .reviewer {
    margin: 0.5rem 0 0 2rem;
    font-weight: lighter;
    font-size: medium;
  }

  .media_button_container {
    margin: 0 0 10vh 0;
    width: 60vw;
    padding: 0 10vw 0 20vw;
    display: inline-flex;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    justify-content: space-around;
  }

  /* up to 414.98px */

  @media (max-width: 414.98px) {
    .title_container {
      display: inline;
      text-align: center;
    }
    h1 {
      font-size: 3rem;
      margin: 1.5rem 1.5rem 0 1.5rem;
      padding-bottom: 1rem;
    }
    h2 {
      font-size: 2rem;
      padding: 0;
      margin: 1rem 1rem 0 1rem;
    }
    .media_button_container {
      margin: 2vh 0 2vh 0;
      padding: 0 20vw 0 20vw;
      display: grid;
      row-gap: 2rem;
    }
  }  

  /* < 414.98 */

  @media (max-width: 414.98px) {
    .reviewer {
      margin-left: 0.5rem;
    }
  }

  /* 414.98 to 575.98px */

  @media (min-width: 415px) and (max-width: 575.98px) {
    .title_container {
      display: inline;
      text-align: center;
    }
    h1 {
      margin: 3rem 4rem 0 4rem;
      padding-bottom: 1rem;

      font-size: 3rem;
    }
    h2 {
      font-size: 2rem;
      padding: 0;
      margin: 1rem 4rem 0 4rem;
    }
    .media_button_container {
      margin: 5vh 0 5vh 0;
      padding: 0 20vw 0 20vw;
      display: grid;
      row-gap: 2rem;
    }
  }  

  /* 576px to 767.98 */

  @media (min-width: 576px) and (max-width: 767.98px) {
    h1 {
      margin: 2rem 2rem 0 2rem;
      padding: 0 0 1rem 0.5rem;
    }
    h2 {
      margin: 1rem 2rem 0 2rem;
    }
    .title_container {
      grid-template-columns: 3fr 1fr;
    }
  }

  @media (min-width: 576px) {
    .media_button_container {
      width: 70vw;
      padding: 5vh 15vw 0 15vw;
    }
  }

  /* 768px to 991.98px */

  @media (min-width: 768px) and (max-width: 991.98px) {
    h1 {
      margin: 2rem 7rem 0 2rem;
      padding: 0 0.5rem 1rem 0.5rem;

    }
    h2 {
      margin: 1rem 0 1rem 2rem;
    }
    .title_container {
      grid-template-columns: 3fr 1fr;
    }
  }

  /* 992px to 1199.98 */

  @media (min-width: 992px) and (max-width: 1199.98px) {
    h1 {
      margin: 4rem 0 0 5rem;
    }
    h2 {
      margin: 1rem 0 1.5rem 5rem;
    }
  }

  /* 1200px to 1499.98px */

  @media(min-width: 1200px) and (max-width: 1499.98px) {
    h1 {
      margin: 4rem 6rem 0 7rem;
    }
    h2 {
      margin: 1rem 0 2rem 7rem;
    }
  }

  /* >= 1500px */

  @media(min-width: 1500px) {
    h1 {
      margin: 4rem 10rem 0 10rem;
    }
    h2 {
      margin: 1rem 0 4rem 10rem;
    }
  }

</style>
