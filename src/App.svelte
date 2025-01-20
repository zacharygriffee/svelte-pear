<script>
    import Counter from "./lib/components/Counter.svelte";
</script>
<div id="bar"><pear-ctrl></pear-ctrl></div>
<div class="centered-container">
    <h1>Svelte + Pear</h1>
    <Counter n="10"/>
</div>

<style>
    .centered-container {
        text-align: center; /* Center text inside the container */
    }

    #bar {
        -webkit-app-region: drag;
        background: rgba(55, 60, 72, 0.6);
        backdrop-filter: blur(64px);
        height: var(--title-bar-height);
        padding: 0;
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

    :global(body) {
        margin: 0; /* Remove default margin */
        height: calc(100vh - 70px); /* Full viewport height */
        display: flex; /* Use Flexbox for centering */
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
    }
</style>