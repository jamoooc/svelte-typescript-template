<script lang="ts"> 

  import Input from '../../forms/Input.svelte';
  import Textarea from '../../forms/Textarea.svelte';
  import Datetime from '../../forms/Datetime.svelte';
  import Checkbox from '../../forms/Checkbox.svelte';
  import Loading from '../../Loading.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import { createForm } from '../../forms/form';
  import { date, boolean, object, string, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';
  import type { Review } from '../../../utils/types';

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  async function onSubmit(formData: Omit<Review, "id">) {
    console.log('onSubmit', formData);
    try {
      const res = await fetch(
        `${hostname}${process.env.INSERT_REVIEW}`, 
        fetchOptions(formData, 'POST', headers)
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

  const formFields: Omit<Review, "id"> = {
    review: '',
    reviewer: '',
    work: '',
    date: null,
    display: false
  }

  const validationSchema: SchemaOf<Omit<Review, "id">> = object({
    review: string().min(2).max(512).required(),
    reviewer: string().min(2).max(128).required(),
    work: string().min(2).max(128).required(),
    date: string().min(2).max(128).required(),
    display: boolean().required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<Omit<Review, "id">>(formFields, validationSchema, onSubmit);

</script>

<h2>
  Add Review
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
      <Textarea 
        id='review' 
        bind:value={$form.review} 
        placeholder='Enter review'
        errors={$errors}
      />
      <Input 
        id='reviewer' 
        bind:value={$form.reviewer} 
        placeholder='Enter reviewer'
        errors={$errors}
      />
      <Input 
        id='work' 
        bind:value={$form.work} 
        placeholder='Enter work'
        errors={$errors}
      />
      <Datetime 
        id='date' 
        bind:value={$form.date} 
        placeholder='Enter date'
        errors={$errors}
      />
      <Checkbox 
        id='display' 
        bind:checked={$form.display} 
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
