export type Label = 0 | 1;

export type Prediction = {
	probability: number;
	label: Label;
};

type BinarizedPrediction = { predictedLabel: Label } & Prediction;

export type Threshold = number;

export type Metric = {
	precision: number;
	recall: number;
	accuracy: number;
};

const binarize = (probability: number, threshold: number): Label =>
	probability > threshold ? 1 : 0;

const metrics = (predictions: Prediction[], threshold: Threshold): Metric => {
	const binary: BinarizedPrediction[] = predictions.map((prediction) => ({
		predictedLabel: binarize(prediction.probability, threshold),
		...prediction
	}));

	const tp = binary.filter((b) => b.label === 1 && b.predictedLabel === 1).length;
	const tn = binary.filter((b) => b.label === 0 && b.predictedLabel === 0).length;
	const fp = binary.filter((b) => b.label === 0 && b.predictedLabel === 1).length;
	const fn = binary.filter((b) => b.label === 1 && b.predictedLabel === 0).length;

	const precision = tp / (tp + fp);
	const recall = tp / (tp + fn);
	const accuracy = (tp + tn) / (tp + tn + fp + fn);

	return { precision, recall, accuracy };
};

export default metrics;
