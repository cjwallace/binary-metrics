<script>
	import { getContext } from 'svelte';
	import { line, curveStep } from 'd3-shape';

	const { data, xGet, yGet } = getContext('LayerCake');

	export let stroke = '#1f2937';

	export let curve = curveStep;

	$: path = line().x($xGet).y($yGet).curve(curve);
</script>

<path d={path($data)} {stroke} stroke-width="2" fill="none" />
