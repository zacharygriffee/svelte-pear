<script>
    let {n} = $props();
</script>

<input type="button" onclick={() => n = +n + 1} value="{n}" />