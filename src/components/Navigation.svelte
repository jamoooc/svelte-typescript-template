<script>

  import Logo from './Logo.svelte';
  import ResponsiveLayout from "./ResponsiveLayout.svelte";

</script>

<div>
  <Logo />
  <ResponsiveLayout /> 
</div>

<style>

  div {
    display: flex;
  }

  /* remove nav box shadow on mobile */
  
  @media(min-width: 825px){
    div {
      box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);
    }
  }

</style>
