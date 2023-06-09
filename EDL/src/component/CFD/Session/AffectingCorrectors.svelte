<script lang="ts">
  import { onMount } from "svelte";
  import type { Module } from "../../../libjs/model/Module";
  import type { User } from "../../../libjs/model/User";
  import {
    create_result,
    get_applicants,
    get_modules,
    get_possible_correctors,
  } from "../../../libjs/apis/cfd/affectRoles";
  import type { Result } from "../../../libjs/model/Result";
  import { navigate } from "svelte-navigator";
  type Corrector_nb_copies = {
    corrector: User;
    nbcopies1: number;
    nbcopies2: number;
    nbcopies3: number;
  };
  type Copy = {
    applicant: User;
    module: Module;
  };
  let promise = false;
  export let session_id: number;
  let applicants: User[];
  let modules: Module[];
  let possible_correctors: Corrector_nb_copies[];
  let copies: Copy[];
  let copies_left: number[] = [0, 0, 0];
  onMount(async () => {
    await get_applicants(
      (u) => (applicants = u),
      () => alert("failure"),
      session_id
    );
    await get_modules(
      (m) => (modules = m),
      () => alert("failure"),
      session_id
    );
    copies = modules.flatMap((m) =>
      applicants.map((a) => {
        return {
          applicant: a,
          module: m,
        };
      })
    );
    await get_possible_correctors(
      (u) =>
        (possible_correctors = u.map((c) => {
          return {
            corrector: c,
            nbcopies1: 0,
            nbcopies2: 0,
            nbcopies3: 0,
          };
        })),
      () => alert("failure"),
      session_id
    );
    copies_left = [copies.length, copies.length, copies.length];
    promise = true;
  });
  const updateCopiesLeft = () => {
    let copies_taken = [copies.length, copies.length, copies.length];
    for (let i = 0; i < possible_correctors.length; i++) {
      let c = possible_correctors[i];
      copies_taken = [
        copies_taken[0] - c.nbcopies1,
        copies_taken[1] - c.nbcopies2,
        copies_taken[2] - c.nbcopies3,
      ];
    }
    copies_left = copies_taken;
  };
  const get_results = (): Result[] => {
    let correctors = possible_correctors;
    return copies.map((c) => {
      let corrector_1_id = 0;
      let corrector_2_id = 0;
      let corrector_3_id = 0;
      for (let i = 0; i < correctors.length; i++) {
        let corr = correctors[i];
        if (corr.nbcopies1 !== 0) {
          corrector_1_id = corr.corrector.id!;
          correctors[i].nbcopies1 -= 1;
          break;
        }
      }
      for (let i = 0; i < correctors.length; i++) {
        let corr = correctors[i];
        if (corr.nbcopies2 !== 0 && corr.corrector.id !== corrector_1_id) {
          corrector_2_id = corr.corrector.id!;
          correctors[i].nbcopies2 -= 1;
          break;
        }
      }
      for (let i = 0; i < correctors.length; i++) {
        let corr = correctors[i];
        if (
          corr.nbcopies3 !== 0 &&
          corr.corrector.id !== corrector_2_id &&
          corr.corrector.id !== corrector_1_id
        ) {
          corrector_3_id = corr.corrector.id!;
          correctors[i].nbcopies3 -= 1;
          break;
        }
      }
      return {
        applicant_id: c.applicant.id!,
        module_id: c.module.code,
        session_id: c.module.session_id!,
        corrector_1_id: corrector_1_id,
        corrector_2_id: corrector_2_id,
        corrector_3_id: corrector_3_id,
        display_to_applicant: undefined,
        display_to_cfd: undefined,
        note_1: undefined,
        note_2: undefined,
        note_: undefined,
      };
    });
  };
  const submit = async () => {
    if (copies_left.reduce((p, c) => p + c) !== 0) {
      alert("Cannot submit");
    } else {
      let current_copies = copies;
      let results;
      // console.log(get_results());
      get_results().forEach(
        async (r) =>
          await create_result(
            () => navigate("/cfd/session"),
            () => alert("failure"),
            r
          )
      );
    }
  };
</script>

{#if promise}
  <div
    class="w-full block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="grid pb-2 grid-flow-col grid-cols-3">
      {#each copies_left as n, i}
        <h5
          class="mb-2 text-l text-center font-bold tracking-tight text-gray-900 dark:text-white"
          class:text-red-500={n !== 0}
          class:{dark:text-red-500}={n !== 0}
        >
          Copies left {n} for correction {i + 1}
        </h5>
      {/each}
    </div>
    <div class="grid grid-flow-row grid-cols-2 gap-5">
      {#each possible_correctors as c}
        <div>
          <h5
            class="text-l font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {c.corrector.email}
          </h5>
          <div>
            <label
              for="nbcopies1"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Note 1 : {c.nbcopies1}</label
            >
            <input
              name="nbcopies1"
              type="range"
              min="0"
              max={copies.length - (c.nbcopies2 + c.nbcopies3)}
              bind:value={c.nbcopies1}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Module name"
              on:change={updateCopiesLeft}
            />
          </div>
          <div>
            <label
              for="nbcopies2"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Note 2 : {c.nbcopies2}</label
            >
            <input
              name="nbcopies2"
              type="range"
              min="0"
              max={copies.length - (c.nbcopies1 + c.nbcopies3)}
              bind:value={c.nbcopies2}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Module name"
              on:change={updateCopiesLeft}
            />
          </div>
          <div>
            <label
              for="nbcopies3"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Note 3 : {c.nbcopies3}</label
            >
            <input
              name="nbcopies3"
              type="range"
              min="0"
              max={copies.length - (c.nbcopies1 + c.nbcopies2)}
              bind:value={c.nbcopies3}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Module name"
              on:change={updateCopiesLeft}
            />
          </div>
        </div>
      {/each}
    </div>
    <div class="p-5 text-right">
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        on:click={submit}
      >
        Submit
      </button>
    </div>
  </div>
{/if}
