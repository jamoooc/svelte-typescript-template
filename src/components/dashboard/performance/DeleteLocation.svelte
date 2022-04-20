<script lang="ts"> 

  import Select from '../../forms/Select.svelte';
  import Loading from '../../Loading.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import { createForm } from '../../forms/form';
  import { number, object, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import type { LocationData } from '../../../utils/types';

  export let modalOpen: boolean;

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let locationData: LocationData[] = [];

  async function getComposerList() {
    await fetchData<LocationData[]>(`${process.env.GET_LOCATION_LIST}`)
      .then(data => locationData = data)
      .catch(e => console.error(e));
  }

  // component may be a modal - notify parent to close modal and update 
  const dispatch = createEventDispatcher();
  function updateHandler() {
		dispatch('updated');
    modalOpen = false;
	}

  onMount(getComposerList);

  async function onSubmit(formData: LocationData) {
    try {
      const res = await fetch(
        `${hostname}${process.env.DELETE_LOCATION}`, 
        fetchOptions(formData, 'DELETE', headers)
      );
      await res.json();
      if (!res.ok) {
        throw new Error('Error submitting form');
      }
      $formState.submitted = true;
      updateHandler();
    } catch (e) {
      console.error(e);
      $formState.error = true;
    }
  }

  const formFields: Pick<LocationData, "id"> = {
    id: 0 // IDs start at 1
  }

  const validationSchema: SchemaOf<Pick<LocationData, "id">> = object({
    id: number().positive('location is a required field').required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<Pick<LocationData, "id">>(formFields, validationSchema, onSubmit);

</script>

<h3 class:modalOpen>
  Delete location
</h3>

{#if $formState.loading}
  <Loading />
{:else if $formState.submitted}
  <h3>
    Submitted
  </h3>
{:else if $formState.error}
  <h3>
    Error submitting form
  </h3>
{:else}
  <div class="form_container">
    <form on:submit|preventDefault={handleSubmit}>
      <Select 
        id='id' 
        label='Location'
        bind:value={$form.id} 
        optKey='location'
        options={locationData}
        placeholder='Select location'
        errors={$errors}
      />
      <div class="button_container">
        <button type='submit'>
          Submit
        </button>
      </div>
    </form>
  </div>
{/if}

<style>

  /* conditionally remove padding if used as modal */
  .modalOpen {
    margin-top: 0;
    padding-top: 0;
  }

  .button_container {
    display: flex;
    flex-direction: row-reverse;
  }

</style>