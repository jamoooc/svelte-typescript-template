<script>

  import { logo } from "../utils/data";
  import { toggleMobileNav } from "./stores"
  
  import NavLink from "./NavLink.svelte";

  function closeMenu() {
    toggleMobileNav.update(t => t = false);
  }

</script>

<div class="logo_container" on:click={closeMenu}>
  <NavLink to="/">
    <svg 
      version="1.0" 
      xmlns="http://www.w3.org/2000/svg" 
      width={logo.width} 
      height={logo.height} 
      viewBox={logo.viewPort}
    >
      {@html logo.svg}
    </svg>
  </NavLink>
</div>  

<style>

  .logo_container {
    position: relative;
    margin-right: auto;
    padding: 0.6rem 0 0.4rem 0.8rem;
    z-index: 2;
  }

</style>
