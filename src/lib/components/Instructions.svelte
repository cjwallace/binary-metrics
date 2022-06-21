<div>
	<p>
		Hi! This app will visualize the precision-recall curve, and separately the precision, recall,
		accuracy, and f1-score of a binary classifier <span class="bold"
			>as a function of the classification threshold</span
		>.
	</p>
	<p>
		Everything runs in the browser, so all you need to do is upload a JSON with the right structure.
		Unfortunately, that structure is extremely specific (because I didn't write more handling code
		for it). Upload a `.json` file that is structured like this (for clarity, the <em>formatting</em
		> does not matter):
	</p>
	<pre>
    <code>
      [
        &lbrace
          "probability": 0.10,
          "label": 0
        &rbrace,
        &lbrace
          "probability": 0.46,
          "label": 1
        &rbrace,
        ...
      ]
	  </code>
  </pre>
	<h2>Hard constraints:</h2>
	<ul>
		<li>The keys must be exactly the words "probability" and "label".</li>
		<li>"probability" must be followed by a number in the range 0 to 1, inclusive.</li>
		<li>"label" by the integer 0 or the integer 1.</li>
	</ul>
	<p>
		By way of example, the script used to generate the example data that is preloaded in the app is <a
			rel="external"
			href="https://github.com/cjwallace/binary_metrics_data/blob/b6b2e0c8082a796df7dc7607716e6a447cf29096/fake_classification_data/generate.py"
			>here</a
		>.
	</p>
	<h2>Soft constraints:</h2>
	<p>
		There's no hard limit on the number of entries in the JSON, except that imposed by the memory of
		your web browser. However, at some point, it's gonna get real slow. The app is buttery smooth on
		a 2020 MBP with 16GB RAM and a 2.6Ghz 6-Core Intel i7, up to a few thousand data points. Things
		get squiffy but usable at at 100k-ish points (corresponding to a ~3.5 MB JSON file).
	</p>
	<p>
		<span class="aqua"> None of the data you upload here is logged anywhere. </span>
		Everything runs browser-side. I don't want your data. The site uses privacy preserving analytics
		to count views, and that's all.
	</p>
</div>

<style lang="postcss">
	h2 {
		@apply font-bold py-2;
	}

	p {
		@apply my-2;
	}

	div {
		@apply font-mono text-dark text-sm px-4;
	}

	ul {
		@apply list-disc;
	}

	a {
		@apply underline underline-offset-2;
	}

	span.bold {
		@apply font-bold;
	}

	span.aqua {
		@apply text-vintage-aqua font-bold;
	}
</style>
