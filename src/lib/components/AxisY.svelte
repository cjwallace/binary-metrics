<script lang="ts">
	import { max, min } from 'd3';
	import { getContext } from 'svelte';
	const { yScale, xRange } = getContext('LayerCake');

	export let ticks: number[];
</script>

<g>
	<!-- axis line -->
	<line
		x1={$xRange[0]}
		x2={$xRange[0]}
		y1={$yScale(min(ticks))}
		y2={$yScale(max(ticks))}
		stroke-width={2}
	/>
	{#each ticks as t}
		<g transform="translate({$xRange[0]},{$yScale(t)})">
			<!-- tick marks -->
			<line y1={0} y2={0} x1={0} x2={-5} stroke-width={2} />
			<!-- tick labels -->
			<text x={-25} y={4} text-anchor="middle">{t.toFixed(1)}</text>
		</g>
	{/each}
</g>

<style lang="postcss">
	line {
		@apply stroke-dark;
	}
	text {
		@apply font-mono text-xs fill-dark;
	}
</style>
