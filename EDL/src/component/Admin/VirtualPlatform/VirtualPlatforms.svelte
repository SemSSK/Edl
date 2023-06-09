<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { User } from "../../../libjs/model/User";
  import { onMount } from "svelte";
  import { getUser } from "../../../libjs/apis/admin/accounts";
  import { navigate } from "svelte-navigator";
  import { type VirtualPlatform } from "../../../libjs/model/VirtualPlatform";
  import {
    deleteVirtualPlatform,
    getVirtualPlatforms,
  } from "../../../libjs/apis/admin/virtualPlatform";
  let headers: string[] = ["vice doyen email", "name", "actions"];
  let vp_vds: { vp: VirtualPlatform; vd: User }[] = [];
  onMount(() => {
    getVirtualPlatforms(
      (vps) => {
        vps.forEach((vp) =>
          getUser(
            (u) =>
              (vp_vds = [
                ...vp_vds,
                {
                  vp,
                  vd: u,
                },
              ]),
            () => {},
            vp.vd_id
          )
        );
      },
      () => {}
    );
  });

  let deleteFunction = async (vd_id: number) => {
    await deleteVirtualPlatform(
      (vps) => {
        vp_vds = vp_vds.filter((v) =>
          vps.find((vp) => vp.vd_id === v.vp.vd_id)
        );
      },
      () => {},
      vd_id
    );
  };
</script>

<div class="w-full text-left pb-5">
  <button
    class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 transform active:scale-75 transition-transform"
    on:click={() => {
      navigate("/admin/virtplat/add");
    }}
  >
    <Icon icon="ic:baseline-add" />
  </button>
</div>
<div class="w-full grid grid-flow-row grid-cols-3 gap-5">
  {#each vp_vds as v}
    <div
      class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 grid grid-flow-row grid-cols-2 gap-5"
    >
      <img
        class="w-full h-full rounded-full"
        src={`/${v.vp.name.toLowerCase()}.jpg`}
        alt="icon"
      />
      <div>
        <h5
          class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {v.vp.name.toUpperCase()}
        </h5>
        <h5
          class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Managed by : {v.vd.email}
        </h5>
        <div class="mt-5 w-full text-right">
          <button
            class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500 transform active:scale-75 transition-transform"
            on:click={async () => deleteFunction(v.vp.vd_id)}
          >
            <Icon class="w-5 h-5" icon="ic:baseline-delete" />
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>
