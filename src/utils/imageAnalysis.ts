// utils/imageAnalysis.ts
import { Groq } from 'groq-sdk'

const groq = new Groq({ 
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
    dangerouslyAllowBrowser: true 
})

export async function analyzeImage(base64Image: string): Promise<string> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What's in this image?"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        },
        {
          role: "assistant",
          content: ""
        }
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    })

    const content = chatCompletion.choices[0].message.content
    if (content === null) {
      throw new Error('No content returned from image analysis')
    }
    return content
  } catch (error) {
    console.error('Error analyzing image:', error)
    throw new Error('Failed to analyze image')
  }
}
// Helper to extract base64 from data URL
export function getBase64FromDataUrl(dataUrl: string): string {
  return dataUrl.split(',')[1]
}