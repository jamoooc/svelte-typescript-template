<script> 

  // import Form from '../../form/Form.svelte';
  // import onSubmit from "../../../utils/onSubmit.js"
  // import fetchData from '../../../utils/fetchData.js';
  // import fetchOptions from '../../../utils/fetchOptions.js';
  // import Loading from '../../Loading.svelte';
  // import { hostname } from '../../../utils/hostname.js';
  // import { onMount } from 'svelte';
  // import schema from './validators/updatePerformanceValidators.js';
  // import { updatePerformanceFields } from './form_fields/updatePerformanceFields.js';
  // import { 
  //   loading,
  //   repertoireList, 
  //   companyList,
  //   locationList,
  //   performanceList, 
  //   csrfToken } from '../../stores.js';

  // const headers = {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json",
  //   "csrf_token": $csrfToken
  // };

  // let path = `${__myapp.env.UPDATE_PERFORMANCE}`;
  // let refreshPath = `${__myapp.env.GET_PERFORMANCE_LIST}`;
  // let method = 'PUT';
  
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
  //     if (!$repertoireList.length) {
  //       fetchData(
  //         hostname, 
  //         __myapp.env.GET_REPERTOIRE_LIST,           
  //         fetchOptions('GET', null, headers), 
  //         repertoireList
  //       );
  //     }
  //     if (!$companyList.length) {
  //       fetchData(
  //         hostname, 
  //         __myapp.env.GET_COMPANY_LIST,           
  //         fetchOptions('GET', null, headers), 
  //         companyList
  //       );
  //     }
  //     if (!$locationList.length) {
  //       fetchData(
  //         hostname, 
  //         __myapp.env.GET_LOCATION_LIST,           
  //         fetchOptions('GET', null, headers), 
  //         locationList
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // })

  // $: console.log('UpdatePerformance', $performanceList, $repertoireList, $companyList, $locationList)

</script>

<h3>Update performance</h3>

<!-- {#if $performanceList.length} -->
  <!-- {#if $loading}
    <Loading />
  {:else}
    <Form
      {onSubmit}
      fields={ updatePerformanceFields }
      options={ [ $performanceList, $repertoireList, $companyList, $locationList ] }
      optGroups={ [ $performanceList, $repertoireList, $companyList, $locationList ] }
      {path}
      {method}
      validator={schema}
      {refreshPath}
      store={performanceList}
    />
  {/if} -->
<!-- {/if} -->
