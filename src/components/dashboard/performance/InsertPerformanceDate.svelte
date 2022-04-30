<script lang="ts"> 

  import Time from '../../forms/Time.svelte';
  import Select from '../../forms/Select.svelte';
  import Datetime from '../../forms/Datetime.svelte';
  import Loading from '../../Loading.svelte';
  import InsertLocation from '../performance/InsertLocation.svelte';
  import DeleteLocation from '../performance/DeleteLocation.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import { createForm } from '../../forms/form';
  import { number, string, object, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';
  import { onMount } from 'svelte';
  import type { PerformanceDate, LocationData } from '../../../utils/types';

  interface PerformanceData {
    id: number;
    title: string|null;
    description: string|null;
    repertoire_id: number;
    company_id: number;
    booking_url: string|null;
    deleted_at: Date|null; 
  }

  interface PerformanceDateData {
    performance_id: number;
    location_id: number;
    datetime: string; // TODO: use date
    duplicate_time: string|null;
  }

  export let modalOpen: boolean;

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

  let existingPerformanceDates: PerformanceDate[] = [];
  async function getPerformanceDatesList(id: number) {
    await fetchData<PerformanceDate[]>(`${process.env.GET_PERFORMANCE_DATE_LIST}/${id}`, { headers })
      .then(data => existingPerformanceDates = data)
      .catch(e => console.error(e));
  }

  let locationData: LocationData[] = [];
  async function getLocationData() {
    await fetchData<LocationData[]>(`${process.env.GET_LOCATION_LIST}`, { headers })
      .then(data => locationData = data)
      .catch(e => console.error(e));
  }

  onMount(async () => {
    getPerformanceList();
    getLocationData();
  });

  const onSelected = (id) => getPerformanceDatesList(id);
  const onLocationUpdated = () => getLocationData();

  async function onSubmit(formData: PerformanceDateData) {
    const data = { ...formData, datetime: new Date(formData.datetime).toISOString()}
    try {
      const res = await fetch(
        `${hostname}${process.env.INSERT_PERFORMANCE_DATE}`, 
        fetchOptions(data, 'POST', headers)
      );
      await res.json();
      if (!res.ok) {
        throw new Error('Error submitting form');
      }
      $formState.submitted = true;
      getPerformanceDatesList(formData.performance_id);
    } catch (e) {
      console.error(e);
      $formState.error = true;
    }
  }

  const formFields: PerformanceDateData = {
    performance_id: 0,
    location_id: 0,
    datetime: null,
    duplicate_time: null
  }

  const validationSchema: SchemaOf<PerformanceDateData> = object({
    performance_id: number().positive('performance is a required field').required(),
    location_id: number().positive('location is a required field').required(),
    datetime: string().min(2).max(128).required(),
    duplicate_time: string().nullable().notRequired(),
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<PerformanceDateData>(formFields, validationSchema, onSubmit);


  const dateFormatter = (dateString: Date) => {
    const date = new Date(dateString);
    if (date.toString() === 'Invalid Date') {
      return;
    }
    return new Intl.DateTimeFormat('en-GB', { 
      dateStyle: 'full', 
      timeStyle: 'long' 
    }).format(date)
  };

</script>

<h3 class:modalOpen>
  Add performance Date
</h3>

<h4>
  Existing dates:
</h4>
{#await existingPerformanceDates}
  <Loading />
{:then performanceDates} 
  {#if performanceDates}
    <ul>
      {#each performanceDates as date}
        <li>
          <p class="review">
            {dateFormatter(date.datetime)} 
            {#if date.duplicate_time}
              {date.duplicate_time}
            {/if}
          </p>
        </li>
      {/each}
    </ul>
  {/if}
{/await}


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
    <form on:submit={handleSubmit}>
      <Select 
        id='performance_id' 
        label='Select performance'
        bind:value={$form.performance_id} 
        optKey='description'
        options={performanceData}
        placeholder='Select performance'
        errors={$errors}
        on:selected={() => onSelected($form.performance_id)}
      />
      <Select 
        id='location_id' 
        label='Location'
        bind:value={$form.location_id} 
        optKey='location'
        options={locationData}
        placeholder='Select location'
        errors={$errors}
        insertModal={InsertLocation}
        deleteModal={DeleteLocation}
        on:updated={onLocationUpdated}
      />
      <Datetime 
        id='datetime'
        label='Select date'
        bind:value={$form.datetime} 
        errors={$errors}
      />
      <Time 
        id='duplicate_time' 
        label='Select duplicate time'
        bind:value={$form.duplicate_time} 
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