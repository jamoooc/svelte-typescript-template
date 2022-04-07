<script>
  
  import NavLink from "./NavLink.svelte";

	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  import { toggleMobileNav } from "./stores"

  // transitions
  let menu = { delay: 0, duration: 100 }
  let arrow = { duration: 400, delay: 0, opacity: 0, start: 0, easing: quintOut }

  // menu functions
  function closeMenu() {
    toggleMobileNav.set(false);
  }

  function handleClick() {
    toggleMobileNav.update(t => !t);
  }

  export let items;

</script>

{#if $toggleMobileNav}
  <div transition:fade={menu} class="mobile-container">
    <nav>
      <ul>
        {#each items as item}
          <li on:click={closeMenu}>
            <NavLink to={item.href}>{item.label}</NavLink>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}

<div class="icon" on:click={handleClick}>
  {#if !$toggleMobileNav}
    <svg in:scale={arrow} viewBox="0 0 100 100" width="40px" height="40px">
      <line x1="15" y1="20" x2="85" y2="20" stroke="rgb(93, 93, 93)" stroke-width="12" stroke-linecap="round"/>
      <line x1="15" y1="50" x2="85" y2="50" stroke="rgb(93, 93, 93)" stroke-width="12" stroke-linecap="round"/>
      <line x1="15" y1="80" x2="85" y2="80" stroke="rgb(93, 93, 93)" stroke-width="12" stroke-linecap="round"/>
    </svg>
  {:else}
    <svg in:scale={arrow} viewBox="0 0 100 100" width="40px" height="40px">
      <line x1="20" y1="20" x2="80" y2="80" stroke="rgb(93, 93, 93)" stroke-width="12" stroke-linecap="round"/>
      <line x1="20" y1="80" x2="80" y2="20" stroke="rgb(93, 93, 93)" stroke-width="12" stroke-linecap="round"/>
    </svg>
  {/if}
</div>

<style>

  .mobile-container {
    height: 100%;
    width: 100vw;
    margin: 0;
    padding: 0;
    background-color: rgb(199, 198, 198);
    position: fixed;
    z-index: 1;
  }

  .icon {
    position: fixed;
    right: 0;
    padding: 1em;
    height: 3em;
    z-index: 1;
  }

  ul {
    list-style: none;
  }

  li {
    font-size: 1.5rem;
    padding-top: 2rem;
    padding-right: 2rem;
    text-align: center;
  }

  li:first-child {
    padding-top: 15vh;
  }

</style>
