<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { navigate } from "svelte-navigator";
  import { get_sessions } from "../../libjs/apis/professor/main";
  import type { Session } from "../../libjs/model/Session";
  import { convertTimeToDate } from "../../libjs/core";
  let sessions: Session[] = [];
  onMount(async () => {
    await get_sessions(
      (s) => (sessions = s.reverse()),
      () => console.log("failure")
    );
  });
</script>

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
    </div>
  {/each}
</div>
