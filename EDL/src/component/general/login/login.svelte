<script lang="ts">
  import { login, type Credentials } from "../../../libjs/apis/login";
  import Input from "./Input.svelte";
  let current_user: Credentials = {
    password: "",
    email: "",
    name: "",
  };
  function resetFields() {
    current_user = {
      password: "",
      email: "",
      name: "",
    };
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/login.css" />
  <link
    href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap"
    rel="stylesheet"
  />
  <script src="https://kit.fontawesome.com/a81368914c.js"></script>
  <script defer type="text/javascript" src="/js/login.js"></script>
</svelte:head>

<img class="wave" src="wave.png" alt="icon" />
<div class="container">
  <div class="img">
    <img src="center.svg" alt="icon" />
  </div>
  <div class="login-content">
    <form action="index.html">
      <img src="icon.jpg" alt="icon" class="m-auto" />
      <h2 class="title dark:text-white">Welcome</h2>
      <Input
        placeholder="Username"
        type="text"
        icon="fa-user"
        bind:value={current_user.email}
      />
      <Input
        placeholder="Password"
        type="password"
        icon="fa-lock"
        bind:value={current_user.password}
      />
      <a href="#">Forgot Password?</a>
      <input
        type="submit"
        class="btn"
        value="Login"
        on:click={(e) => {
          e.preventDefault();
          console.log(current_user);

          console.log(login(current_user, resetFields));
        }}
      />
    </form>
  </div>
</div>
