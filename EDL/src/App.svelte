<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Admin from "./component/Admin/Admin.svelte";
  import Login from "./component/general/login/login.svelte";
  import TeacherTable from "./component/general/User/TeacherTable.svelte";
  import ViceDoyen from "./component/ViceDoyen/ViceDoyen.svelte";
  import Stepper from "./component/general/Stepper.svelte";
</script>

<Router>
  <main>
    <Route path="login" component={Login} />
    <Route path="admin/*" component={Admin} />
    <Route path="vicedoyen/*" component={ViceDoyen} />
    <Route path="test">
      <!-- <Stepper /> -->
    </Route>
  </main>
</Router>
