import data from '$lib/predictions.json';
import { z } from 'zod';

const PredictionParser = z.object({
	probability: z.number().gte(0).lte(1), // must be between 0 and 1 (inclusive)
	label: z.literal(0).or(z.literal(1)) // must be exactly 0 or 1
});

export const PredictionArrayParser = z.array(PredictionParser);

const defaultData = PredictionArrayParser.parse(data);

export default defaultData;
