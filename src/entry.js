import { mount } from "svelte";
import App from "./App.svelte";

export function mountApp({ target, props }) {
    return mount(App, { target, props });
}
