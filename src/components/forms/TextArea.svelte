<script lang="ts">

  export let id: string;
  export let name: string = id;
  export let label: string = `${name[0].toUpperCase()}${name.substring(1)}`;
  export let value: string;
  export let placeholder: string = null;
  export let errors = {};

</script>

<label for={name}>{label}</label>
<textarea
  {id}
  {name}
  {placeholder}
  bind:value={value}
/>
{#if errors[id]}
  <small class="error_message">
    {errors[id]}
  </small>
{/if}

<style>
  textarea {
    margin: 0;
  }
</style>