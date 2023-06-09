<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from "../../../libjs/model/User";
  import Icon from "@iconify/svelte";
  import {
    add_monitor,
    delete_monitor,
    get_affected_monitors,
    get_possible_monitors,
  } from "../../../libjs/apis/cfd/affectRoles";

  export let session_id: number;

  let affected_monitors: User[] = [];
  let possible_monitors: User[] = [];

  onMount(async () => {
    await get_affected_monitors(
      (m) => (affected_monitors = m),
      () => console.error("failure"),
      session_id
    );
    await get_possible_monitors(
      (m) => {
        possible_monitors = m;
      },
      () => console.error("failure"),
      session_id
    );
  });

  const onAddMonitor = async (monitor: User) => {
    await add_monitor(
      () => {
        (affected_monitors = [...affected_monitors, monitor]),
          (possible_monitors = possible_monitors.filter(
            (m) => m.id !== monitor.id
          ));
      },
      () => console.error("failure"),
      {
        professor_id: monitor.id!,
        session_id: +session_id,
      }
    );
  };

  const ondeleteMonitor = async (monitor: User) => {
    await delete_monitor(
      () => {
        (possible_monitors = [...possible_monitors, monitor]),
          (affected_monitors = affected_monitors.filter(
            (m) => m.id !== monitor.id
          ));
      },
      () => console.log("failure"),
      {
        professor_id: monitor.id!,
        session_id: +session_id,
      }
    );
  };
</script>

<div class="w-full grid grid-flow-row grid-cols-2 space-x-5">
  <div class="space-y-5">
    {#each possible_monitors as m}
      <div
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Email: {m.email}
        </h5>
        <h5
          class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Specialty: {m.specialty}
        </h5>
        <div
          class="mt-5 w-full text-right gird grid-flow-col grid-cols-2 space-x-3"
        >
          <button
            class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 transform active:scale-75 transition-transform"
            on:click={async () => {
              await onAddMonitor(m);
            }}
          >
            <Icon icon="mdi:eye" />
          </button>
        </div>
      </div>
    {/each}
  </div>
  <div class="space-y-5">
    {#each affected_monitors as m}
      <div
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Email: {m.email}
        </h5>
        <h5
          class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Specialty: {m.specialty}
        </h5>
        <div
          class="mt-5 w-full text-right gird grid-flow-col grid-cols-2 space-x-3"
        >
          <button
            class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500 transform active:scale-75 transition-transform"
            on:click={async () => {
              await ondeleteMonitor(m);
            }}
          >
            <Icon icon="ooui:eye-closed" />
          </button>
        </div>
      </div>
    {/each}
  </div>
  <div />
</div>
