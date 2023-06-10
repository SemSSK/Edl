<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Admin from "./component/Admin/Admin.svelte";
  import Login from "./component/general/login/login.svelte";
  import ViceDoyen from "./component/ViceDoyen/ViceDoyen.svelte";
  import Cfd from "./component/CFD/Cfd.svelte";
  import Professor from "./component/Professor/Professor.svelte";
  import Applicant from "./component/Applicant/Applicant.svelte";
</script>

<Router>
  <main>
    <Route path="login" component={Login} />
    <Route path="admin/*" component={Admin} />
    <Route path="vicedoyen/*" component={ViceDoyen} />
    <Route path="cfd/*" component={Cfd} />
    <Route path="professor/*" component={Professor} />
    <Route path="applicant/*" component={Applicant} />
    <Route path="test">
      <!-- <Stepper /> -->
    </Route>
  </main>
</Router>
