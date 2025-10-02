<<<<<<< HEAD
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const ai = genkit({
  plugins: [googleAI()],
  model: "googleai/gemini-2.0-flash",
=======
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
});
