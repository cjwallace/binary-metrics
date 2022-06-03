<script lang="ts">
	import { getContext } from 'svelte';

	const { xScale, xRange } = getContext('LayerCake');
	export let y: number;
	export let value: number;
</script>

<rect x={$xRange[0]} {y} height="20" width={$xRange[1]} fill="#aaaaaa" />
<text x={$xRange[1]} {y} dx="5" dy="16" class="font-mono text-sm text-[#1f2937]"
	>{value.toFixed(2)}</text
>
<rect x={$xRange[0]} {y} height="20" width={$xScale(value)} fill="#1f2937" />
