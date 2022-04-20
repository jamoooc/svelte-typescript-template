<script lang="ts"> 

  import Loading from '../../Loading.svelte';
  import Textarea from '../../forms/Textarea.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import { createForm } from '../../forms/form';
  import { object, string, SchemaOf } from 'yup';
  import { onMount } from 'svelte';
  import { csrfToken } from '../../stores';
  import type { Biography } from '../../../utils/types';

  // pass the csrf token to fetchOptions and use Object.assign to the default headers?
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  onMount(getBiography);

  async function getBiography() {
    await fetchData<Biography>(`${process.env.GET_BIOGRAPHY}`)
      .then(bio => $form = Object.assign($form, bio))
      .catch(e => console.error(e));
  }

  async function onSubmit(formData: Biography) {
    try {
      const res = await fetch(
        `${hostname}${process.env.INSERT_BIOGRAPHY}`, 
        fetchOptions(formData, 'PUT', headers)
      );
      await res.json();
      if (!res.ok) {
        throw new Error('Error submitting form');
      }
      $formState.submitted = true;
    } catch (e) {
      console.error(e);
      $formState.error = true;
    }
  }

  const formFields: Biography = {
    text: ''
  }

  const validationSchema: SchemaOf<Biography> = object({
    text: string().min(2).max(128).required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<Biography>(formFields, validationSchema, onSubmit);

</script>

<h2>Update biography</h2>

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
      <Textarea 
        id='biography' 
        bind:value={$form.text} 
        errors={$errors}
      />
      <button type='submit'>
        Submit
      </button>
    </form>
  </div>
{/if}
