import { attachReload, createPearApi } from "./lib/pear.js";

const pearApi = createPearApi();

function renderApp(target) {
    return import("./dist/entry.js")
        .then(({ mountApp }) => {
            mountApp({
                target,
                props: {
                    pear: pearApi,
                    initialCount: 10
                }
            });
        })
        .catch((error) => {
            console.error("Failed to load UI bundle", error);
        });
}

function bootstrap() {
    const target = document.getElementById("app");
    if (!target) {
        console.error("Missing #app mount point");
        return;
    }
    attachReload(pearApi);
    renderApp(target);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
} else {
    bootstrap();
}
