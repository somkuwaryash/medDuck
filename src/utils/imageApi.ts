// utils/imageApi.ts
import { HfInference } from '@huggingface/inference'

const inference = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)
const MODEL_ID = "kothariyashhh/GenAi-Texttoimage"

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Color blind friendly prompt enhancer
function enhancePromptForColorBlind(basePrompt: string): string {
  const accessibilityPrompt = `Create a highly accessible image with: 
    - Strong contrast between elements
    - Clear distinct patterns and textures
    - Well-defined shapes and boundaries
    - High clarity and sharpness
    - Easily distinguishable elements
    - Clear separation between foreground and background
    For the following scene: ${basePrompt}
    Make sure the image is clear and distinguishable for color-blind viewers by using:
    - Strong tonal contrasts
    - Different textures for different elements
    - Clear outlines and borders
    - Distinct patterns where needed`

  return accessibilityPrompt
}

export async function generateImage(
  prompt: string, 
  maxRetries = 3, 
  options: {
    enhanceForColorBlind?: boolean
    contrastLevel?: 'high' | 'medium' | 'low'
  } = { enhanceForColorBlind: true, contrastLevel: 'high' }
): Promise<string> {
  let retries = 0

  const finalPrompt = options.enhanceForColorBlind 
    ? enhancePromptForColorBlind(prompt)
    : prompt

  // Adjust negative prompt for accessibility
  const accessibleNegativePrompt = "blurry, low contrast, similar colors, muddy colors, unclear boundaries, faded, washed out, indistinct patterns, unclear shapes"

  while (retries < maxRetries) {
    try {
      const response = await inference.textToImage({
        model: MODEL_ID,
        inputs: finalPrompt,
        parameters: {
          negative_prompt: accessibleNegativePrompt,
          num_inference_steps: 30,
          guidance_scale: 7.5,
        }
      })

      const buffer = await response.arrayBuffer()
      const base64 = Buffer.from(buffer).toString('base64')
      return `data:image/jpeg;base64,${base64}`

    } catch (error) {
      console.error(`Attempt ${retries + 1} failed:`, error)
      
      if (retries === maxRetries - 1) {
        throw new Error('Failed to generate image after maximum retries')
      }
      
      await wait(Math.pow(2, retries) * 1000)
      retries++
    }
  }

  throw new Error('Failed to generate image')
}