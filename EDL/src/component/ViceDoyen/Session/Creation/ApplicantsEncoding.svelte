<script lang="ts">
  import { onMount } from "svelte";
  import type {
    ApplicantAffectation,
    User,
  } from "../../../../libjs/model/User";
  import {
    encode_applicant,
    get_affected_applicants,
    get_applicant_affectations,
    get_possible_applicants,
  } from "../../../../libjs/apis/vice_doyen/applicant";
  import { navigate } from "svelte-navigator";
  import { pipe } from "fp-ts/lib/function";
  export let session_id: number;
  let headers: string[] = ["Email", "Encoding"];
  let users: { user: User; applicant: ApplicantAffectation }[] = [];
  onMount(async () => {
    let applicants: User[] = [];
    let affectations: ApplicantAffectation[] = [];
    await get_applicant_affectations(
      (a) => {
        affectations = a;
      },
      () => console.log("failure"),
      session_id
    );
    await get_affected_applicants(
      (a) => {
        applicants = a;
      },
      () => console.log("failure"),
      session_id
    );
    console.log(applicants);
    console.log(affectations);
    users = applicants.map((app) => {
      return {
        user: app,
        applicant: affectations.filter((aff) => aff.applicant_id === app.id)[0],
      };
    });
  });

  const onsubmit = () => {
    users.forEach((u) => {
      if (u.applicant.encoding) {
        console.log(u);
        encode_applicant(
          () => navigate("/vicedoyen/session"),
          () => {
            console.log("failure");
          },
          u.applicant
        );
      }
    });
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
      {#each users as u}
        <tr
          class="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td class="px-6 py-4">
            {u.user.email}
          </td>
          <td class="px-6 py-4">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={u.applicant.encoding}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="p-5 text-right">
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      on:click={onsubmit}
    >
      Submit
    </button>
  </div>
</div>
