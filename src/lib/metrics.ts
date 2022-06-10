export type Label = 0 | 1;

export type Prediction = {
	probability: number;
	label: Label;
};

type BinarizedPrediction = { predictedLabel: Label } & Prediction;

export type Threshold = number;

export type Metrics = {
	precision: number;
	recall: number;
	accuracy: number;
	f1: number;
};

const binarize = (probability: number, threshold: number): Label =>
	probability > threshold ? 1 : 0;

const metrics = (predictions: Prediction[], threshold: Threshold): Metrics => {
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
	const f1 = (2 * (precision * recall)) / (precision + recall);

	if (threshold === 0) {
		return { precision, recall: 1.0, accuracy, f1 };
	} else if (threshold === 1 || tp + fp === 0) {
		return { precision: 1.0, recall: 0.0, accuracy, f1: 0.0 };
	}

	return { precision, recall, accuracy, f1 };
};

export default metrics;
