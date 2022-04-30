<script lang="ts">

  export let id: string;
  export let name: string = id;
  export let label: string = `${name[0].toUpperCase()}${name.substring(1)}`;
  export let files: FileList;
  export let accept: string ='image/*';
  export let placeholder = null;
  export let errors = {};

</script>

<label for={id}>{label}:</label>
<input 
  {id}
  {name}
  {placeholder}
  type="file"
  accept={accept}
  bind:files 
/>

{#if errors[id]}
  <small class="error_message">
    {errors[id]}
  </small>
{/if}
