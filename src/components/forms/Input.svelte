<script lang="ts">

  export let id: string;
  export let name: string = id;
  export let label: string = `${name[0].toUpperCase()}${name.substring(1)}`;
  export let value: string;
  export let errors = {};

</script>

<label for={name}>{label}</label>
<input
  {id}
  {name}
  bind:value={value}
/>
{#if errors[id]}
  <small class="error_message">
    {errors[id]}
  </small>
{/if}

<style>
  input {
    margin: 0;
  }
</style>