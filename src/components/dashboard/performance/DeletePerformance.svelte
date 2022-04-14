<script> 

  // import Form from '../../form/Form.svelte';
  // import fetchData from '../../../utils/fetchData.js';
  // import fetchOptions from '../../../utils/fetchOptions.js';
  // import onSubmit from "../../../utils/onSubmit.js"
  // import Loading from '../../Loading.svelte';
  // import { hostname } from '../../../utils/hostname.js';
  // import { deletePerformanceFields } from './form_fields/deletePerformanceFields.js';
  // import schema from './validators/deletePerformanceValidator.js';
  // import { onMount } from 'svelte';
  // import { loading, performanceList, csrfToken } from '../../stores.js';

  // const headers = {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json",
  //   "csrf_token": $csrfToken
  // };
  // let path = `${__myapp.env.DELETE_PERFORMANCE}`;
  // let refreshPath = `${__myapp.env.GET_PERFORMANCE_LIST}`;
  // let method = 'DELETE';
  
  // onMount(() => {
  //   try {
  //     if (!$performanceList.length) {
  //       fetchData(
  //         hostname, 
  //         __myapp.env.GET_PERFORMANCE_LIST, 
  //         fetchOptions('GET', null, headers), 
  //         performanceList
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // })

</script>

<h3>Delete performance</h3>

<!-- {#if $performanceList.length} -->
  <!-- {#if $loading}
    <Loading />
  {:else}
    <Form
      {onSubmit}
      fields={ deletePerformanceFields }
      options={ [ $performanceList ] }
      optGroups={ [ [] ] }
      {path}
      {method}
      validator={schema}
      {refreshPath}
      store={performanceList}
    />
  {/if} -->
<!-- {/if} -->
