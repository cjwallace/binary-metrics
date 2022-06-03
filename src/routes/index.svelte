<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import { range, scaleLinear } from 'd3';

	import data from '$lib/data.js';
	import metrics from '$lib/metrics';
	import type { Threshold } from '$lib/metrics.js';

	import AxisX from '$lib/components/AxisX.svelte';
	import AxisY from '$lib/components/AxisY.svelte';
	import Bar from '$lib/components/Bar.svelte';
	import Circle from '$lib/components/Circle.svelte';
	import Line from '$lib/components/Line.svelte';

	const thresholds: Threshold[] = Array.from(Array(100).keys()).map((el) => el / 100);
	const metrices = thresholds.map((thresh) => metrics(data, thresh));

	const xScale = scaleLinear().domain([0, 1]).range([5, 95]);
	const yScale = scaleLinear().domain([0, 1]).range([95, 5]);

	const ticks = range(0, 1.1, 0.1);

	let currentThreshold = 0.5;
	$: currentMetrics = metrics(data, currentThreshold);
</script>

<div class="w-[400px] h-[400px] my-48 m-auto">
	<label for="threshold" class="font-mono uppercase">threshold: </label>
	<p class="font-mono inline">{currentThreshold.toFixed(2)}</p>
	<input
		bind:value={currentThreshold}
		type="range"
		min="0.00"
		max="1.00"
		step="0.01"
		name="threshold"
		class="block mb-12 mt-4 h-1 form-range w-full bg-[#1f2937] cursor-pointer appearance-none"
	/>
	<LayerCake data={metrices} x="recall" y="precision" xDomain={[0, 1]} yDomain={[0, 1]}>
		<Svg>
			<AxisX {ticks} />
			<AxisY {ticks} />
			<Line />
			<Circle circleX={currentMetrics.recall} circleY={currentMetrics.precision} />
			/>
			<text class="font-mono text-sm uppercase text-[#1f2937] font-semibold" x="0" y="-10"
				>precision</text
			>
			<text class="font-mono text-sm uppercase text-[#1f2937] font-semibold" x="380" y="440"
				>recall</text
			>
		</Svg>
	</LayerCake>
</div>

<div class="w-[400px] h-[400px] my-48 m-auto">
	<LayerCake data={currentMetrics} xDomain={[0, 1]}>
		{#each Object.entries(currentMetrics) as m, i}
			<Svg>
				<text class="font-mono text-sm uppercase text-[#1f2937]" y={i * 50 - 5}>{m[0]}</text>
				<Bar y={i * 50} value={m[1]} />
			</Svg>
		{/each}
	</LayerCake>
</div>

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
