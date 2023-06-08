<script lang="ts">
  import Icon from "@iconify/svelte";
  import FormAdd from "./FormAdd.svelte";
  import TeacherTable from "./User/TeacherTable.svelte";
  import type { Step } from "../../libjs/uiTypes";
  import { pipe } from "fp-ts/lib/function";
  import { option } from "fp-ts";
  export let steps: Step[] = [
    {
      id: 1,
      title: "session",
      active: true,
      content: FormAdd,
    },
    {
      id: 2,
      title: "modules",
      active: false,
      content: TeacherTable,
    },
    {
      id: 3,
      title: "ababa",
      active: false,
      content: TeacherTable,
    },
  ];

  export let confirmation_page: Step = {
    id: steps.length + 1,
    title: "confirmation",
    active: false,
    content: TeacherTable,
  };

  let activateById = (id: number) => {
    steps = steps.map((s) =>
      s.id === id ? { ...s, active: true } : { ...s, active: false }
    );
    confirmation_page =
      confirmation_page.id === id
        ? { ...confirmation_page, active: true }
        : { ...confirmation_page, active: false };
  };
  let getActive = () =>
    pipe(
      steps.find((step) => step.active),
      option.fromNullable,
      option.match(
        () => confirmation_page,
        (s) => s
      )
    );
</script>

<ol
  class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base"
>
  {#each steps as step}
    <li
      class="flex m-auto md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
    >
      <button
        class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
        on:click={() => activateById(step.id)}
      >
        {#if step.active}
          <svg
            aria-hidden="true"
            class="w-4 h-4 mr-2 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            /></svg
          >
        {:else}
          <Icon
            class="w-4 h-4 mr-2 sm:w-5 sm:h-5"
            icon={`fa6-solid:${step.id}`}
          />
        {/if}
        {step.title}
      </button>
    </li>
  {/each}
  <li class="flex items-center">
    <button
      class="flex items-center"
      on:click={() => activateById(confirmation_page.id)}
    >
      {#if confirmation_page.active}
        <svg
          aria-hidden="true"
          class="w-4 h-4 mr-2 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          /></svg
        >
      {:else}
        <Icon
          class="w-4 h-4 mr-2 sm:w-5 sm:h-5"
          icon={`fa6-solid:${confirmation_page.id}`}
        />
      {/if}
      Confirmation
    </button>
  </li>
</ol>
<div class="m-10">
  <svelte:component this={getActive()?.content} />
</div>

<div class="w-full flex flex-row justify-between">
  <button
    class="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    on:click={() => {
      activateById(getActive().id - 1);
    }}
    disabled={getActive().id === 1}
  >
    back
  </button>
  <button
    class="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    on:click={() => {
      activateById(getActive().id + 1);
    }}
    disabled={getActive().id === confirmation_page.id}
  >
    next
  </button>
</div>
