<script lang="ts">
  import type { Page, SideBarItem } from "../../libjs/uiTypes";
  import Content from "../general/User/Content.svelte";
  import Main from "../general/User/Main.svelte";
  import MonitoringList from "./MonitoringList.svelte";
  let userRole = "Professor";
  let navBar: SideBarItem[] = [
    {
      icon: "bxs-dashboard",
      link: "/professor",
      text: "Dashboard",
      active: false,
    },
    {
      icon: "bxs-camera-home",
      link: "/professor/monitoring",
      text: "Monitoring",
      active: false,
    },
    {
      icon: "bxs-edit",
      link: "/professor/grading",
      text: "Grading",
      active: false,
    },
  ];
  let pages: Page[] = [
    // {
    //   path: "/users",
    //   component: UserTable,
    // },
    {
      path: "/monitoring",
      component: MonitoringList,
    },
  ];
</script>

<Main {pages} {navBar} {userRole} />
