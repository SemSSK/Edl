<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { Role, User } from "../../../libjs/model/User";
  import { onMount } from "svelte";
  import { deleteUser, getUsers } from "../../../libjs/apis/admin/accounts";
  import { navigate } from "svelte-navigator";
  import { id } from "fp-ts/lib/Refinement";
  let roles: string[] = ["Role", "Applicant", "CFD", "ViceDoyen", "Professor"];
  let users: User[] = [];
  let role_to_display: string = "Role";
  onMount(async () => {
    getUsers(
      (us) => (users = us.filter((u) => u.role !== "Admin")),
      () => {
        navigate("/login");
      }
    );
  });
  let addFunction = () => {
    navigate("/admin/users/add");
  };
  let deleteFunction = (id: number) => {
    deleteUser(
      (us) => {
        users = us;
      },
      () => {},
      id
    );
  };
  let editFunction = (id: number) => {
    navigate(`/admin/users/edit/${id}`);
  };
</script>

<div class="w-full h-full">
  <div class="p-5 text-center">
    <button
      class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 transform active:scale-75 transition-transform"
      on:click={addFunction}
    >
      <Icon icon="ic:baseline-add" />
    </button>
  </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th class="px-6 py-3 text-center"> numero </th>
        <th class="px-6 py-3 text-center"> email </th>
        <th class="px-6 py-3 text-center">
          <select
            bind:value={role_to_display}
            class="ml-2 text-black bg-white p-2 rounded-md dark:text-white dark:bg-gray-500"
          >
            {#each roles as role}
              <option value={role}>{role}</option>
            {/each}
          </select>
        </th>
        <th class="px-6 py-3 text-center"> domain </th>
        <th class="px-6 py-3 text-center"> specialty </th>
        <th class="px-6 py-3 text-center"> actions </th>
      </tr>
    </thead>
    <tbody>
      {#each users.filter((u) => role_to_display === "Role" || u.role === role_to_display) as u}
        <tr
          class="text-black text-center bg-white border-b dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <td class="px-6 py-4 dark:text-white">
            {u.id}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {u.email}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {u.role}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {#if u.domaine}
              {u.domaine}
            {/if}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {#if u.specialty}
              {u.specialty}
            {/if}
          </td>
          <td
            class=" px-6 py-4 flex flex-row justify-center content-center space-x-5"
          >
            <button
              class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500 transform active:scale-75 transition-transform"
              on:click={async () => u.id && deleteFunction(u.id)}
            >
              <Icon class="w-5 h-5 mr-2 -ml-1" icon="ic:baseline-delete" />
              Delete
            </button>
            <button
              class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 transform active:scale-75 transition-transform"
              on:click={() => u.id && editFunction(u.id)}
            >
              Edit
              <Icon class="w-5 h-5 ml-2 -mr-1" icon="ic:baseline-edit" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
