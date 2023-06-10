<script lang="ts">
  import { onMount } from "svelte";
  import type { ClassmentEntry } from "../../../libjs/model/ClassmentEntry";
  import { get_classment } from "../../../libjs/apis/cfd/affectRoles";
  export let session_id: number;
  let results: ClassmentEntry[] = [];
  onMount(async () => {
    await get_classment(
      (rs) => (results = rs),
      () => console.log("failure"),
      +session_id
    );
  });
</script>

<div class="m-5 w-full grid grid-flow-row grid-cols-4">
  <div class="text-center p-2 bg-gray-600 text-white">Name</div>
  <div class="text-center p-2 bg-gray-600 text-white">Email</div>
  <div class="text-center p-2 bg-gray-600 text-white">Average</div>
  <div class="text-center p-2 bg-gray-600 text-white mr-10">Classement</div>
  {#each results as r, i}
    <div
      class="text-center p-2 dark:bg-gray-800 dark:text-white"
      class:bg-green-400={i < 3}
      class:dark:bg-green-700={i < 3}
    >
      {r.name}
    </div>
    <div
      class="text-center p-2 dark:bg-gray-800 dark:text-white"
      class:bg-green-400={i < 3}
      class:dark:bg-green-700={i < 3}
    >
      {r.email}
    </div>
    <div
      class="text-center p-2 dark:bg-gray-800 dark:text-white"
      class:bg-green-400={i < 3}
      class:dark:bg-green-700={i < 3}
    >
      {r.avg}
    </div>
    <div
      class="text-center p-2 dark:bg-gray-800 dark:text-white mr-10"
      class:bg-green-400={i < 3}
      class:dark:bg-green-700={i < 3}
    >
      {r.classment}
    </div>
  {/each}
</div>
