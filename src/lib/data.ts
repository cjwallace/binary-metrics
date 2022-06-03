import type { Label } from './metrics';

const predictions = Array.from(Array(100).keys()).map((el) => el / 100);
const zeros = new Array(50).fill(0);
const ones = new Array(50).fill(1);
// const labels: Label[] = zeros.concat(ones);
const labels: Label[] = Array.from(Array(100).keys()).map((el) => (Math.random() > 0.6 ? 1 : 0));

const data = predictions.map((p, i) => ({ probability: p, label: labels[i] }));

export default data;
