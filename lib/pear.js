function getPearRuntime() {
    return typeof Pear !== "undefined" ? Pear : null;
}

export function createPearApi() {
    const runtime = getPearRuntime();
    return {
        runtime,
        reload: () => runtime?.reload?.(),
        updates: (listener) => runtime?.updates?.(listener),
        version: runtime?.version ?? "dev"
    };
}

export function attachReload(api) {
    api?.updates?.(() => api.reload?.());
}
