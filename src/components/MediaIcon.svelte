<script>

  export let svg;
  export let href;
  export let viewBox;

</script>

<a target="_blank" {href}>
  <div class="media_button">
    <svg xmlns="http://www.w3.org/2000/svg" {viewBox}>
      {@html svg}
    </svg>
  </div>
</a>

<style>

  .media_button {
    width: 100px;
    height: auto;
  }

  @media (max-width: 350px)  {
    .media_button {
      width: 70px;
    }
  }

  /* extra small device up to 414.98px */

  @media (min-width: 350.98px) and (max-width: 414.98px)  {
    .media_button {
      width: 80px;
    }
  }  

  /* extra small device 414.98 to 575.98px*/

  @media (min-width: 414.98px) and (max-width: 575.98px)  {
    .media_button {
      width: 90px;
    }
  }  

</style>
