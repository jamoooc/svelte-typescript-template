<script lang="ts"> 

  import Input from '../../forms/Input.svelte';
  import Select from '../../forms/Select.svelte';
  import Checkbox from '../../forms/Checkbox.svelte';
  import Loading from '../../Loading.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import { createForm } from '../../forms/form';
  import { mixed, object, number, boolean, string, SchemaOf } from 'yup';
  import { onMount } from 'svelte';
  import { csrfToken } from '../../stores';
  import type { RepertoireItem } from '../../../utils/types';

  interface UpdateRepertoireItem extends Omit<RepertoireItem, "composer_id"> {};

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  let repertoireItem: UpdateRepertoireItem[] = [];

  onMount(getRepertoireList);

  async function getRepertoireList() {
    await fetchData<UpdateRepertoireItem[]>(`${process.env.GET_REPERTOIRE_LIST}`)
      .then(data => repertoireItem = data)
      .catch(e => console.error(e));
  }

  async function getRepertoireItem(id: number) {
    await fetchData<RepertoireItem>(`${process.env.GET_REPERTOIRE_ITEM}/${id}`)
      .then(rep => $form = Object.assign($form, rep))
      .catch(e => console.error(e));
  }

  async function onUpdated() {
    await getRepertoireList();
  }

  async function onSelected(event) {
    const ID = event.detail.value;
    if (!ID) return;
    await getRepertoireItem(ID);
  }

  async function onSubmit(formData: UpdateRepertoireItem) {
    try {
      const res = await fetch(
        `${hostname}${process.env.UPDATE_REPERTOIRE}`, 
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

  const repertoireTypes = [
    {
      id: 'concert',
      type: 'Concert'
    },
    {
      id: 'opera',
      type: 'Opera'
    }
  ]

  const formFields: UpdateRepertoireItem = {
    id: 0, // IDs start at 1
    title: '',
    role: null,
    type: '',
    rep_list: false
  }

  const validationSchema: SchemaOf<UpdateRepertoireItem> = object({
    id: number().positive('composer is a required field').required(),
    title: string().min(2).max(128).required(),
    role: string().min(2).max(128).nullable().notRequired(),
    type: mixed().oneOf(['concert', 'opera'], 'type is a required field').required(),
    rep_list: boolean().required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<UpdateRepertoireItem>(formFields, validationSchema, onSubmit);

</script>

<h2>Update Repertoire</h2>

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
        options={repertoireItem}
        optGroups={true}
        optKey='title'
        optGroupID='composer_id'
        optGroupLabel='full_name'
        placeholder='Select repertoire'
        label='Repertoire'
        errors={$errors}
        on:updated={onUpdated}
        on:selected={onSelected}
      />
      <Input 
        id='title' 
        bind:value={$form.title} 
        errors={$errors}
      />
      <Input 
        id='role' 
        label='Role (not required)'
        bind:value={$form.role} 
        errors={$errors}
      />
      <Select 
        id='type' 
        bind:value={$form.type} 
        optKey='type'
        options={repertoireTypes}
        placeholder='Select type'
        errors={$errors}
      />
      <Checkbox 
        id='rep_list'
        label='Repertoire list'
        bind:checked={$form.rep_list}
      />
      <button type='submit'>
        Submit
      </button>
    </form>
  </div>
{/if}
