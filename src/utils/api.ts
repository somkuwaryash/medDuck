// utils/api.ts
import { Groq } from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true
})

// Define model ID type
export type ModelId = 'gemma-7b-it' | 'gemma-2b-it' | 'llama3-70b-4096' | 'llama3-8b-4096';

export const MODELS = [
  { id: 'gemma-7b-it' as const, name: 'Gemma 7B' },
  { id: 'gemma-2b-it' as const, name: 'Gemma 2 9B' },
  { id: 'llama3-70b-4096' as const, name: 'Llama 3.1 70B' },
  { id: 'llama3-8b-4096' as const, name: 'Llama 3.1 8B' }
] as const;

export async function generateChatResponse(
  messages: { role: 'user' | 'assistant', content: string }[],
  model: ModelId = 'gemma-7b-it',
  maxRetries = 3
): Promise<string> {
  let retries = 0;
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  while (retries < maxRetries) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: messages,
        model: model,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9,
        stream: false
      });

      return chatCompletion.choices[0]?.message?.content || 'No response generated';

    } catch (error) {
      console.error(`Attempt ${retries + 1} failed:`, error);
      
      if (retries === maxRetries - 1) {
        throw new Error('Failed to generate response after maximum retries');
      }
      
      await wait(Math.pow(2, retries) * 1000);
      retries++;
    }
  }

  throw new Error('Failed to generate response');
}