<script lang="ts">

  import Loading from '../Loading.svelte';
  import { 
    adminAuthenticated, 
    csrfToken } from "../../components/stores";
  import fetchOptions from '../../utils/fetchOptions';
  import Input from '../forms/Input.svelte';
  import hostname from '../../utils/hostname';
  import { createForm } from '../forms/form';
  import { object, string, SchemaOf } from 'yup';
  import type { LoginCredentials } from '../../utils/types';

  let loginFields: LoginCredentials = {
    username: '',
    password: ''
  }

  function getCookie(name: string) {
    const cookie = {};
    document.cookie.split(';').forEach(e => {
      const [k, v] = e.split('=');
      cookie[k.trim()] = v;
    })
    return cookie[name];
  }

  async function onSubmit(formData: LoginCredentials) {
    try {
      const res = await fetch(
      `${hostname}${process.env.ADMIN_LOGIN}`, 
        fetchOptions(formData, 'POST'));
      await res.json();
      if (!res.ok) {
        throw new Error('Error submitting login credentials'); 
      }
      adminAuthenticated.set(true);
      csrfToken.set(getCookie('csrf_token'));
    } catch (e) {
      if ($adminAuthenticated) {
        adminAuthenticated.set(false);
      }
      $formState.error = true;
    }
  }

  const validationSchema: SchemaOf<LoginCredentials> = object({
    username: string().min(2).max(32).required(),
    password: string().email().required()
  });

  const {
    form,
    errors,
    formState,
    handleSubmit
  } = createForm<LoginCredentials>(loginFields, validationSchema, onSubmit);


</script>

{#if $formState.loading}
  <Loading />
{:else if $formState.error}
  <h2>
    Authentication error
  </h2>
  <p>
    The error has been logged. Please try again.
  </p>
{:else}
  <div classname="form_container">
    <form on:submit={handleSubmit}>
      <Input 
        id='username' 
        bind:value={$form.username} 
        errors={$errors}
      />
      <Input 
        id='password' 
        bind:value={$form.password} 
        errors={$errors}
      />
    </form>
  </div>
{/if}
  
<style>

  h2 {
    margin-bottom: 4vh;
  }

</style>
