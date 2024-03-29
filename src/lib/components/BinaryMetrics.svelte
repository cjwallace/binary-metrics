<script lang="ts">
	import { data } from '$lib/stores';
	import { LayerCake, Svg } from 'layercake';
	import { range } from 'd3';

	import metrics from '$lib/metrics';

	import AxisX from '$lib/components/AxisX.svelte';
	import AxisY from '$lib/components/AxisY.svelte';
	import Bar from '$lib/components/Bar.svelte';
	import Circle from '$lib/components/Circle.svelte';
	import Line from '$lib/components/Line.svelte';
	import FileInput from '$lib/components/FileInput.svelte';
	import Instructions from '$lib/components/Instructions.svelte';
	import InstructionToggle from '$lib/components/InstructionToggle.svelte';
	import ThresholdSlider from '$lib/components/ThresholdSlider.svelte';

	const thresholds = Array.from(Array(101).keys()).map((el) => el / 100);
	const ticks = range(0, 1.1, 0.1);

	const fillColors = ['aqua', 'red', 'yellow', 'brown'];

	const chartMargin = 40;
	const barMargin = 40;
	const chartXRange = ({ width }: { width: number }) => [chartMargin, width - chartMargin / 2];
	const chartYRange = ({ height }: { height: number }) => [height - chartMargin, chartMargin];
	const barXRange = ({ width }: { width: number }) => [0, width - barMargin];

	let currentThreshold = 0.5;

	let instructionsOpen = false;

	$: metrices = thresholds.map((thresh) => metrics($data, thresh));
	$: currentMetrics = metrics($data, currentThreshold);
</script>

<div class="app">
	<h1>Binary Metrics</h1>
	<InstructionToggle bind:toggle={instructionsOpen} />
	{#if instructionsOpen}
		<Instructions />
	{:else}
		<FileInput />

		<ThresholdSlider bind:threshold={currentThreshold} />
		<div class="chart">
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
					<text class="axis-label" x="5" y="10">precision</text>
					<text class="axis-label" x={containerWidth - barMargin} y={containerHeight}>recall</text>
				</Svg>
			</LayerCake>
		</div>

		<div class="bars">
			<LayerCake data={currentMetrics} xDomain={[0, 1]} xRange={barXRange}>
				{#each Object.entries(currentMetrics) as m, i}
					<Svg>
						<Bar y={i * 50} value={m[1]} color={fillColors[i]} label={m[0]} />
					</Svg>
				{/each}
			</LayerCake>
		</div>
	{/if}
</div>

<style lang="postcss">
	h1 {
		@apply text-lg font-mono font-bold mb-4;
	}

	div.app {
		@apply max-w-md my-10 m-auto p-4 block sm:border sm:border-dark sm:rounded-sm;
	}

	div.chart {
		@apply max-w-md w-full h-[300px] sm:h-[400px] mb-12 mt-12 m-auto;
	}

	div.bars {
		@apply max-w-md h-[200px] my-2 m-auto p-2 block;
	}

	text.axis-label {
		@apply font-mono text-xs uppercase fill-dark font-semibold;
	}
</style>
