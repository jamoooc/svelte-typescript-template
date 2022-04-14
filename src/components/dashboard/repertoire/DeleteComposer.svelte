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
  import type { ComposerData } from '../../../utils/types';

  export let modalOpen: boolean;

  interface ComposerID {
    id: number;
  }

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let composerData: ComposerData[] = [];

  async function getComposerList() {
    console.log('DeleteComposer: called getComposerList');
    await fetchData<ComposerData[]>(`${process.env.GET_COMPOSER_LIST}`)
      .then(data => composerData = data)
      .catch(e => console.error(e));
  }

  // component may be a modal - notify parent to close modal and update 
  const dispatch = createEventDispatcher();
  function updateHandler() {
		dispatch('updated');
    modalOpen = false;
	}

  onMount(getComposerList);

  async function onSubmit(formData: ComposerID) {
    console.log('onSubmit', formData);
    try {
      const res = await fetch(
        `${hostname}${process.env.DELETE_COMPOSER}`, 
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

  const formFields: ComposerID = {
    id: 0 // IDs start at 1
  }

  const validationSchema: SchemaOf<ComposerID> = object({
    id: number().positive('composer is a required field').required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<ComposerID>(formFields, validationSchema, onSubmit);


</script>

<h3 class:modalOpen>
  Delete composer
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
    <form on:submit={handleSubmit}>
      <Select 
        id='composerID' 
        bind:value={$form.id} 
        optKey='full_name'
        options={composerData}
        placeholder='Select composer'
        label='Composer'
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