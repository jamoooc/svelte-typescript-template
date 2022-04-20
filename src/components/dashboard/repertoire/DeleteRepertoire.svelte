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
  import type { RepertoireDesc } from '../../../utils/types';

  export let modalOpen: boolean;

  interface RepertoireID { id: number; };

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let repertoireData: RepertoireDesc[] = [];

  async function getRepertoireList() {
    await fetchData<RepertoireDesc[]>(`${process.env.GET_REPERTOIRE_LIST}`)
      .then(data => repertoireData = data)
      .catch(e => console.error(e));
  }

  // component may be a modal - notify parent to close modal and update 
  const dispatch = createEventDispatcher();
  function updateHandler() {
		dispatch('updated');
    modalOpen = false;
	}

  onMount(getRepertoireList);

  async function onSubmit(formData: RepertoireID) {
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

  const formFields: RepertoireID = {
    id: 0 // IDs start at 1
  }

  const validationSchema: SchemaOf<RepertoireID> = object({
    id: number().positive('composer is a required field').required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<RepertoireID>(formFields, validationSchema, onSubmit);

</script>

<h3 class:modalOpen>
  Delete repertoire
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
        id='repertoire' 
        label='Repertoire' 
        bind:value={$form.id} 
        placeholder='Select repertoire'
        errors={$errors}
        optKey='title'
        options={repertoireData}
        optGroups={true}
        optGroupID='composer_id'
        optGroupLabel='surname'
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