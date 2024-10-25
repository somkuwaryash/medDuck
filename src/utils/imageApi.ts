// utils/imageApi.ts
import { HfInference } from '@huggingface/inference'

const inference = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY)
const MODEL_ID = "kothariyashhh/GenAi-Texttoimage"

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Enhanced prompt generator with better contrast control
function enhancePrompt(
  basePrompt: string,
  isColorBlind: boolean,
  contrastLevel: 'high' | 'medium' | 'low'
): string {
  if (!isColorBlind) return basePrompt

  const contrastSettings = {
    high: {
      contrast: "maximum contrast",
      separation: "strong separation between elements",
      emphasis: "bold, clear outlines"
    },
    medium: {
      contrast: "moderate contrast",
      separation: "clear separation between elements",
      emphasis: "defined outlines"
    },
    low: {
      contrast: "subtle contrast",
      separation: "gentle separation between elements",
      emphasis: "soft outlines"
    }
  }[contrastLevel]

  return `Create a highly accessible image with:
    - ${contrastSettings.contrast}
    - ${contrastSettings.separation}
    - ${contrastSettings.emphasis}
    - Clear distinct patterns and textures
    - Well-defined shapes
    For the following scene: ${basePrompt}`
}

// Updated negative prompts based on contrast level
function getNegativePrompt(contrastLevel: 'high' | 'medium' | 'low'): string {
  const baseNegativePrompts = "unclear boundaries, faded, washed out, indistinct patterns"
  
  const contrastSpecificPrompts = {
    high: "low contrast, similar colors, muddy colors",
    medium: "extreme contrast, oversaturated, muddy colors",
    low: "harsh contrast, oversaturated, stark boundaries"
  }[contrastLevel]

  return `${baseNegativePrompts}, ${contrastSpecificPrompts}`
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
  const finalPrompt = enhancePrompt(
    prompt,
    options.enhanceForColorBlind ?? true,
    options.contrastLevel ?? 'high'
  )

  while (retries < maxRetries) {
    try {
      const response = await inference.textToImage({
        model: MODEL_ID,
        inputs: finalPrompt,
        parameters: {
          negative_prompt: getNegativePrompt(options.contrastLevel ?? 'high'),
          num_inference_steps: 30,
          guidance_scale: options.contrastLevel === 'high' ? 8.5 : 
                         options.contrastLevel === 'medium' ? 7.5 : 6.5,
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