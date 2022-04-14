<script> 

  // import Form from '../../form/Form.svelte';
  // import onSubmit from '../../../utils/onSubmit.js'
  // import fetchData from '../../../utils/fetchData.js';
  // import fetchOptions from '../../../utils/fetchOptions.js';
  // import Loading from '../../Loading.svelte';
  // import { hostname } from '../../../utils/hostname.js';
  // import { updateBiographyFields } from './form_fields/updateBiographyFields.js';
  // import schema from './validators/updateBiographyValidator.js';
  // import { loading, biography, csrfToken } from '../../stores.js';
  // import { onMount } from 'svelte';

  // const headers = {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json",
  //   "csrf_token": $csrfToken
  // };
  // let path = `${__myapp.env.INSERT_BIOGRAPHY}`;
  // let refreshPath = `${__myapp.env.GET_BIOGRAPHY}`;
  // let method = 'POST';

  // onMount(() => {
  //   try {
  //     if (!$biography.length) {
  //       fetchData(
  //         hostname, 
  //         __myapp.env.GET_BIOGRAPHY,
  //         fetchOptions('GET', null, headers), 
  //         biography
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // })

  // $: console.log('updateBiography', $biography)

</script>

<h3>Update biography</h3>

<!-- {#if $biography} -->
  <!-- {#if $loading}
    <Loading />
  {:else}
    <Form
      {onSubmit}
      fields={ updateBiographyFields }
      options={ [ ] }
      optGroups={ [ [] ] }
      {path}
      {method}
      validator={schema}
      {refreshPath}
      store={biography}
      populate={$biography}
    />
  {/if} -->
<!-- {/if} -->
