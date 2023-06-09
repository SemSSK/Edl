import "./app.css";
import App from "./App.svelte";

if (!localStorage.getItem("darkMode")) {
  localStorage.setItem("darkMode", JSON.stringify(false));
  console.log(JSON.stringify(false));
}

if (localStorage.getItem("darkMode") === "true") {
  window.document.body.classList.add("dark");
}

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
