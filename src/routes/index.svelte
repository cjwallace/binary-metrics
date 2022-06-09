<script lang="ts">
	import { data } from '../stores';
	import { LayerCake, Svg } from 'layercake';
	import { range, scaleLinear } from 'd3';

	import metrics from '$lib/metrics';
	import type { Threshold } from '$lib/metrics';

	import AxisX from '$lib/components/AxisX.svelte';
	import AxisY from '$lib/components/AxisY.svelte';
	import Bar from '$lib/components/Bar.svelte';
	import Circle from '$lib/components/Circle.svelte';
	import Line from '$lib/components/Line.svelte';
	import FileInput from '$lib/components/FileInput.svelte';
	import ThresholdSlider from '$lib/components/ThresholdSlider.svelte';

	const thresholds: Threshold[] = Array.from(Array(101).keys()).map((el) => el / 100);
	console.log(thresholds);
	const ticks = range(0, 1.1, 0.1);

	const colors = ['#74bda8', '#cc6b49', '#d2a24c', '#6f5643'];

	let currentThreshold = 0.5;
	$: metrices = thresholds.map((thresh) => metrics($data, thresh));
	$: currentMetrics = metrics($data, currentThreshold);
</script>

<div class="w-[400px] my-12 m-auto block">
	<FileInput />
</div>

<div class="w-[400px] h-[400px] mb-48 mt-12 m-auto">
	<ThresholdSlider bind:threshold={currentThreshold} />
	<LayerCake data={metrices} x="recall" y="precision" xDomain={[0, 1]} yDomain={[0, 1]}>
		<Svg>
			<AxisX {ticks} />
			<AxisY {ticks} />
			<Line />
			<Circle circleX={currentMetrics.recall} circleY={currentMetrics.precision} />
			<text class="font-mono text-xs uppercase fill-[#1f2937] font-semibold" x="-35" y="-10"
				>precision</text
			>
			<text class="font-mono text-xs uppercase fill-[#1f2937] font-semibold" x="368" y="435"
				>recall</text
			>
		</Svg>
	</LayerCake>
</div>

<div class="w-[400px] h-[200px] my-48 m-auto">
	<LayerCake data={currentMetrics} xDomain={[0, 1]}>
		{#each Object.entries(currentMetrics) as m, i}
			<Svg>
				<text class="font-mono text-sm uppercase fill-[#1f2937]" y={i * 50 - 5}>{m[0]}</text>
				<Bar y={i * 50} value={m[1]} color={colors[i]} />
			</Svg>
		{/each}
	</LayerCake>
</div>

<style>
	:global(body) {
		/* background-color: #ece6c2; */
		background-color: papayawhip;
	}
</style>
