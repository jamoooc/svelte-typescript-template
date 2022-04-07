<script lang="ts">
  
  import { onMount, createEventDispatcher } from 'svelte'
  
  export let src: string;
  export let srcset: string;
  export let sizes: string;
  export let alt: string;
  export let gallery: Boolean;

  let loaded = false
  let image: HTMLImageElement;

  const dispatch = createEventDispatcher();

  onMount(() => {
    image.onload = () => {
      loaded = true;
      dispatch('imageLoaded');
    }
  })

</script>

<style>

  img {
    max-width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 1200ms ease-out;
  }

  img.loaded {
    opacity: 1;
  }

  .gallery {
    opacity: 0.9;
    transition: all .2s;
  }

  .gallery:hover {
    opacity: 1;
    transform: scale(1.01);
  }

</style>

<img 
  {src} 
  {srcset} 
  {sizes} 
  {alt}
  class:gallery
  class:loaded 
  bind:this={image} 
  loading="lazy" 
/>