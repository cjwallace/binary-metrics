<script lang="ts">
	import { getContext } from 'svelte';

	let { xScale, yScale } = getContext('LayerCake');
	export let circleX: number;
	export let circleY: number;

	$: cx = $xScale(circleX);
	$: cy = $yScale(circleY);
</script>

<circle {cx} {cy} r="4" class="fill-vintage-red" />
