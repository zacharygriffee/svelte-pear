<script>
    import Counter from "./lib/components/Counter.svelte";

    export let pear;
    export let initialCount = 0;

    const pearVersion = pear?.version ?? "runtime unavailable";

    function reload() {
        pear?.reload?.();
    }
</script>

<div id="bar"><pear-ctrl></pear-ctrl></div>
<div class="centered-container">
    <h1>Svelte + Pear</h1>
    <p class="subhead">Pear runtime: {pearVersion}</p>
    <Counter n={initialCount}/>
    <button class="reload" on:click={reload} disabled={!pear?.reload}>Reload Pear App</button>
</div>

<style>
    .centered-container {
        text-align: center;
        display: grid;
        gap: 12px;
    }

    #bar {
        -webkit-app-region: drag;
        background: rgba(55, 60, 72, 0.6);
        backdrop-filter: blur(64px);
        height: var(--title-bar-height);
        padding: 0 12px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        color: #FFF;
        white-space: nowrap;
        box-sizing: border-box;
        position: fixed;
        z-index: 2;
        width: 100%;
        left: 0;
        top: 0;
    }

    .subhead {
        margin: 0;
        color: #d4d7e1;
        font-weight: 500;
    }

    .reload {
        background: #5c79ff;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 10px 14px;
        font-size: 14px;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }

    .reload:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    :global(body) {
        margin: 0;
        height: calc(100vh - 70px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
