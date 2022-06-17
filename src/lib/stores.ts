import { writable } from 'svelte/store';
import defaultData from '$lib/data';

export const data = writable(defaultData);
