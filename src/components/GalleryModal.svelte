<script lang="ts">

  import Loading from './Loading.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { GalleryImageSrcSet } from '../utils/types';

  // SVG
  let leftArrow = "80 10, 20 50, 80 90";
  let rightArrow = "20 10, 80 50, 20 90"; 
  let loaded = false;

  export let modalImage: GalleryImageSrcSet;
  export let galleryData: GalleryImageSrcSet[];

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

  function leftControl(i: number) {
    loaded = false;
    console.log(((i - 1) + galleryData.length) % galleryData.length)
    modalImage = galleryData[((i - 1) + galleryData.length) % galleryData.length]; // ((x - 1) + k) % k
  } 

  function rightControl(i: number) {
    loaded = false;
    console.log((i + 1) % galleryData.length)
    modalImage = galleryData[(i + 1) % galleryData.length]; // x % (max - min + 1) + min
  }

  function onload(node) {
    node.onload = () => {
      loaded = true;
      node.style.opacity = 1;
    }
    return {
      destroy() {
        loaded = false;
      }
    }
  }

</script>

<svelte:window on:keydown|preventDefault={close} />

<div class="modal_background" on:click={close}></div>

{#if !loaded}
  <div class="loading">  
    <Loading />
  </div>
{/if}

<div class="modal">
  <img 
    use:onload
    class="{loaded ? 'modal_img loaded' : 'modal_img'}"
    src={modalImage.src} 
    srcset={modalImage.srcset} 
    sizes={modalImage.sizes} 
    alt={modalImage.description}
  >

  {#if loaded}
    <div 
      on:click={() => leftControl(galleryData.findIndex(e => e.id === modalImage.id))} 
      class="left_toggle_container"
    >
      <div class="left_control_svg_container">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polyline class="arrow" points={leftArrow} />
        </svg>
      </div>
    </div>
    
    <div 
      on:click={() => rightControl(galleryData.findIndex(e => e.id === modalImage.id))} 
      class="right_toggle_container"
    >
      <div on:click={close} class="exit_svg_container">
        <svg class="cross" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g>
            <line x1="10" y1="10" x2="90" y2="90" />
            <line x1="90" y1="10" x2="10" y2="90" />
          </g>
        </svg>
      </div>
      <div class="right_control_svg_container">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polyline class="arrow" points={rightArrow} />
        </svg>
      </div>
    </div>
    
    <p class="modal_desc" name="desc">
      {modalImage.description}
    </p>
  {/if}
</div>

<style>

  img {
    opacity: 0;
    transition: opacity 500ms ease-out
  }

  img.loaded {
    opacity: 1;
  }

  .loading {
    position: absolute;
    z-index: 10;
    width: 100%
  }

  .modal_background {
    position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: black;
    opacity: 0.8;
    z-index: 1;
  }

  .modal {
		position: fixed; 
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background: transparent;
    z-index: 1;
  }

  .modal_img {
    max-width: 97vw;
    max-height: 97vh;
  }

  .modal_desc {
    position: fixed;
    right: 1%;
    bottom: 2%;
    margin: 0;
    border: 0;
    padding: 0;
    font-size: 0.6em;
    stroke: rgb(94, 94, 94);
  }

  @media(min-width: 500px) {
    .modal_desc {
      font-size: 0.8em;
    }
  }
  @media(min-width: 1024px) {
    .modal_desc {
      font-size: 1em;
    }
  }

  .left_toggle_container {
    position: fixed;
    left: 0;
		top: 0;
    width: 25vw;
    height: 100%;
    z-index: 2;
  }

  .right_toggle_container {
    position: fixed;
    right: 0;
		top: 0;
    width: 25vw;
    height: 100%;
    z-index: 2;
  }

  .arrow {
    stroke: rgb(138, 138, 138);
    opacity: 0.8;
    stroke-linejoin: round;
    stroke-linecap: round;
    fill: transparent;
    stroke-width: 0.5em;
  }

  .left_control_svg_container:hover .arrow {
    stroke: rgb(94, 94, 94);
  }

  .right_control_svg_container:hover .arrow {
    stroke: rgb(94, 94, 94);
  }

  .left_control_svg_container {
    position: fixed;
    top: calc(50% - 2vw); /* - half svg size */
    left: 1vw;
    width: 4vw;
    max-width: 25px;
    max-height: 25px;
  }

  .right_control_svg_container {
    position: fixed;
    top: calc(50% - 2vw); /* - half svg size */
    right: 1vw;
    width: 4vw;
    max-width: 25px;
    max-height: 25px;
  }

  .exit_svg_container {
    position: fixed;
    top: 1vw; 
    right: 1vw;
    width: 3vw;
    height: 3vw;
    max-width: 20px;
    max-height: 20px;
  }

  .cross {
    position: absolute;
    stroke: rgb(94, 94, 94);
    stroke-width: 0.6em;
    stroke-linecap: round;
    opacity: 0.8;
  }

</style>
