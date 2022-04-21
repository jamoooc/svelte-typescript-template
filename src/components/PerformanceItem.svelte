<script lang="ts">

  export let title: string | null;
  export let description: string | null;
  export let work_title: string | null;
  export let role: string | null;
  export let surname: string | null;
  export let datetimes: Array<string|null>;
  export let duplicate_times: Array<string|null>;
  export let location: string | null;
  export let company_name: string | null;
  export let company_url: string | null;
  export let booking_url: string | null;

  const dateOpts: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const dates = [];
  if (datetimes.length === duplicate_times.length) {
    for (let i = 0; i < datetimes.length; i++) {
      const date = new Date(datetimes[i]);
      if (date.toString() !== "Invalid Date") {
        const dateStr = date.toLocaleDateString("en-GB", dateOpts);
        const dupTime = duplicate_times[i] ? ` + ${duplicate_times[i].substring(0,5)}` : '';
        dates.push(`${dateStr}${dupTime}`);
      } else {
        dates.push(null);
      }
    }
  }

</script>

<div class="wrapper">
  <div class="left_col">
    {#if title}
      <h2>{title}</h2>  
      <h3>{work_title}</h3>
    {:else if work_title}
      <h2>{work_title}</h2>
    {/if}

    {#if company_name}
      <h3>
        <a class="link" href={company_url}>
          {company_name}
        </a>
      </h3>
    {/if}

    {#if surname}
      <h4>{surname}</h4>
    {/if}
  
    {#if role}
      <h4 class="role_text">{role}</h4>
    {/if}

    {#each dates as date}
      <p class="date_text">
        {date}
      </p>
    {:else} 
      <p class="missing_date">
        TBC
      </p>
    {/each}

    {#if description}
      <p class="description">{description}</p>
    {/if}

    {#if location}
      <p class="location">{location}</p>
    {/if}
  </div>
  <div class="right_col">
    {#if booking_url}
      <a class="button_container" href={booking_url}>
        <div class="button">
          <span class="info_text">tickets / info</span>
        </div>
      </a>
    {:else}
      <div class="no_booking">
        <p class="info_text">Coming soon...</p> 
      </div> 
    {/if} 
  </div>
</div>


<style>

  /* small screen  */

  @media (max-width: 575.98px)  {
    .wrapper { 
      display: block flow;
    }

    .button {
      margin: 1rem 0 1rem 0;
    }

    .left_col {
      margin-top: 1rem;
      border-top: 1px solid rgba(93, 93, 93, 0.3);
    }
  }  

  /* medium/large screen  */

  @media (min-width: 576px)  {
    .wrapper {
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 1fr;
    }

    .left_col {
      border-top: 1px solid rgba(93, 93, 93, 0.3);
    }

    .right_col {
      border-top: 1px solid rgba(93, 93, 93, 0.3);
    }
  }

  .description {
    padding: 0rem 0 0.2rem 1rem;
    font-weight: lighter;
    font-size: small;
  }

  .location {
    padding: 0.5rem 0 0.5rem 1rem;
    font-size: medium;
  }

  .button_container {
    position: relative;
    top: 35%;
    display: flex;
    justify-content: center;
  }

  .button {
    width: 125px;
    height: 40px;
    background-color: rgba(93, 93, 93, 0.2);
    border: solid 1px rgba(93, 93, 93, 0.1);
    border-radius: 0.2rem;
    box-shadow: 0 0 1px 1px rgba(151, 150, 150, 0.2);
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    justify-content: center;
  }

  .info_text {
    color: rgba(93, 93, 93, 0.8);
  }

  .date_text {
    font-size: 0.8rem;
    padding-left: 1rem;
    color: rgba(93, 93, 93, 0.8);
  }

  .role_text {
    font-size: 1rem;
    padding-bottom: 0.3rem;
    padding-left: 1rem;
    color: rgba(93, 93, 93, 0.8);
  }

  .missing_date {
    text-transform: uppercase;
    font-size: 0.9rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    color: rgba(93, 93, 93, 0.8);
  }

  .no_booking {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    position: relative;
    top: 45%; /* TODO calc() */
  }

  h2 {
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    margin: 0;
  }

  h3 {
    padding-bottom: 0.4rem;
    margin: 0;
    padding-left: 0.6rem;
  }

  h4 {
    padding-bottom: 0.1rem;
    margin: 0;
    padding-left: 1rem;
  }

  p {
    padding: 0;
    margin: 0;
  }

  a {
    padding: 0;
    margin: 0;
  }

</style>
