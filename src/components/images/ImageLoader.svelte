<script lang="ts">

  export let src: string;
  export let srcset: string;
  export let sizes: string;
  export let alt: string;
  export let gallery: Boolean;

  import IntersectionObserver from './IntersectionObserver.svelte';
  import Image from './Image.svelte';
  import { onMount } from 'svelte';

  // check for browser implemented lazy loading 
  let nativeLoading = false
  onMount(() => {
    if ('loading' in HTMLImageElement.prototype) {
      nativeLoading = true
    }
  })

</script>

<IntersectionObserver once={true} let:intersecting={intersecting} >
  {#if intersecting || nativeLoading}
    <Image {src} {srcset} {sizes} {alt} {gallery} on:imageLoaded />
  {/if}
</IntersectionObserver>
