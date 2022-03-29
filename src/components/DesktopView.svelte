<script>

  import NavLink from "./NavLink.svelte";

  export let items;

</script>

<nav>
  <ul>
    {#each items as item}
      <li>
        <NavLink to={item.href}>{item.label}</NavLink>
      </li>
    {/each}
  </ul>
</nav>

<style>

  ul {
    display: flex;
    list-style: none;
  }

  li {
    padding-top: 0.4em;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  li:last-child {
    padding-right: 2em;
  }

</style>
