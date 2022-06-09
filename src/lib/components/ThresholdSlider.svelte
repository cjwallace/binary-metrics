<script lang="ts">
	export let threshold: number;
</script>

<label for="threshold" class="font-mono uppercase">threshold: </label>
<p class="font-mono inline">{threshold.toFixed(2)}</p>
<input
	bind:value={threshold}
	type="range"
	min="0.00"
	max="1.00"
	step="0.01"
	name="threshold"
	class="block mb-16 mt-4 h-1 form-range w-full bg-[#1f2937] cursor-pointer appearance-none"
/>

<style>
	input[type='range'] {
		-webkit-appearance: none;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #1f2937;
	}
</style>
