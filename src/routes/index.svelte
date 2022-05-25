<script lang="ts">
	import { line, curveStep, curveBasis, scaleLinear } from 'd3';
	import data from './data.js';
	import metrics from './metrics';
	import type { Threshold, Metric } from './metrics.js';
	let el;

	// construct pr curve data
	const thresholds: Threshold[] = Array.from(Array(100).keys()).map((el) => el / 100);
	const metrices = thresholds.map((thresh) => metrics(data, thresh));
	console.log(metrices);

	// scales
	const xScale = scaleLinear().domain([0, 1]).range([5, 95]);
	const yScale = scaleLinear().domain([0, 1]).range([95, 5]);

	// path generator
	let path = line<Metric>()
		.x((d) => xScale(d.recall))
		.y((d) => yScale(d.precision))
		.curve(curveBasis);
</script>

<svg viewBox="0 0 100 100">
	<g>
		<path d={path(metrices)} fill="none" stroke="black" />
	</g>
</svg>
