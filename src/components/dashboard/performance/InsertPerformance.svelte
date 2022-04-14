<script> 

  // import Form from '../../form/Form.svelte';
  // import onSubmit from "../../../utils/onSubmit.js"
  // import fetchData from '../../../utils/fetchData.js';
  // import fetchOptions from '../../../utils/fetchOptions.js';
  // import Loading from '../../Loading.svelte';
  // import { hostname } from '../../../utils/hostname.js';
  // import { onMount } from 'svelte';
  // import schema from './validators/insertPerformanceValidator.js';
  // import { insertPerformanceFields } from './form_fields/insertPerformanceFields.js';
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
  // let path = `${__myapp.env.INSERT_PERFORMANCE}`;
  // let refreshPath = `${__myapp.env.GET_PERFORMANCE_LIST}`;
  // let method = 'POST';
  
  // onMount(async () => {
  //   try {
  //     if (!$repertoireList.length) {
  //       console.log('rep list')
  //       await fetchData(
  //         hostname, 
  //         __myapp.env.GET_REPERTOIRE_LIST, 
  //         fetchOptions('GET', null, headers), 
  //         repertoireList
  //       );
  //     }
  //     if (!$companyList.length) {
  //       console.log('company list')
  //       await fetchData(
  //         hostname, 
  //         __myapp.env.GET_COMPANY_LIST, 
  //         fetchOptions('GET', null, headers), 
  //         companyList
  //       );
  //     }
  //     if (!$locationList.length) {
  //       console.log('locations list')
  //       await fetchData(
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

  // $: console.log('insertPerformance', $repertoireList, $companyList, $locationList)

</script>

<h3>Insert performance</h3>

<!-- {#if $repertoireList.length && $companyList.length, $locationList.length} -->
  <!-- {#if $loading}
    <Loading />
  {:else}
    <Form
      {onSubmit}
      fields={ insertPerformanceFields }
      options={ [ $repertoireList, $companyList, $locationList ] }
      optGroups={ [ $repertoireList, [], [] ] }
      {path}
      {method}
      validator={schema}
      {refreshPath}
      store={performanceList}
    />
  {/if} -->
<!-- {/if} -->
