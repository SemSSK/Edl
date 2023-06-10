<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { navigate } from "svelte-navigator";
  import { getSessions } from "../../libjs/apis/applicant/consulterInfo";
  import type { Session } from "../../libjs/model/Session";
  import { convertTimeToDate } from "../../libjs/core";
  let sessions: Session[] = [];
  onMount(async () => {
    await getSessions(
      (s) => (sessions = s.reverse()),
      () => console.log("failure")
    );
  });
</script>

<div class="w-full text-left pb-5">
  <button
    class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 transform active:scale-75 transition-transform"
    on:click={() => navigate("session/create")}
  >
    <Icon icon="ic:baseline-add" />
  </button>
</div>
<div class="w-full grid grid-flow-row grid-cols-3 gap-5">
  {#each sessions as session}
    <div
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Starts at {convertTimeToDate(session.starting_time)}
      </h5>
      <h5
        class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white"
      >
        ends at : {convertTimeToDate(session.ending_time)}
      </h5>
      <div
        class="mt-5 w-full text-right gird grid-flow-col grid-cols-2 space-x-3"
      >
        <button
          class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 transform active:scale-75 transition-transform"
          on:click={() => navigate(`results/${session.id}`)}
        >
          <Icon icon="material-symbols:grade" />
        </button>
      </div>
    </div>
  {/each}
</div>
