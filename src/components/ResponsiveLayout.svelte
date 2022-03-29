<script>

  import { nav } from '../utils/data';

  import DesktopView from './DesktopView.svelte';
  import MobileView from './MobileView.svelte';

  const breakpoint = 825;

  let screenWidth;

</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if screenWidth > breakpoint}
  <DesktopView items={nav}/>
{:else}
  <MobileView items={nav}/>
{/if}
