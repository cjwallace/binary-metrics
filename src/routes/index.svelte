<script lang="ts">
	import { data } from '../stores';
	import { LayerCake, Svg } from 'layercake';
	import { range } from 'd3';

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
	const ticks = range(0, 1.1, 0.1);

	const colors = ['#74bda8', '#cc6b49', '#d2a24c', '#6f5643'];

	const chartMargin = 40;
	const barMargin = 80;
	const chartXRange = ({ width }: { width: number }) => [chartMargin, width - chartMargin];
	const chartYRange = ({ height }: { height: number }) => [height - chartMargin, chartMargin];
	const barXRange = ({ width }: { width: number }) => [0, width - barMargin];

	let currentThreshold = 0.5;
	$: metrices = thresholds.map((thresh) => metrics($data, thresh));
	$: currentMetrics = metrics($data, currentThreshold);
</script>

<div class="max-w-md mt-10 m-auto p-4 block">
	<h1 class="text-lg font-mono font-bold mb-4">Binary Metrics</h1>
	<p class="font-mono text-sm mb-4">// TODO: instructions</p>
	<FileInput />

	<ThresholdSlider bind:threshold={currentThreshold} />
	<div class="max-w-md w-full h-[250px] sm:h-[400px] mb-12 mt-12 m-auto">
		<LayerCake
			let:containerWidth
			let:containerHeight
			data={metrices}
			x="recall"
			y="precision"
			xDomain={[0, 1]}
			yDomain={[0, 1]}
			xRange={chartXRange}
			yRange={chartYRange}
		>
			<Svg>
				<AxisX {ticks} />
				<AxisY {ticks} />
				<Line />
				<Circle circleX={currentMetrics.recall} circleY={currentMetrics.precision} />
				<text class="font-mono text-xs uppercase fill-[#1f2937] font-semibold" x="5" y="10"
					>precision</text
				>
				<text
					class="font-mono text-xs uppercase fill-[#1f2937] font-semibold"
					x={containerWidth - 80}
					y={containerHeight}>recall</text
				>
			</Svg>
		</LayerCake>
	</div>

	<div class="max-w-md h-[200px] my-2 m-auto p-2 block">
		<LayerCake data={currentMetrics} xDomain={[0, 1]} xRange={barXRange}>
			{#each Object.entries(currentMetrics) as m, i}
				<Svg>
					<Bar y={i * 50} value={m[1]} color={colors[i]} label={m[0]} />
				</Svg>
			{/each}
		</LayerCake>
	</div>
</div>

<style>
	:global(body) {
		/* background-color: #ece6c2; */
		background-color: papayawhip;
	}
</style>
