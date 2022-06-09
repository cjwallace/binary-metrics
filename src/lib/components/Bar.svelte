<script lang="ts">
	import { getContext } from 'svelte';

	const { xScale, xRange } = getContext('LayerCake');
	export let y: number;
	export let value: number;
	export let color: string = '#1f2937';
	export let label = '';
</script>

<text class="font-mono text-sm uppercase fill-[#1f2937]" {y} x={$xRange[0]}>{label}</text>
<rect x={$xRange[0]} y={y + 5} height="20" width={$xScale(value)} fill={color} />
<rect
	x={$xRange[0]}
	y={y + 5}
	height="20"
	width={$xRange[1]}
	fill-opacity="0"
	class="stroke-[#1f2937] stroke-2"
/>

<text x={$xRange[1]} y={y + 5} dx="25" dy="16" class="font-mono text-sm text-[#1f2937]"
	>{value.toFixed(2)}</text
>
