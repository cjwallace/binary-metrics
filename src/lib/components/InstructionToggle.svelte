<script lang="ts">
	export let toggle: boolean;
</script>

<button on:click={() => (toggle = !toggle)} class="font-mono mb-2">
	{#if !toggle}
		&rdsh; <span class="text-sm underline underline-offset-4">Instructions</span>
	{:else}
		&lsh; <span class="text-sm underline underline-offset-4">Back to app</span>
	{/if}
</button>
