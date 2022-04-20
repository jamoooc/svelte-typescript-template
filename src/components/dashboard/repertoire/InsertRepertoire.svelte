<script type="ts">

  import Input from '../../forms/Input.svelte';
  import Select from '../../forms/Select.svelte';
  import Checkbox from '../../forms/Checkbox.svelte';
  import Loading from '../../Loading.svelte';
  import fetchOptions from '../../../utils/fetchOptions';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import InsertComposer from '../repertoire/InsertComposer.svelte';
  import DeleteComposer from '../repertoire/DeleteComposer.svelte';
  import { createForm } from '../../forms/form';
  import { mixed, object, number, boolean, string, SchemaOf } from 'yup';
  import { onMount } from 'svelte';
  import { csrfToken } from '../../stores';
  import { createEventDispatcher } from 'svelte';
  import type { RepertoireItem, ComposerData } from '../../../utils/types';

  export let modalOpen: boolean; // when form component is displayed as a modal

  // pass the csrf token to fetchOptions and use Object.assign to the default headers?
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "csrf_token": $csrfToken
  };

  interface InsertRepertoire extends Omit<RepertoireItem, "id"> {};

  let composerData: ComposerData[] = [];

  async function getComposerList() {
    await fetchData<ComposerData[]>(`${process.env.GET_COMPOSER_LIST}`)
      .then(data => composerData = data)
      .catch(e => console.error(e));
  }

  async function onSubmit(formData: RepertoireItem) {
    try {
      const res = await fetch(
        `${hostname}${process.env.INSERT_REPERTOIRE}`, 
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

  // component may be a modal - notify parent to close modal and update 
  const dispatch = createEventDispatcher();
  function updateHandler() {
		dispatch('updated');
    modalOpen = false;
	}

  const onUpdated = () => {
    getComposerList();
  }

  onMount(getComposerList);

  // TODO: put these in the DB
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

  const formFields: InsertRepertoire = {
    composer_id: 0, // IDs start at 1
    title: '',
    role: null,
    type: '',
    rep_list: false
  }

  const validationSchema: SchemaOf<InsertRepertoire> = object({
    composer_id: number().positive('composer is a required field').required(),
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
  } = createForm<InsertRepertoire>(formFields, validationSchema, onSubmit);

</script>

<h2 class:modalOpen>
  Add repertoire
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
        id='composer_id' 
        bind:value={$form.composer_id} 
        optKey='full_name'
        options={composerData}
        placeholder='Select composer'
        label='Composer'
        errors={$errors}
        insertModal={InsertComposer}
        deleteModal={DeleteComposer}
        on:updated={onUpdated}
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