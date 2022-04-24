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

  interface PerformanceData {
    id: number;
    description: string|null;
  }

  type PerformanceID = Pick<PerformanceDate, "id">;

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let performanceData: PerformanceData[] = [];

  async function getPerformanceList() {
    await fetchData<PerformanceData[]>(`${process.env.GET_PERFORMANCE_LIST}`, { headers })
      .then(data => performanceData = data)
      .catch(e => console.error(e));
  }

  onMount(getPerformanceList);

  async function onSubmit(formData: PerformanceID) {
    try {
      const res = await fetch(
        `${hostname}${process.env.DELETE_PERFORMANCE}`, 
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

<h3>
  Delete performance
</h3>
<p>Note: will remove all scheduled performances.</p>

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
        options={performanceData}
        placeholder='Select performance'
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
