<script lang="ts">
  import { onMount } from "svelte";
  import type { Session } from "../../libjs/model/Session";
  import Icon from "@iconify/svelte";
  import {
    getModules,
    getResults,
    getSessions,
  } from "../../libjs/apis/applicant/consulterInfo";
  import type { Module } from "../../libjs/model/Module";
  import {
    convertTimeToDate,
    decodeJwtFromStore,
    type JwtPayload,
  } from "../../libjs/core";
  import type { ClassmentEntry } from "../../libjs/model/ClassmentEntry";
  import { pipe } from "fp-ts/lib/function";
  import { option } from "fp-ts";
  import type { User } from "../../libjs/model/User";

  let actives = 1;
  const next = () => {
    if (results || actives <= 1) {
      actives += 1;
    }
  };
  const prev = () => {
    actives -= 1;
  };
  export let session_id: number;
  let user: JwtPayload = pipe(
    decodeJwtFromStore(),
    option.match(
      () => undefined,
      (u) => u
    )
  )?.user_data!;
  console.log(user);
  let session: Session;
  let modules: Module[];
  let results: ClassmentEntry[] = [];
  let passed: boolean = false;
  onMount(async () => {
    await getSessions(
      (s) => {
        session = s.find((sess) => sess.id === +session_id)!;
      },
      () => console.error("failure")
    );
    await getModules(
      (m) => {
        modules = m;
      },
      () => console.error("failure"),
      session.id!
    );
    await getResults(
      (c) => (results = c),
      () => console.error("failure"),
      session.id!
    );
    console.log(results);
    if (results) {
      if (results[0].email === user.email) {
        passed = true;
      } else if (results[1].email === user.email) {
        passed = true;
      } else if (results[2].email === user.email) {
        passed = true;
      }
    }
  });
</script>

{#if session && modules}
  <header class="header dark:text-white">
    <h1 class="header__title">Contest</h1>
  </header>
  <div class="content">
    <div class="content__inner">
      <div class="container overflow-hidden">
        <div class="multisteps-form">
          <div class="row">
            <div class="col-12 col-lg-8 ml-auto mr-auto mb-4">
              <div class="multisteps-form__progress">
                <button
                  class="multisteps-form__progress-btn"
                  class:js-active={actives >= 1}
                  type="button"
                  on:click={() => (actives = 1)}
                  title="User Info">Doctorat Information</button
                >
                <button
                  class="multisteps-form__progress-btn"
                  class:js-active={actives >= 2}
                  type="button"
                  on:click={() => (actives = 2)}
                  title="Address">Grading Information</button
                >
                <button
                  class="multisteps-form__progress-btn"
                  class:js-active={actives >= 3}
                  type="button"
                  on:click={() => (actives = 3)}
                  title="Order Info">Results Information</button
                >
                <button
                  class="multisteps-form__progress-btn"
                  class:js-active={actives >= 4}
                  type="button"
                  on:click={() => (actives = 4)}
                  title="Message"
                  >Classement
                </button>
              </div>
              <form class="relative w-full h-[10cm]" on:submit|preventDefault>
                <div
                  class="absolute overflow-y-scroll z-[100] h-full top-0 p-5 mt-10 w-full bg-slate-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:text-white dark:bg-gray-700 transition-all ease-linear duration-75"
                  class:-translate-x-[1000px]={actives > 1}
                  class:translate-x-[1000px]={actives < 1}
                >
                  <h1 class="ml-3 mt-5 pb-5 text-3xl">Doctorat Information</h1>
                  <div class="m-5 w-full grid grid-flow-row grid-cols-2 gap-5">
                    <div
                      class="mr-10 p-1.5 border border-gray-600 dark:border-white rounded-lg"
                    >
                      Room : {session.room_number}
                    </div>
                    <div
                      class="mr-10 p-1.5 border border-gray-600 dark:border-white rounded-lg"
                    >
                      Domaine : {user.domaine}
                    </div>
                    <div
                      class="mr-10 p-1.5 border border-gray-600 dark:border-white rounded-lg"
                    >
                      Starts at: {convertTimeToDate(session.starting_time)}
                    </div>
                    <div
                      class="mr-10 p-1.5 border border-gray-600 dark:border-white rounded-lg"
                    >
                      Starts at: {convertTimeToDate(session.ending_time)}
                    </div>
                    {#each modules as m, i}
                      <div
                        class="mr-10 p-1.5 border border-gray-600 dark:border-white rounded-lg"
                      >
                        Module {i + 1}: {m.code}
                      </div>
                      <div />
                    {/each}
                    <div class="text-left ml-10" />
                    <div class="text-right mr-10">
                      <button
                        class="p-2 pl-3 pr-3 rounded-sm bg-blue-700 text-white"
                        on:click={next}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="absolute overflow-y-scroll z-[100] h-full top-0 p-5 mt-10 w-full bg-slate-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:text-white dark:bg-gray-700 transition-all ease-linear duration-75"
                  class:-translate-x-[1000px]={actives > 2}
                  class:translate-x-[1000px]={actives < 2}
                >
                  <div class="grid grid-flow-row grid-cols-1">
                    <div
                      class="p-2.5 text-3xl text-center m-5 rounded-lg"
                      class:text-green-500={results}
                      class:text-red-500={!results}
                    >
                      {#if results}
                        Finished!
                      {:else}
                        Still going Please wait
                      {/if}
                    </div>
                    <div class="grid grid-flow-col grid-cols-2">
                      <div class="text-left">
                        <button
                          class="p-2 pl-3 pr-3 rounded-sm bg-blue-700 text-white"
                          on:click={prev}
                        >
                          Prev
                        </button>
                      </div>
                      <div class="text-right">
                        <button
                          class="p-2 pl-3 pr-3 rounded-sm bg-blue-700 text-white"
                          on:click={next}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="absolute overflow-y-scroll z-[100] h-full top-0 p-5 mt-10 w-full bg-slate-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:text-white dark:bg-gray-700 transition-all ease-linear duration-75"
                  class:-translate-x-[1000px]={actives > 3}
                  class:translate-x-[1000px]={actives < 3}
                >
                  <h1 class="ml-3 mt-5 pb-5 text-3xl">Results Information</h1>
                  <div class="m-5 w-full grid grid-flow-row grid-cols-2 gap-5">
                    <div
                      class="text-center p-5 mr-5 border border-gray-500 rounded-xl dark:border-white text-3xl text-green-600"
                    >
                      {#if passed}
                        Passed!
                      {/if}
                    </div>
                    <div
                      class="text-center p-5 mr-5 border border-gray-500 rounded-xl dark:border-white text-3xl text-red-600"
                    >
                      {#if !passed}
                        Failed
                      {/if}
                    </div>
                    <div class="text-left">
                      <button
                        class="p-2 pl-3 pr-3 rounded-sm bg-blue-700 text-white"
                        on:click={prev}
                      >
                        Prev
                      </button>
                    </div>
                    <div class="text-right mr-10">
                      <button
                        class="p-2 pl-3 pr-3 rounded-sm bg-blue-700 text-white"
                        on:click={next}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="absolute overflow-y-scroll z-[100] h-full top-0 p-5 mt-10 w-full bg-slate-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:text-white dark:bg-gray-700 transition-all ease-linear duration-75"
                  class:-translate-x-[1000px]={actives > 4}
                  class:translate-x-[1000px]={actives < 4}
                >
                  <h1 class="ml-3 mt-5 pb-5 text-3xl">Classement</h1>
                  <div class="m-5 w-full grid grid-flow-row grid-cols-2">
                    <div class="text-center p-2 bg-gray-600 text-white">
                      Email
                    </div>
                    <div class="text-center p-2 bg-gray-600 text-white mr-10">
                      Classement
                    </div>
                    {#each results as r}
                      <div
                        class="text-center p-2 dark:bg-gray-800 dark:text-white"
                      >
                        {r.email}
                      </div>
                      <div
                        class="text-center p-2 dark:bg-gray-800 dark:text-white mr-10"
                      >
                        {r.classment}
                      </div>
                    {/each}
                    <div class="text-left">
                      <button
                        class="p-2 pl-3 pr-3 rounded-sm bg-blue-700 text-white"
                        on:click={prev}
                      >
                        Prev
                      </button>
                    </div>
                    <div class="text-right mr-10">
                      <button
                        class="p-2 pl-3 pr-3 rounded-sm bg-green-600 text-white"
                        on:click={next}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .header {
    max-width: 600px;
    margin: 50px auto;
    text-align: center;
  }

  .header__title {
    margin-bottom: 30px;
    font-size: 2.1rem;
  }

  .content {
    width: 95%;
    margin: 0 auto 50px;
  }

  .content__title {
    margin-bottom: 40px;
    font-size: 20px;
    text-align: center;
  }

  .content__title--m-sm {
    margin-bottom: 10px;
  }

  .multisteps-form__progress {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  }

  .multisteps-form__progress-btn {
    transition-property: all;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    transition-delay: 0s;
    position: relative;
    padding-top: 20px;
    color: rgba(108, 117, 125, 0.7);
    text-indent: -9999px;
    border: none;
    background-color: transparent;
    outline: none !important;
    cursor: pointer;
  }
  @media (min-width: 500px) {
    .multisteps-form__progress-btn {
      text-indent: 0;
    }
  }
  .multisteps-form__progress-btn:before {
    position: absolute;
    top: 0;
    left: 50%;
    display: block;
    width: 13px;
    height: 13px;
    content: "";
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    transition: all 0.15s linear 0s,
      -webkit-transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
    transition: all 0.15s linear 0s,
      transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
    transition: all 0.15s linear 0s,
      transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s,
      -webkit-transform 0.15s cubic-bezier(0.05, 1.09, 0.16, 1.4) 0s;
    border: 2px solid currentColor;
    border-radius: 50%;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 3;
  }
  .multisteps-form__progress-btn:after {
    position: absolute;
    top: 5px;
    left: calc(-50% - 13px / 2);
    transition-property: all;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    transition-delay: 0s;
    display: block;
    width: 100%;
    height: 2px;
    content: "";
    background-color: currentColor;
    z-index: 1;
  }
  .multisteps-form__progress-btn:first-child:after {
    display: none;
  }
  .multisteps-form__progress-btn.js-active {
    color: #007bff;
  }
  .multisteps-form__progress-btn.js-active:before {
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: currentColor;
  }

  .multisteps-form__form {
    position: relative;
  }

  .multisteps-form__panel {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    opacity: 0;
    visibility: hidden;
  }
  .multisteps-form__panel.js-active {
    height: auto;
    opacity: 1;
    visibility: visible;
  }
  .multisteps-form__panel[data-animation="scaleOut"] {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .multisteps-form__panel[data-animation="scaleOut"].js-active {
    transition-property: all;
    transition-duration: 0.2s;
    transition-timing-function: linear;
    transition-delay: 0s;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  .multisteps-form__panel[data-animation="slideHorz"] {
    left: 50px;
  }
  .multisteps-form__panel[data-animation="slideHorz"].js-active {
    transition-property: all;
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.2, 1.13, 0.38, 1.43);
    transition-delay: 0s;
    left: 0;
  }
  .multisteps-form__panel[data-animation="slideVert"] {
    top: 30px;
  }
  .multisteps-form__panel[data-animation="slideVert"].js-active {
    transition-property: all;
    transition-duration: 0.2s;
    transition-timing-function: linear;
    transition-delay: 0s;
    top: 0;
  }
  .multisteps-form__panel[data-animation="fadeIn"].js-active {
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    transition-delay: 0s;
  }
  .multisteps-form__panel[data-animation="scaleIn"] {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
  .multisteps-form__panel[data-animation="scaleIn"].js-active {
    transition-property: all;
    transition-duration: 0.2s;
    transition-timing-function: linear;
    transition-delay: 0s;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
</style>
