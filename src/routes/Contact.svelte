<script lang='ts'>

  import Loading from '../components/Loading.svelte';
  import TextArea from '../components/forms/TextArea.svelte';
  import Input from '../components/forms/Input.svelte';
  import hostname from '../utils/hostname';
  import fetchOptions from '../utils/fetchOptions';
  import { contact } from '../utils/data';
  import { createForm } from '../components/forms/form';
  import { object, string, SchemaOf } from 'yup';
  import type { ContactForm } from '../utils/types';

  const formFields = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  async function onSubmit(formData: ContactForm) {
    try {
      const res = await fetch(
        `${hostname}${process.env.SUBMIT_FORM}`, 
        fetchOptions(formData, 'POST')
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

  const validationSchema: SchemaOf<ContactForm> = object({
    name: string().min(2).max(32).required(),
    email: string().email().required(),
    subject: string().min(2).max(128).required(),
    message: string().min(12).max(4096).required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<ContactForm>(formFields, validationSchema, onSubmit);

</script>

<div class='content_container'>
  <h1>Contact</h1>
  <p>
    For all enquiries, please
    <span>
      <a href={`mailto:${contact.email}`}>email</a>
    </span> 
    me or complete the form below.
  </p>
  <address>
    <p class='email'>{contact.email}</p>
  </address>

  {#if $formState.loading}
    <Loading />
  {:else if $formState.submitted}
    <h2>
      Form submitted
    </h2>
    <p>
      Thank you, I'll be in touch as soon as possible.
    </p>
  {:else if $formState.error}
    <h2>
      Error submitting form
    </h2>
    <p>
      The error has been logged. Please email directly.
    </p>
  {:else}
    <div class="form_container">
      <form on:submit={handleSubmit}>
        <Input 
          id='name' 
          bind:value={$form.name} 
          errors={$errors}
        />
        <Input 
          id='email' 
          bind:value={$form.email} 
          errors={$errors}
        />
        <Input 
          id='subject' 
          bind:value={$form.subject} 
          errors={$errors}
        />
        <TextArea 
          id='message' 
          bind:value={$form.message} 
          errors={$errors}
        />
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  {/if}
</div>

<style>

  a {
    color: rgb(0,100,200);
    text-decoration: none;
  }

  address {
    margin: 0 0 0 0;
    padding: 0;
  }

  button {
    float: right;
    width: 150px;
    border-radius: 5px;
  }

  .email {
    padding: 1rem 0 1rem 3rem;
  }

  .form_container {
    width: 100%;
  }

  @media(min-width: 825px) {
    .form_container {
      width: 80%;
    }
  }

</style>
