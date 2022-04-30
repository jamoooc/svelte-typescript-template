<script lang="ts">

  import InsertRepertoire from "./repertoire/InsertRepertoire.svelte";
  import UpdateRepertoire from "./repertoire/UpdateRepertoire.svelte";
  import DeleteRepertoire from "./repertoire/DeleteRepertoire.svelte";
  import InsertPerformance from "./performance/InsertPerformance.svelte";
  import DeletePerformance from "./performance/DeletePerformance.svelte";
  import InsertPerformanceDate from "./performance/InsertPerformanceDate.svelte";
  import DeletePerformanceDate from "./performance/DeletePerformanceDate.svelte";
  import UpdateBiography from "./content/UpdateBiography.svelte";
  import InsertReview from "./content/InsertReview.svelte";
  import UpdateReview from "./content/UpdateReview.svelte";
  import DeleteReview from "./content/DeleteReview.svelte";
  import UploadImage from "./content/UploadImage.svelte";
  import UploadProgramme from "./programme/UploadProgramme.svelte";

  let tasks = {
    performances: { 
      add_performance: false,
      add_date: false,
      delete_performance: false,
      delete_date: false
    },
    repertoire: { 
      add_repertoire: false,
      update_repertoire: false,
      delete_repertoire: false
    },
    content: { 
      update_biography: false,
      add_review: false,
      update_review: false,
      delete_review: false,
      upload_image: false,
      upload_programme: false
    }
  }

  let options = {
    add_repertoire: InsertRepertoire,
    update_repertoire: UpdateRepertoire,
    delete_repertoire: DeleteRepertoire,
    add_performance: InsertPerformance,
    add_date: InsertPerformanceDate,
    delete_performance: DeletePerformance,
    delete_date: DeletePerformanceDate,
    update_biography: UpdateBiography,
    add_review: InsertReview,
    update_review: UpdateReview,
    delete_review: DeleteReview,
    upload_image: UploadImage,
    upload_programme: UploadProgramme
  }
  
  let selectedCategory = '';
  let selectedTask = '';

  let categories = [
    'performances',
    'repertoire',
    'content'
  ]

  function categorySelect(key: string) {
    selectedCategory = selectedCategory !== key ? key : '';
    taskSelect('');
  }

  function taskSelect(key: string) {
    selectedTask = selectedTask !== key ? key : '';
  }

  function splitStringOnValue(str: string, sep: string) {
    return str
      .split(sep)
      .map(e => e[0].toUpperCase() + e.substring(1,))
      .join(' ');
  }

</script>

<div>
  <nav>
    <ul class="tl_ul shadow">
      {#each categories as category}
        <li 
          class="tl_li"
          class:selected="{selectedCategory === category}"
          on:click={()=> categorySelect(category)}
        > 
          {splitStringOnValue(category, '_')}
        </li>
      {/each}
    </ul>
  </nav>

  {#if selectedCategory} 
    <nav class="nested_nav">
      <ul class="nested_ul">
        {#each Object.keys(tasks[selectedCategory]) as task}
          <li 
            class="nested_li"
            class:selected="{selectedTask === task}"
            on:click={()=> taskSelect(task)}
          > 
            {splitStringOnValue(task, '_')}
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</div>

<div class="container">
  {#if selectedTask}
    <svelte:component this={options[selectedTask]}/>
  {/if}
</div>

<style>

  .container {
    padding-top: 4em;
  }

	.selected {
		color: rgba(231, 89, 0, 0.5);
    transform:scale(1.03);
	}

  .nested_nav {
    padding-top: 2em;
  }

  .tl_ul {
    display: flex;
    float: left;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .tl_li {
    list-style: none;
    cursor: pointer;
    padding: 0.5em 1em 0.7em 0;
    margin: 0;
  }

  .nested_ul {
    display: flex;
    float: left;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .nested_li {
    list-style: none;
    cursor: pointer;
    padding: 0.7em 1em 0.7em 0;
    margin: 0;
  }

  li:hover {
    color: #ccc;
  }

  @media(min-width: 825px){
    .shadow {
      width: 100%;
      box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);
    }
  }


</style>
