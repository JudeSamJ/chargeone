<<<<<<< HEAD
"use server";
=======
'use server';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
/**
 * @fileOverview An AI flow to identify a vehicle's make and model from a photo.
 *
 * - identifyVehicle - A function that handles the vehicle identification process.
 * - IdentifyVehicleInput - The input type for the identifyVehicle function.
 * - IdentifyVehicleOutput - The return type for the identifyVehicle function.
 */

<<<<<<< HEAD
import { ai } from "@/ai/genkit";
import { z } from "genkit";
=======
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

const IdentifyVehicleInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a vehicle, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyVehicleInput = z.infer<typeof IdentifyVehicleInputSchema>;

const IdentifyVehicleOutputSchema = z.object({
<<<<<<< HEAD
  make: z
    .string()
    .describe("The make of the identified vehicle (e.g., 'Tesla')."),
  model: z
    .string()
    .describe("The model of the identified vehicle (e.g., 'Model Y')."),
});
export type IdentifyVehicleOutput = z.infer<typeof IdentifyVehicleOutputSchema>;

export async function identifyVehicle(
  input: IdentifyVehicleInput
): Promise<IdentifyVehicleOutput> {
=======
  make: z.string().describe("The make of the identified vehicle (e.g., 'Tesla')."),
  model: z.string().describe("The model of the identified vehicle (e.g., 'Model Y')."),
});
export type IdentifyVehicleOutput = z.infer<typeof IdentifyVehicleOutputSchema>;

export async function identifyVehicle(input: IdentifyVehicleInput): Promise<IdentifyVehicleOutput> {
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  return identifyVehicleFlow(input);
}

const prompt = ai.definePrompt({
<<<<<<< HEAD
  name: "identifyVehiclePrompt",
=======
  name: 'identifyVehiclePrompt',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  input: { schema: IdentifyVehicleInputSchema },
  output: { schema: IdentifyVehicleOutputSchema },
  prompt: `You are an expert in vehicle identification. Analyze the provided image of a car and identify its make and model. 
  
  If you cannot confidently identify the vehicle, return "Unknown" for both make and model.

  Photo: {{media url=photoDataUri}}`,
});

const identifyVehicleFlow = ai.defineFlow(
  {
<<<<<<< HEAD
    name: "identifyVehicleFlow",
=======
    name: 'identifyVehicleFlow',
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    inputSchema: IdentifyVehicleInputSchema,
    outputSchema: IdentifyVehicleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
<<<<<<< HEAD
      throw new Error("Failed to get a structured response from the model.");
=======
      throw new Error('Failed to get a structured response from the model.');
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
    }
    return output;
  }
);
