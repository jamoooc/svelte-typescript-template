<script> 

  // use a regex or something to transform entered dates?
  // import Form from '../../form/Form.svelte';
  // import onSubmit from "../../../utils/onSubmit.js"
  // import fetchData from '../../../utils/fetchData.js';
  // import fetchOptions from '../../../utils/fetchOptions.js';
  // import Loading from '../../Loading.svelte';
  // import { hostname } from '../../../utils/hostname.js';
  // import { onMount } from 'svelte';
  // import schema from './validators/insertPerformanceDateValidator.js';
  // import { insertPerformanceDateFields } from './form_fields/insertPerformanceDateFields.js';
  // import { loading, performanceList, csrfToken } from '../../stores.js';
  
  // const headers = {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json",
  //   "csrf_token": $csrfToken
  // };
  // let path = `${__myapp.env.INSERT_PERFORMANCE_DATE}`;
  // let refreshPath = `${__myapp.env.GET_PERFORMANCE_LIST}`;
  // let method = 'POST';

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

  // $: console.log($performanceList)

</script>

<h3>Add performance</h3>

<!-- <h4>Already scheduled: </h4> -->

<!-- {#if $performanceList.length} -->
  <!-- {#if $loading}
    <Loading />
  {:else}
    <Form
      {onSubmit}
      fields={ insertPerformanceDateFields }
      options={ [ $performanceList ] }
      optGroups={ [ $performanceList ] }
      {path}
      {method}
      validator={schema}
      {refreshPath}
      store={performanceList}
    />
  {/if} -->
<!-- {/if} -->
