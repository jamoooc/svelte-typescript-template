<script>

  import Login from '../components/dashboard/Login.svelte';
  import Dashboard from '../components/dashboard/Dashboard.svelte';
  import { adminAuthenticated } from "../components/stores";

</script>

<div class="content_container">
  <h1>{!$adminAuthenticated ? 'Login' : 'Dashboard'}</h1>
  <!-- {#if !$adminAuthenticated} 
    <Login />
  {:else}
    <Dashboard /> -->
  <!-- {/if} -->
  <Dashboard />
</div>
