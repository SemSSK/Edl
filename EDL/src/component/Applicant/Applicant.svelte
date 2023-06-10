<script lang="ts">
  import type { Page, SideBarItem } from "../../libjs/uiTypes";
  import Content from "../general/User/Content.svelte";
  import Main from "../general/User/Main.svelte";
  import SessionDetails from "./SessionDetails.svelte";
  import SessionList from "./SessionList.svelte";
  let userRole = "Applicant";
  let navBar: SideBarItem[] = [
    {
      icon: "bxs-dashboard",
      link: "/applicant",
      text: "Dashboard",
      active: false,
    },
    {
      icon: "bxs-star",
      link: "/applicant/sessions",
      text: "Grades",
      active: false,
    },
  ];
  let pages: Page[] = [
    // {
    //   path: "/users",
    //   component: UserTable,
    // },
    {
      path: "results/:session_id",
      component: SessionDetails,
    },
    {
      path: "sessions",
      component: SessionList,
    },
    {
      path: "",
      component: SessionDetails,
    },
  ];
</script>

<Main {pages} {navBar} {userRole} />
