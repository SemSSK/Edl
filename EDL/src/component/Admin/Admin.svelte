<script lang="ts">
  import type { Page, SideBarItem } from "../../libjs/uiTypes";
  import Main from "../general/User/Main.svelte";
  import Welcome from "../general/Welcome.svelte";
  import AddUserForm from "./Accounts/AddUserForm.svelte";
  import EditUserForm from "./Accounts/EditUserForm.svelte";
  import UserTable from "./Accounts/UserTable.svelte";
  import AddVirtualPlatformForm from "./VirtualPlatform/AddVirtualPlatformForm.svelte";
  import VirtualPlatforms from "./VirtualPlatform/VirtualPlatforms.svelte";
  let userRole = "Administrator";
  let navBar: SideBarItem[] = [
    {
      icon: "bxs-dashboard",
      link: "/admin",
      text: "Dashboard",
      active: false,
    },
    {
      icon: "bxs-user",
      link: "/admin/users",
      text: "Accounts",
      active: false,
    },
    {
      icon: "bxs-school",
      link: "/admin/virtplat",
      text: "Platforms",
      active: false,
    },
  ];
  let pages: Page[] = [
    {
      path: "/users",
      component: UserTable,
    },
    {
      path: "/users/add",
      component: AddUserForm,
    },
    {
      path: "/users/edit/:id",
      component: EditUserForm,
    },
    {
      path: "/virtplat",
      component: VirtualPlatforms,
    },
    {
      path: "/virtplat/add",
      component: AddVirtualPlatformForm,
    },
    {
      path: "",
      component: Welcome,
    },
  ];
</script>

<Main {pages} {navBar} {userRole} />
