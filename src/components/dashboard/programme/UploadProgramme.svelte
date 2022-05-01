<script lang="ts"> 

  import File from '../../forms/File.svelte';
  import Loading from '../../Loading.svelte';
  import hostname from '../../../utils/hostname';
  import fetchData from "../../../utils/fetchData";
  import { createForm } from '../../forms/form';
  import { mixed, object, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';
  import { onMount } from 'svelte';

  interface ProgrammeUpload {
    files: any; // TODO: FileList|null - find correct validator for FileList type
  }

  interface ProgrammeData {
    programmes: string[];
  }

  const headers = {
    "csrf_token": $csrfToken
  };

  let programmeList: ProgrammeData[] = [];
  async function getProgrammeList() {
    await fetchData<ProgrammeData[]>(`${process.env.GET_PROGRAMME_LIST}`, { headers })
      .then(data => programmeList = data)
      .catch(e => console.error(e));
  }

  onMount(getProgrammeList);

  async function onSubmit(formData: ProgrammeUpload) {

    const body = new FormData();
    body.append("programme", formData.files.item(0));

    try {
      const res = await fetch(
        `${hostname}${process.env.UPLOAD_PROGRAMME}`, 
        { body, method: 'POST', headers }
      );
      await res.json();
      if (!res.ok) {
        throw new Error('Error submitting form');
      }
      $formState.submitted = true;
      getProgrammeList();
    } catch (e) {
      console.error(e);
      $formState.error = true;
    }
  }

  const formFields: ProgrammeUpload = {
    files: null
  }

  const validationSchema: SchemaOf<ProgrammeUpload> = object({
    files: mixed().required('File is required')
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<ProgrammeUpload>(formFields, validationSchema, onSubmit);

</script>

<h2>
  Upload concert programme
</h2>

{#if $formState.loading}
  <Loading />
{:else}
  
  {#if programmeList}
    <h3>
      Available programmes
    </h3>
    <ul>
      {#each programmeList as programme}
        <li>
          <p>
            {programme}
          </p>
        </li>
      {/each}
    </ul>
  {/if}

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
    <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
      <File 
        id='files' 
        bind:files={$form.files} 
        placeholder='Select gallery image'
        errors={$errors}
        accept="application/pdf"
      />
      <div class="button_container">
        <button type='submit'>
          Submit
        </button>
      </div>
    </form>
  </div>
{/if}