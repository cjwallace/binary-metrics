<script lang="ts">
	import { getContext } from 'svelte';

	const { xScale, xRange } = getContext('LayerCake');

	export let y: number;
	export let value: number;
	export let color: string;
	export let label = '';
</script>

<text class="label" {y} x={$xRange[0]}>{label}</text>
<rect x={$xRange[0]} y={y + 5} height="20" width={$xScale(value)} class={color} />
<rect x={$xRange[0]} y={y + 5} height="20" width={$xRange[1]} fill-opacity="0" class="bar-border" />

<text x={$xRange[1]} y={y + 5} dx="15" dy="15">{value.toFixed(2)}</text>

<style lang="postcss">
	text {
		@apply font-mono text-sm fill-dark;
	}

	text.label {
		@apply uppercase;
	}

	rect.bar-border {
		@apply stroke-dark stroke-2;
	}

	rect.aqua {
		@apply fill-vintage-aqua;
	}

	rect.red {
		@apply fill-vintage-red;
	}

	rect.yellow {
		@apply fill-vintage-yellow;
	}

	rect.brown {
		@apply fill-vintage-brown;
	}
</style>
