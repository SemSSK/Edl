<script lang="ts">
  import { onMount } from "svelte";
  import { type Session } from "../../../libjs/model/Session";
  import { convertTimeToDate } from "../../../libjs/core";
  import Icon from "@iconify/svelte";
  import { navigate } from "svelte-navigator";
  import {
    check_if_correction_ended,
    end_session,
    get_results,
    get_sessions,
  } from "../../../libjs/apis/cfd/affectRoles";
  let sessions: Session[] = [];
  let correction_ended: boolean[] = [];
  onMount(async () => {
    await get_sessions(
      (s) => (sessions = s.reverse()),
      () => console.log("failure")
    );
    correction_ended = await Promise.all(
      sessions.map(async (s) => {
        let ended = false;
        await check_if_correction_ended(
          (r) => (ended = r),
          () => console.log("fail"),
          s.id!
        );
        return ended;
      })
    );
  });

  const endSession = async (i: number, session: Session) => {
    if (session.id) {
      await end_session(
        () => {
          navigate("/cfd");
        },
        () => console.log("fail"),
        session.id
      );
    }
  };
</script>

<div class="w-full grid grid-flow-row grid-cols-3 gap-5">
  {#each sessions as session, i}
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
          on:click={() => navigate(`session/affecting-monitors/${session.id}`)}
        >
          <Icon icon="mdi:eye" />
        </button>
        {#if !correction_ended[i]}
          <button
            class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500 transform active:scale-75 transition-transform"
            on:click={() =>
              navigate(`session/affecting-correctors/${session.id}`)}
          >
            <Icon icon="mdi:teacher" />
          </button>
        {:else}
          <button
            class="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500 transform active:scale-75 transition-transform"
            on:click={async () => await endSession(i, session)}
          >
            <Icon icon="carbon:result-draft" />
          </button>
        {/if}
      </div>
    </div>
  {/each}
</div>
