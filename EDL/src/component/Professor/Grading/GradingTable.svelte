<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import {
    add_mark,
    get_corrections,
  } from "../../../libjs/apis/professor/main";
  import type { correctionDisplay } from "../../../libjs/model/Result";
  import { navigate } from "svelte-navigator";
  let headers: string[] = ["Encoding", "Module", "Note"];
  export let session_id: number;
  let results: correctionDisplay[] = [];
  onMount(async () => {
    await get_corrections(
      (c) => (results = c),
      () => console.error("fail"),
      +session_id
    );
  });

  const submit = async () => {
    results.forEach(async (r) => {
      if (r.result.note_1) {
        await add_mark(
          () => {},
          () => console.log("failure"),
          {
            applicant_id: r.result.applicant_id,
            module_id: r.result.module_id,
            note: r.result.note_1,
            session_id: r.result.session_id,
          }
        );
      } else if (r.result.note_2) {
        await add_mark(
          () => {},
          () => console.log("failure"),
          {
            applicant_id: r.result.applicant_id,
            module_id: r.result.module_id,
            note: r.result.note_2,
            session_id: r.result.session_id,
          }
        );
      } else if (r.result.note_3) {
        await add_mark(
          () => {},
          () => console.log("failure"),
          {
            applicant_id: r.result.applicant_id,
            module_id: r.result.module_id,
            note: r.result.note_3,
            session_id: r.result.session_id,
          }
        );
      }
    });
    navigate("/professor/grading");
  };
</script>

<div class="w-full h-full">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        {#each headers as h}
          <th class="px-6 py-3 text-center">
            {h}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each results as r}
        <tr
          class="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td class="px-6 py-4">
            {r.encoding}
          </td>
          <td class="px-6 py-4">
            {r.result.module_id}
          </td>
          <td class="px-6 py-4">
            {#if r.result.note_1}
              <input
                type="number"
                min="0"
                max="20"
                placeholder="Grade"
                class="p-1 rounded-lg text-black bg-white dark:text-white dark:bg-gray-600"
                bind:value={r.result.note_1}
              />
            {:else if r.result.note_2}
              <input
                type="number"
                min="0"
                max="20"
                placeholder="Grade"
                class="p-1 rounded-lg text-black bg-white dark:text-white dark:bg-gray-600"
                bind:value={r.result.note_2}
              />
            {:else}
              <input
                type="number"
                min="0"
                max="20"
                placeholder="Grade"
                class="p-1 rounded-lg text-black bg-white dark:text-white dark:bg-gray-600"
                bind:value={r.result.note_3}
              />
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="p-5 text-right">
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      on:click={submit}
    >
      Submit
    </button>
  </div>
</div>
