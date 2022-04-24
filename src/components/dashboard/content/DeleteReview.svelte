<script lang="ts"> 

  import Select from '../../forms/Select.svelte';
  import Loading from '../../Loading.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import { createForm } from '../../forms/form';
  import { object, number, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';
  import { onMount } from 'svelte';
  import type { Review } from '../../../utils/types';

  type ReviewID = Pick<Review, "id">;

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let reviewData: Review[] = [];
  async function getReviewList() {
    await fetchData<Review[]>(`${process.env.GET_REVIEW_LIST}`, { headers })
      .then(data => reviewData = data)
      .catch(e => console.error(e));
  }

  onMount(getReviewList);

  const updateHandler = () => {
    getReviewList();
  }

  async function onSubmit(formData: ReviewID) {
    try {
      const res = await fetch(
        `${hostname}${process.env.DELETE_REVIEW}`, 
        fetchOptions(formData, 'DELETE', headers)
      );
      await res.json();
      if (!res.ok) {
        throw new Error('Error submitting form');
      }
      updateHandler();
      $formState.submitted = true;
    } catch (e) {
      console.error(e);
      $formState.error = true;
    }
  }

  const formFields: ReviewID = {
    id: 0
  }

  const validationSchema: SchemaOf<ReviewID> = object({
    id: number().positive('composer is a required field').required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<ReviewID>(formFields, validationSchema, onSubmit);

</script>

<h2>
  Delete Review
</h2>

{#if $formState.loading}
  <Loading />
{:else if $formState.error}
  <h3>
    Error submitting form
  </h3>
{:else}
  {#if $formState.submitted}
    <h3>
      Submitted
    </h3>
  {/if}
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
      />
      <div class="button_container">
        <button type='submit'>
          Submit
        </button>
      </div>
    </form>
  </div>
{/if}
