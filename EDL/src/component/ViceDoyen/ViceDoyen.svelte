<script lang="ts">
  import type { Page, SideBarItem } from "../../libjs/uiTypes";
  import Main from "../general/User/Main.svelte";
  let userRole = "Vice Doyen";
  let navBar: SideBarItem[] = [
    // {
    //   icon: "bxs-user",
    //   link: "/admin/users",
    //   text: "Accounts",
    //   active: false,
    // },
    {
      icon: "bxs-dashboard",
      link: "/vd",
      text: "Dashboard",
      active: false,
    },
    {
      icon: "bxs-graduation",
      link: "/vd/session",
      text: "Sessions",
      active: false,
    },
  ];
  let pages: Page[] = [
    // {
    //   path: "/users",
    //   component: UserTable,
    // },
  ];
</script>

<Main {pages} {navBar} {userRole} />
