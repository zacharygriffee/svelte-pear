/** @typedef {import('pear-interface')} */ /* global Pear */

import {mount} from "svelte";
import App from './App.svelte';
Pear.updates(() => {
    Pear.reload();
});
mount(App, {target: document.getElementById("app"),props: {Pear}});