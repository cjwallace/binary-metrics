<script lang="ts">
	import { getContext } from 'svelte';

	const { xScale, xRange } = getContext('LayerCake');

	export let y: number;
	export let value: number;
	export let color: string;
	export let label = '';
</script>

<text class="font-mono text-sm uppercase fill-dark" {y} x={$xRange[0]}>{label}</text>
<rect x={$xRange[0]} y={y + 5} height="20" width={$xScale(value)} class={color} />
<rect
	x={$xRange[0]}
	y={y + 5}
	height="20"
	width={$xRange[1]}
	fill-opacity="0"
	class="stroke-dark stroke-2"
/>

<text x={$xRange[1]} y={y + 5} dx="15" dy="15" class="font-mono text-sm text-dark"
	>{value.toFixed(2)}</text
>
