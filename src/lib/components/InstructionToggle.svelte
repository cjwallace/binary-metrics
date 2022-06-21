<script lang="ts">
	export let toggle: boolean;
</script>

<button on:click={() => (toggle = !toggle)}>
	{#if !toggle}
		&rdsh; <span>Instructions</span>
	{:else}
		&lsh; <span>Back to app</span>
	{/if}
</button>

<style lang="postcss">
	button {
		@apply font-mono font-semibold text-dark mb-2;
	}

	span {
		@apply text-sm underline underline-offset-4;
	}
</style>
