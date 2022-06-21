<script lang="ts">
	export let threshold: number;
</script>

<label for="threshold">threshold: </label>
<p>{threshold.toFixed(2)}</p>
<input bind:value={threshold} type="range" min="0.00" max="1.00" step="0.01" name="threshold" />

<style lang="postcss">
	label {
		@apply font-mono text-dark uppercase;
	}

	p {
		@apply font-mono text-dark inline;
	}

	input {
		@apply block mb-16 mt-4 h-1 w-full bg-dark cursor-pointer appearance-none;
	}

	input[type='range'] {
		-webkit-appearance: none;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		@apply bg-dark;
	}
</style>
