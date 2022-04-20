<script lang="ts"> 

  import Input from '../../forms/Input.svelte';
  import Select from '../../forms/Select.svelte';
  import Loading from '../../Loading.svelte';
  import InsertLocation from '../performance/InsertLocation.svelte';
  import DeleteLocation from '../performance/DeleteLocation.svelte';
  import InsertCompany from '../performance/InsertCompany.svelte';
  import DeleteCompany from '../performance/DeleteCompany.svelte';
  import InsertRepertoire from '../repertoire/InsertRepertoire.svelte';
  import DeleteRepertoire from '../repertoire/DeleteRepertoire.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import { createForm } from '../../forms/form';
  import { string, number, object, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';
  import { onMount } from 'svelte';
  import type { RepertoireDesc, CompanyData, LocationData } from '../../../utils/types';

  interface PerformanceData {
    title: string;
    description: string|null;
    repertoire_id: number|null;
    location_id: number;
    company_id: number;
    booking_url: string|null;
  }

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let repertoireData: RepertoireDesc[] = [];
  async function getRepertoireData() {
    await fetchData<RepertoireDesc[]>(`${process.env.GET_REPERTOIRE_LIST}`)
      .then(data => repertoireData = data)
      .catch(e => console.error(e));
  }

  let companyData: CompanyData[] = [];
  async function getCompanyData() {
    await fetchData<CompanyData[]>(`${process.env.GET_COMPANY_LIST}`)
      .then(data => companyData = data)
      .catch(e => console.error(e));
  }

  let locationData: LocationData[] = [];
  async function getLocationData() {
    await fetchData<LocationData[]>(`${process.env.GET_LOCATION_LIST}`)
      .then(data => locationData = data)
      .catch(e => console.error(e));
  }

  const onRepertoireUpdated = () => getRepertoireData();
  const onCompanyUpdated = () => getCompanyData();
  const onLocationUpdated = () => getLocationData();

  onMount(async () => {
    getRepertoireData();
    getCompanyData();
    getLocationData();
  });

  async function onSubmit(formData: PerformanceData) {
    console.log('onSubmit', formData)
    try {
      const res = await fetch(
        `${hostname}${process.env.INSERT_PERFORMANCE}`, 
        fetchOptions(formData, 'POST', headers)
      );
      await res.json();
      if (!res.ok) {
        throw new Error('Error submitting form');
      }
      $formState.submitted = true;
      
      // TODO: redirect to add date, pre select new perf?
    } catch (e) {
      console.error(e);
      $formState.error = true;
    }
  }

  const formFields: PerformanceData = {
    title: null,
    description: null,
    repertoire_id: 0,
    location_id: 0,
    company_id: 0,
    booking_url: null
  }

  const validationSchema: SchemaOf<PerformanceData> = object({
    title: string().nullable().min(2).max(128).notRequired(),
    description: string().nullable().min(2).max(128).notRequired(),
    repertoire_id: number().positive('repertoire is a required field').required(),
    location_id: number().positive('location is a required field').required(),
    company_id: number().positive('company is a required field').required(),
    booking_url: string().nullable().notRequired() // https://stackoverflow.com/questions/61634973/yup-validation-of-website-using-url-very-strict
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<PerformanceData>(formFields, validationSchema, onSubmit);

</script>

<h3>Add performance</h3>

{#if $formState.loading}
  <Loading />
{:else if $formState.error}
  <h3>Error submitting form</h3>
{:else}
  
  {#if $formState.submitted}
    <h3>Successfully submitted</h3>
  {/if}

  <div class="form_container">
    <form on:submit|preventDefault={handleSubmit}>
      <Input 
        id='title' 
        bind:value={$form.title} 
        errors={$errors}
      />
      <Input 
        id='description' 
        bind:value={$form.description} 
        errors={$errors}
      />
      <Select 
        id='repertoire_id' 
        label='Repertoire' 
        bind:value={$form.repertoire_id} 
        placeholder='Select repertoire'
        errors={$errors}
        optKey='title'
        options={repertoireData}
        optGroups={true}
        optGroupID='composer_id'
        optGroupLabel='surname'
        insertModal={InsertRepertoire}
        deleteModal={DeleteRepertoire}
        on:updated={onRepertoireUpdated}
      />
      <Select 
        id='company_id' 
        label='Company'
        bind:value={$form.company_id} 
        optKey='name'
        options={companyData}
        placeholder='Select company'
        errors={$errors}
        insertModal={InsertCompany}
        deleteModal={DeleteCompany}
        on:updated={onCompanyUpdated}
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
      <Input 
        id='booking_url'
        label='Booking url'
        bind:value={$form.booking_url} 
        errors={$errors}
      />
      <button type='submit'>
        Submit
      </button>
    </form>
  </div>
{/if}
