<script lang="ts">

  import type { RepertoireItem } from '../utils/types';

  export let surname: string;
  export let works: RepertoireItem[];

</script>

{#if works}
  <li class="rep_composer">{surname}</li>

  {#each Object.entries(works) as [ ,v]}
    <li class="rep_title">{v.title} {#if v.role} - {v.role} {/if}</li>
  {/each}
{/if}

<style>

  .rep_composer {
    list-style: none;
    font-weight: bold;
    margin: 1rem 0 0rem 0;
  }

  .rep_title {
    font-weight: 200;
    margin: 0.2rem 0 0 0.8rem;
    padding: 0 0 0 0;
    list-style: none;
  }

  li:last-of-type {
    padding-bottom: 2rem;
  }

</style>
