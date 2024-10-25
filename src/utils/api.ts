// utils/api.ts
import { HfInference } from '@huggingface/inference'

const inference = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)

// Using a different medical model that's more reliable
// You can switch between these models
const MODEL_ID = "google/flan-t5-base" // Alternative: "google/flan-t5-base"

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function generateMedicalResponse(input: string, maxRetries = 3): Promise<string> {
  let retries = 0

  while (retries < maxRetries) {
    try {
      // First check if model is ready
      const modelResponse = await fetch(
        `https://api-inference.huggingface.co/models/${MODEL_ID}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          },
        }
      )

      const modelStatus = await modelResponse.json()

      // If model is loading, wait before retrying
      if (modelStatus.error?.includes('loading')) {
        console.log('Model is loading, waiting before retry...')
        await wait(2000) // Wait 2 seconds before retrying
        retries++
        continue
      }

      const response = await inference.textGeneration({
        model: MODEL_ID,
        inputs: input,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false,
        }
      })

      return response.generated_text

    } catch (error) {
      console.error(`Attempt ${retries + 1} failed:`, error)
      
      if (retries === maxRetries - 1) {
        throw new Error('Failed to generate response after maximum retries')
      }
      
      // Exponential backoff
      await wait(Math.pow(2, retries) * 1000)
      retries++
    }
  }

  throw new Error('Failed to generate response')
}