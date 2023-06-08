<script lang="ts">
  import { onMount } from "svelte";
  import { type Session } from "../../../libjs/model/Session";
  import { convertTimeToDate } from "../../../libjs/core";
  import Icon from "@iconify/svelte";
  import {
    get_cfd,
    get_sessions,
  } from "../../../libjs/apis/vice_doyen/session";
  import type { User } from "../../../libjs/model/User";
  import { navigate } from "svelte-navigator";
  let sessions: Session[] = [];
  let cfd: User;
  onMount(() => {
    get_sessions(
      (s) => {
        sessions = s.reverse();
      },
      () => {
        console.error("failure");
      }
    );
    get_cfd(
      (u) => {
        cfd = u;
      },
      () => {
        console.error("failure");
      }
    );
  });
</script>

{#if cfd}
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
        <p class="font-normal text-gray-700 dark:text-gray-400">
          managed by : {cfd.email}
        </p>
        <div
          class="mt-5 w-full text-right gird grid-flow-col grid-cols-2 space-x-3"
        >
          <button
            class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 transform active:scale-75 transition-transform"
            on:click={() => navigate(`session/${session.id}`)}
          >
            <Icon icon="material-symbols:key" rotate={1} />
          </button>
          <button
            class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500 transform active:scale-75 transition-transform"
            on:click={() => navigate("session/create")}
          >
            <Icon icon="mdi:garbage" />
          </button>
        </div>
      </div>
    {/each}
  </div>
{/if}
