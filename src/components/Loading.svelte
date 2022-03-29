<div class="loading_container">
  <div class="loading"></div>
</div>

<style>

  .loading_container {
    position: fixed;
    left: calc(50vw - 25px);
    top: 40vh;
  }

  .loading {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(148, 148, 148, 0.3);
    border-radius: 50%;
    border-top-color: rgb(93, 93, 93);
    animation: loading 1s ease-in-out infinite;
    -webkit-animation: loading 1s ease-in-out infinite;
  }

  @keyframes loading {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loading {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

</style>
