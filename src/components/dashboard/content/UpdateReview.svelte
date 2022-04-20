<script lang="ts"> 

  import Select from '../../forms/Select.svelte';
  import Input from '../../forms/Input.svelte';
  import Textarea from '../../forms/Textarea.svelte';
  import Datetime from '../../forms/Datetime.svelte';
  import Checkbox from '../../forms/Checkbox.svelte';
  import Loading from '../../Loading.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import { createForm } from '../../forms/form';
  import { string, boolean, object, number, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';
  import { onMount } from 'svelte';
  import type { Review } from '../../../utils/types';

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let reviewData: Review[] = [];
  async function getReviewList() {
    await fetchData<Review[]>(`${process.env.GET_REVIEW_LIST}`)
      .then(data => reviewData = data)
      .catch(e => console.error(e));
  }

  onMount(getReviewList);

  function onSelected(event: CustomEvent) {
    const reviewID: number = event.detail?.value;
    if (reviewID) {
      const idx = reviewData.findIndex(e => e.id === reviewID);
      if (idx >= 0) {
        $form.review = reviewData[idx].review
        $form.reviewer = reviewData[idx].reviewer
        $form.work = reviewData[idx].work
      }
    }
  }

  async function onSubmit(formData: Review) {
    try {
      const res = await fetch(
        `${hostname}${process.env.UPDATE_REVIEW}`, 
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

  const formFields: Review = {
    id: 0,
    review: '',
    reviewer: '',
    work: '',
    date: null,
    display: false
  }

  const validationSchema: SchemaOf<Review> = object({
    id: number().positive('composer is a required field').required(),
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
  } = createForm<Review>(formFields, validationSchema, onSubmit);

</script>

<h2>
  Delete Review
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
    <form on:submit|preventDefault={handleSubmit}>
      <Select 
        id='id' 
        bind:value={$form.id} 
        optKey='description'
        options={reviewData}
        placeholder='Select review'
        label='Review'
        errors={$errors}
        on:selected={(v) => onSelected(v)}
      />
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
