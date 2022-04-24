<script type="ts">

  import fetchData from "../utils/fetchData.js";
  import ImageLoader from '../components/images/ImageLoader.svelte';
  import Loading from "../components/Loading.svelte";
  import Modal from '../components/GalleryModal.svelte';
  import { onMount } from 'svelte';
  import type { GalleryImageSrcSet } from '../utils/types';
  
  let galleryData: GalleryImageSrcSet[];

  onMount(async () => {
    fetchData<GalleryImageSrcSet[]>(`${process.env.GET_GALLERY}`)
      .then(data => {
        Draw(data);
        galleryData = data;
      })
      .catch(e => error = e);
  })

  let error: Error;
  let gap = 10;
  let maxColumnWidth = 500;
  let columnCount = 0;
  let galleryWidth = 0;
  let columns: Array<GalleryImageSrcSet[]> = [];
  let showModal = false;
  let modalImage: GalleryImageSrcSet;
  
  // draw function from 'svelte-image-gallery'

  $: columnCount && Draw(galleryData);
  $: columnCount = Math.floor(galleryWidth / maxColumnWidth) || 1;
  $: galleryStyle = `grid-template-columns: repeat(${columnCount}, 1fr); --gap: ${gap}px`;
   
  // fill columns with image URLs
  function Draw(galleryData: GalleryImageSrcSet[]) {
    if (!galleryData) {
      return;
    }
    columns = [];
    for (let i = 0; i < galleryData.length; i++) {
      const idx = i % columnCount;
      columns[idx] = [ ...columns[idx] || [], galleryData[i] ];
    }
  }

  function openModal(idx: number) {
    modalImage = galleryData[idx];
    showModal = !showModal;
  }

</script>

{#if showModal}
  <Modal 
    modalImage={modalImage} 
    galleryData={galleryData}
    on:close="{() => showModal = false}" />
{/if}  

<h1>Gallery</h1>
<div class="gallery_container">
  {#if !galleryData}
    {#if error} 
    <div class="content_container">
      <p>No images found.</p>
    </div>
    {:else}
      <Loading />
    {/if}
  {:else if columns}
    <div id="gallery" bind:clientWidth={galleryWidth} style={galleryStyle}>
      {#each columns as column}
        <div class="column">
          {#each column as image} 
            <div on:click={() => openModal(galleryData.findIndex((e) => e.id === image.id))}>
              <ImageLoader 
                src={image.src} 
                srcset={image.srcset} 
                sizes={image.sizes} 
                alt={image.description} 
                gallery={true}
              />
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>

  .gallery_container {
    padding-top: 0.6em;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  
  /* styles from svelte-image-gallery */

  #gallery { 
    width: 100%; 
    display: grid; 
    gap: var(--gap);
  }

  #gallery .column { 
    display: flex; 
    flex-direction: column;
  }
    
  #gallery .column * { 
    width: 100%; 
    margin-top: var(--gap) 
  }
    
  #gallery .column *:nth-child(1) { 
    margin-top: 0 
  }

  /* extra small device up to 575.98px */

  @media (max-width: 575.98px)  {
    h1 {
      padding: 0 10vw 0 10vw;
    }
  }  

  /* small device 576 to 767.98 */

  @media (min-width: 576px) and (max-width: 767.98px)  {
    h1 {
      padding: 0 10vw 0 10vw;
    }
  }

  /* medium device 768px to 991.98px */

  @media (min-width: 768px) and (max-width: 991.98px)  {
    h1 {
      padding: 0 12.5vw 0 12.5vw;
    }
  }

  /* large device 992px to 1199.98 */

  @media (min-width: 992px) and (max-width: 1199.98px) {
    h1 {
      padding: 0 15vw 0 15vw;
    }
  }

  /* extra large device >= 1200px */

  @media(min-width: 1200px) and (max-width: 1499.98px) {
    h1 {
      padding: 0 20vw 0 20vw;
    }
  }

  /* devices > 1500px */

  @media(min-width: 1500px) {
    h1 {
      padding: 0 25vw 0 25vw;
    }
  }

</style>
