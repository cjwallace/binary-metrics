import type { Label, Prediction } from './metrics';

const predictions = Array.from(Array(100).keys()).map((el) => el / 100);
const labels: Label[] = Array.from(Array(100).keys()).map(() => (Math.random() > 0.6 ? 1 : 0));

const defaultData: Prediction[] = predictions.map((p, i) => ({ probability: p, label: labels[i] }));

export default defaultData;
