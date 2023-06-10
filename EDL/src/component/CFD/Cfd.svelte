<script lang="ts">
  import type { Page, SideBarItem } from "../../libjs/uiTypes";
  import Content from "../general/User/Content.svelte";
  import Main from "../general/User/Main.svelte";
  import AffectingCorrectors from "./Session/AffectingCorrectors.svelte";
  import AffectingMonitors from "./Session/AffectingMonitors.svelte";
  import ClassmentPage from "./Session/ClassmentPage.svelte";
  import SessionList from "./Session/SessionList.svelte";
  let userRole = "CFD";
  let navBar: SideBarItem[] = [
    {
      icon: "bxs-dashboard",
      link: "",
      text: "Dashboard",
      active: false,
    },
    {
      icon: "bxs-graduation",
      link: "/cfd/session",
      text: "Sessions",
      active: false,
    },
  ];
  let pages: Page[] = [
    // {
    //   path: "/users",
    //   component: UserTable,
    // },
    {
      path: "/session/affecting-correctors/:session_id",
      component: AffectingCorrectors,
    },
    {
      path: "/session/affecting-monitors/:session_id",
      component: AffectingMonitors,
    },
    {
      path: "/session/classment/:session_id",
      component: ClassmentPage,
    },
    // {
    //   path: "/session/check-results/:session_id"
    // },
    {
      path: "/session",
      component: SessionList,
    },
  ];
</script>

<Main {pages} {navBar} {userRole} />
