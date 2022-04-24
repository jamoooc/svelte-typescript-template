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

  interface PerformanceDate { 
    id: number;
    date: Date;
  }

  type PerformanceID = Pick<PerformanceDate, "id">;

  export let modalOpen: boolean;

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let performanceDateData: PerformanceDate[] = [];

  async function getPerformanceDateList() {
    await fetchData<PerformanceDate[]>(`${process.env.GET_PERFORMANCE_DATE_LIST}`, { headers })
      .then(data => performanceDateData = data)
      .catch(e => console.error(e));
  }

  onMount(getPerformanceDateList);

  async function onSubmit(formData: PerformanceID) {
    try {
      const res = await fetch(
        `${hostname}${process.env.DELETE_PERFORMANCE_DATE}`, 
        fetchOptions(formData, 'DELETE', headers)
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

  const formFields: PerformanceID = {
    id: 0 // IDs start at 1
  }

  const validationSchema: SchemaOf<PerformanceID> = object({
    id: number().positive('location is a required field').required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<PerformanceID>(formFields, validationSchema, onSubmit);

</script>

<h3 class:modalOpen>
  Delete performance date
</h3>

{#if $formState.loading}
  <Loading />
{:else}
  {#if $formState.submitted}
    <h3>
      Submitted
    </h3>
    {:else if $formState.error}
    <h3>
      Error submitting form
    </h3>
  {/if}
  <div class="form_container">
    <form on:submit|preventDefault={handleSubmit}>
      <Select 
        id='id' 
        label='Select date'
        bind:value={$form.id} 
        optKey='description'
        options={performanceDateData}
        placeholder='Select performance date'
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