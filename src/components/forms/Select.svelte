<script type="ts">

  import { createEventDispatcher } from 'svelte';

  export let id: string;
  export let name: string = id;
  export let label: string = `${name[0].toUpperCase()}${name.substring(1)}`;
  export let value: number | string;
  export let placeholder: string = null
  export let errors = {};
  
  export let optId: string = 'id';  // submitted options prop name
  export let optKey: string;        // displayed options prop name
  export let options = null;        // arr of options passed to select
  
  // TYPE
  export let optGroups: boolean = null;
  export let optGroupID = null;
  export let optGroupLabel = null;

  // nested components to update select values
  export let insertModal = null; // TYPE ME : SvelteComponent
  export let deleteModal = null; 

  let insertModalOpen = false;
  let deleteModalOpen = false;

  function toggleInsertModal() {
    insertModalOpen = !insertModalOpen;
    deleteModalOpen = false;
  }

  function toggleDeleteModal() {
    deleteModalOpen = !deleteModalOpen;
    insertModalOpen = false;
  }

  // TYPE 
  function uniqueProp(arr, prop) {
    return arr.filter((e, i) => (
      i === arr.findIndex(a => a[prop] === e[prop])
    ));
  }

  const dispatch = createEventDispatcher();
  const onSelect = () => {
    dispatch('selected', { value });
  }

</script>



<label for={id}>{label}</label>
<div class="form_container">
  <select {name} bind:value={value} on:change={onSelect}>

    <!-- add placeholder -->
    {#if placeholder}
      <option value={typeof value === 'number' ? 0 : ''} disabled selected>
        {options.length > 0 ? placeholder : 'No data'} 
      </option> 
    {/if}

    <!-- collect items in option groups if specified -->
    {#if optGroups}
      <!-- get unique values from options array for optGroup labels -->
      {#each uniqueProp(options, optGroupID) as optGroup} 
        <optgroup label={optGroup[optGroupLabel]}>
          <!-- get options of optgroup -->
          {#each options as option}
            {#if option[optGroupID] === optGroup[optGroupID]}
              <option value={option[optId]}>
                {option[optKey]}
              </option>
            {/if}
          {/each}
        </optgroup>
      {/each}
    {:else}
      <!-- no group options specified -->
      {#each options as option}
        <option value={option[optId]} >
          {option[optKey]}
        </option>
      {/each}
    {/if}
  </select>

  {#if insertModal} 
    <button 
      on:click|preventDefault={() => toggleInsertModal()} 
      class="component_modal"
    >
      <svg viewBox="0 0 100 100" width="30px" height="30px">
        <line x1="50" y1="30" x2="50" y2="70" stroke="rgb(93, 93, 93)" stroke-width="8" stroke-linecap="round"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="rgb(93, 93, 93)" stroke-width="8" stroke-linecap="round"/>
      </svg>
    </button>
  {/if}

  {#if deleteModal} 
    <button 
      on:click|preventDefault={() => toggleDeleteModal()} 
      class="component_modal"
    >
      <svg viewBox="0 0 100 100" width="30px" height="30px">
        <line x1="67" y1="33" x2="33" y2="67" stroke="rgb(93, 93, 93)" stroke-width="8" stroke-linecap="round"/>
        <line x1="33" y1="33" x2="67" y2="67" stroke="rgb(93, 93, 93)" stroke-width="8" stroke-linecap="round"/>
      </svg>
    </button>
  {/if}
</div>

{#if errors[id]}
  <small class="error_message">
    {errors[id]}
  </small>
{/if}

{#if insertModalOpen}
  <div class="modal">
    <svelte:component 
      this={insertModal} 
      bind:modalOpen={insertModalOpen}
      on:updated
    />
  </div>
{/if}

{#if deleteModalOpen}
  <div class="modal">
    <svelte:component 
      this={deleteModal} 
      bind:modalOpen={deleteModalOpen}
      on:updated
    />
  </div>
{/if}

<style>

  label {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  
  select {
    margin: 0;
    margin-right: 5px;
  }

  .component_modal {
    border: 0;
    color: #ffffff;
    background-color: #ffffff;
    outline: none;
    float: none;
    width: 30px;
    height: 30px;
    margin: 0;
    padding: 0;
  }

  .component_modal:focus {
    border-color: #ffffff;
  }

  .component_modal:not(:disabled):active {
    background-color: #c9c9c988;
  }

  .form_container {
    width: 100%;
    display: flex;
    -webkit-flex-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .modal {
    border: 1px solid rgb(93, 93, 93);
    background-color: #fff;
    padding: 0 5px 0 5px;
    margin: 10px 0 0 0;
  }

</style>