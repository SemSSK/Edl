<script lang="ts">
  import Icon from "@iconify/svelte";
  import { isSession, type Session } from "../../../../libjs/model/Session";
  import type {
    ApplicantAffectation,
    User,
  } from "../../../../libjs/model/User";
  import { onMount } from "svelte";
  import {
    create_session,
    get_cfd,
    get_sessions,
  } from "../../../../libjs/apis/vice_doyen/session";
  import { pipe } from "fp-ts/lib/function";
  import { formDataToObject } from "../../../../libjs/core";
  import {
    affect_applicant,
    get_possible_applicants,
  } from "../../../../libjs/apis/vice_doyen/applicant";
  import { navigate } from "svelte-navigator";
  import { create_module } from "../../../../libjs/apis/vice_doyen/module";

  let cfd: User;
  let number_of_modules: number = 2;
  onMount(() => {
    get_cfd(
      (c) => {
        cfd = c;
      },
      () => console.error("failure")
    );
  });
  let room_number = 0;
  let starting_time: string = new Date().toDateString();
  let ending_time: string = new Date().toDateString();

  const submit = (e: any) => {
    pipe(
      new FormData(e.target),
      formDataToObject,
      (d) => {
        return {
          ...d,
          cfd_id: cfd.id,
          id: 1,
          virtual_platform_id: 0,
          room_number: room_number,
          starting_time: new Date(starting_time).getTime() / 1000,
          ending_time: new Date(ending_time).getTime() / 1000,
        };
      },
      (s) => {
        create_session(
          (ss) => {
            let modules = s["module[]"];
            pipe(ss.reverse()[0], (s) => {
              modules.forEach((m: any) =>
                create_module(
                  () => {},
                  () => {
                    console.error("failure");
                  },
                  {
                    code: m,
                    session_id: s.id,
                  }
                )
              );
              get_possible_applicants(
                (u) => {
                  u.forEach((x) => {
                    if (x.id && s.id) {
                      let appAffec: ApplicantAffectation = {
                        applicant_id: x.id,
                        encoding: "",
                        session_id: s.id,
                      };
                      affect_applicant(
                        () => {},
                        () => console.error("failure"),
                        appAffec
                      );
                    }
                  });
                },
                () => console.error("failure")
              );
            });
            navigate("/vicedoyen/session");
          },
          () => console.error("failure"),
          s
        );
      }
    );
  };
</script>

{#if cfd}
  <form on:submit|preventDefault={submit}>
    <div
      class=" w-full h-full p-10 ease-linear duration-200 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <div class="w-full grid grid-flow-row grid-cols-2 gap-5">
        <div class="relative">
          <label for="starting_time">From:</label>
          <input
            name="starting_time"
            type="datetime-local"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            bind:value={starting_time}
          />
        </div>
        <div class="relative">
          <label for="ending_time">To:</label>
          <input
            name="ending_time"
            type="datetime-local"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            bind:value={ending_time}
          />
        </div>
        <div class="relative">
          <label for="room_number">Room number:</label>
          <input
            name="room_number"
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date start"
            bind:value={room_number}
          />
        </div>
        <div class="relative">
          <label for="number_of_modules">Number of modules:</label>
          <input
            name="number_of_modules"
            type="number"
            min="2"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date start"
            bind:value={number_of_modules}
          />
        </div>
        {#each Array(number_of_modules) as _, i}
          <div class="relative">
            <label for="module[]">Module {i + 1}:</label>
            <input
              name="module[]"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Module name"
            />
          </div>
        {/each}
      </div>
    </div>
    <div class="mt-10 w-full flex justify-evenly">
      <input
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transform active:scale-75 transition-transform"
        value="Validate"
      />
    </div>
  </form>
{/if}
