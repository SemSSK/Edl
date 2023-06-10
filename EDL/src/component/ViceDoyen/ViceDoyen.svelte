<script lang="ts">
  import type { Page, SideBarItem } from "../../libjs/uiTypes";
  import Main from "../general/User/Main.svelte";
  import Welcome from "../general/Welcome.svelte";
  import ApplicantsEncoding from "./Session/Creation/ApplicantsEncoding.svelte";
  import SessionForm from "./Session/Creation/SessionForm.svelte";
  import SessionList from "./Session/SessionList.svelte";
  let userRole = "Vice Doyen";
  let navBar: SideBarItem[] = [
    {
      icon: "bxs-dashboard",
      link: "/vicedoyen",
      text: "Dashboard",
      active: false,
    },
    {
      icon: "bxs-graduation",
      link: "/vicedoyen/session",
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
      path: "/session",
      component: SessionList,
    },
    {
      path: "/session/create",
      component: SessionForm,
    },
    {
      path: "/session/:session_id",
      component: ApplicantsEncoding,
    },
    {
      path: "",
      component: Welcome,
    },
  ];
</script>

<Main {pages} {navBar} {userRole} />
