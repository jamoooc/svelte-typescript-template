<script> 

  // import Form from '../../form/Form.svelte';
  // import fetchData from '../../../utils/fetchData.js';
  // import fetchOptions from '../../../utils/fetchOptions.js';
  // import onSubmit from "../../../utils/onSubmit.js"
  // import Loading from '../../Loading.svelte';
  // import { hostname } from '../../../utils/hostname.js';
  // import { deletePerformanceDateFields } from './form_fields/deletePerformanceDateFields.js';
  // import schema from './validators/deletePerformanceDateValidator.js';
  // import { onMount } from 'svelte';
  // import { 
  //   loading, 
  //   performanceDateList, csrfToken } from '../../stores.js';
  
  // const headers = {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json",
  //   "csrf_token": $csrfToken
  // };
  // let path = `${__myapp.env.DELETE_PERFORMANCE_DATE}`;
  // let refreshPath = `${__myapp.env.GET_PERFORMANCE_DATE_LIST}`;
  // let method = 'DELETE';
  
  // onMount(() => {
  //   try {
  //     if (!$performanceDateList.length) {
  //       fetchData(
  //         hostname, 
  //         __myapp.env.GET_PERFORMANCE_DATE_LIST, 
  //         fetchOptions('GET', null, headers), 
  //         performanceDateList
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // })

  // console.log($performanceDateList)

</script>

<h3>Delete performance date</h3>

<!-- {#if $performanceDateList.length} -->
  <!-- {#if $loading}
    <Loading />
  {:else}
    <Form
      {onSubmit}
      fields={ deletePerformanceDateFields }
      options={ [ $performanceDateList ] }
      optGroups={ [ [] ] }
      {path}
      {method}
      validator={schema}
      {refreshPath}
      store={performanceDateList}
    />
  {/if} -->
<!-- {/if} -->
