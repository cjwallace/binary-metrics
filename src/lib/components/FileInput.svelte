<script lang="ts">
	import { data } from '../../stores';
	import { z } from 'zod';
	import type { Prediction } from '$lib/metrics';

	const PredictionParser = z.object({
		probability: z.number().gte(0).lte(1), // must be between 0 and 1 (inclusive)
		label: z.literal(0).or(z.literal(1)) // must be exactly 0 or 1
	});

	const PredictionArrayParser = z.array(PredictionParser);

	let files: FileList;
	let error = '';

	function parseFile(file: File) {
		file
			.text()
			.then((f) => JSON.parse(f))
			.then((f) => PredictionArrayParser.safeParse(f))
			.then((f) => {
				if (!f.success) {
					// TODO: better error handling, can surface more information
					error = 'There was a problem parsing that file.';
					console.log(f.error);
				} else {
					console.log(f.data);
					// TODO: can we parse into Prediction[], or must we cast?
					data.set(f.data);
					error = '';
				}
			})
			.catch(() => {
				error = 'That is not a JSON file.';
			});
	}

	$: if (files) {
		let file: File = files[0];
		parseFile(file);
	}
</script>

<input
	bind:files
	type="file"
	name="file-input"
	class="w-full block text-sm rounde-sm border border-[#1f2937] text-[#1f2937] bg-inherit font-mono form-input file:mr-4"
/>
{#if error}
	<p class="font-mono w-100 mt-4 mb-8 text-sm text-[#cc6b49]">&#x2551; {error}</p>
{:else if !files}
	<p class="font-mono w-100 mt-4 mb-8 text-sm">&#x2551; Visualizing random data.</p>
{:else}
	<p class="font-mono w-100 mt-4 mb-8 text-sm text-[#74bda8]">
		&#x2551; Visualizing metrics below.
	</p>
{/if}
