<script lang="ts">
	import { z } from 'zod';
	import { PredictionArrayParser } from '$lib/data';
	import { data } from '$lib/stores';

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

<input bind:files type="file" name="file-input" />
{#if error}
	<p class="error">&#x2551; {error}</p>
{:else if !files}
	<p class="neutral">&#x2551; Visualizing random data.</p>
{:else}
	<p class="success ">&#x2551; Visualizing metrics below.</p>
{/if}

<style lang="postcss">
	input {
		@apply w-full block text-sm rounded-sm border border-dark text-dark bg-inherit font-mono form-input file:mr-4;
	}

	p.error {
		@apply font-mono mt-4 mb-8 text-sm text-vintage-red;
	}

	p.neutral {
		@apply font-mono mt-4 mb-8 text-sm text-dark;
	}

	p.success {
		@apply font-mono mt-4 mb-8 text-sm text-vintage-aqua;
	}
</style>
