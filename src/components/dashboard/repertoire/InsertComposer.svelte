<script lang="ts"> 

  import Input from '../../forms/Input.svelte';
  import Loading from '../../Loading.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import { createForm } from '../../forms/form';
  import { object, string, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';
  import { createEventDispatcher } from 'svelte';
  import type { Composer } from '../../../utils/types';

  export let modalOpen: boolean; // when form component is displayed as a modal

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  // component may be a modal - notify parent to close modal and update 
  const dispatch = createEventDispatcher();
  function updateHandler() {
		dispatch('updated');
    modalOpen = false;
	}

  async function onSubmit(formData: Composer) {
    console.log('onSubmit', formData);
    try {
      const res = await fetch(
        `${hostname}${process.env.INSERT_COMPOSER}`, 
        fetchOptions(formData, 'POST', headers)
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

  const formFields: Composer = {
    forename: '',
    surname: '',
  }

  const validationSchema: SchemaOf<Composer> = object({
    forename: string().min(2).max(32).required(),
    surname: string().min(2).max(32).required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<Composer>(formFields, validationSchema, onSubmit);

</script>

<h2 class:modalOpen>
  Insert Composer
</h2>

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
      <Input 
        id='forename' 
        bind:value={$form.forename} 
        errors={$errors}
      />
      <Input 
        id='surname' 
        bind:value={$form.surname} 
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