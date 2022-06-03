<script lang="ts">
	import { max, min } from 'd3';
	import { getContext } from 'svelte';
	const { xScale, yRange } = getContext('LayerCake');

	export let ticks: number[];
</script>

<g>
	<!-- axis line -->
	<line
		y1={$yRange[0]}
		y2={$yRange[0]}
		x1={$xScale(min(ticks))}
		x2={$xScale(max(ticks))}
		stroke="#1f2937"
		stroke-width={2}
	/>
	{#each ticks as t}
		<g transform="translate({$xScale(t)},{$yRange[0]})">
			<!-- tick marks -->
			<line y1={0} y2={5} x1={0} x2={0} stroke="#1f2937" stroke-width={2} />
			<!-- tick labels -->
			<text x={0} y={16} text-anchor="middle" class="font-mono text-xs">{t.toFixed(1)}</text>
		</g>
	{/each}
</g>
