<script lang="ts"> 

  import Input from '../../forms/Input.svelte';
  import File from '../../forms/File.svelte';
  import Checkbox from '../../forms/Checkbox.svelte';
  import Datetime from '../../forms/Datetime.svelte';
  import Loading from '../../Loading.svelte';
  import hostname from '../../../utils/hostname';
  import { createForm } from '../../forms/form';
  import { boolean, mixed, object, string, SchemaOf } from 'yup';
  import { csrfToken } from '../../stores';

  interface GalleryImageUpload {
    files: any; // TODO: FileList|null - find correct validator for FileList type
    description: string,
    date: string,
    profile: boolean;
  }

  const headers = {
    "csrf_token": $csrfToken
  };

  async function onSubmit(formData: GalleryImageUpload) {

    const body = new FormData();
    body.append("galleryImage", formData.files.item(0));
    body.append('description', formData.description);
    body.append('date', formData.date);
    body.append('profile', String(formData.profile));

    try {
      const res = await fetch(
        `${hostname}${process.env.INSERT_GALLERY_IMAGE}`, 
        { body, method: 'POST', headers }
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

  const formFields: GalleryImageUpload = {
    files: null,
    description: '',
    date: '',
    profile: false
  }

  const validationSchema: SchemaOf<GalleryImageUpload> = object({
    files: mixed().required('File is required'),
    description: string().min(2).max(128).required(),
    date: string().min(2).max(32).required(),
    profile: boolean().required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<GalleryImageUpload>(formFields, validationSchema, onSubmit);

</script>

<h2>
  Upload image
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
    <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
      <File 
        id='files' 
        bind:files={$form.files} 
        placeholder='Select gallery image'
        errors={$errors}
      />
      <Input 
        id='description' 
        bind:value={$form.description} 
        placeholder='Enter description'
        errors={$errors}
      />
      <Datetime 
        id='date' 
        bind:value={$form.date} 
        placeholder='Enter date'
        errors={$errors}
      />
      <Checkbox 
        id='profile' 
        bind:checked={$form.profile} 
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
