<script>
	import { getContext } from 'svelte';
	import { line, curveStep } from 'd3-shape';

	const { data, xGet, yGet } = getContext('LayerCake');

	export let curve = curveStep;

	$: path = line().x($xGet).y($yGet).curve(curve);
</script>

<path d={path($data)} stroke-width="2" fill="none" />

<style lang="postcss">
	path {
		@apply stroke-dark;
	}
</style>
