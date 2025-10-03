import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Runtime check for API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY is not set. Add it in Vercel → Project → Settings → Environment Variables.');
}

const openai = apiKey ? new OpenAI({ apiKey }) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if OpenAI client is initialized
  if (!openai) {
    console.error('OpenAI client not initialized - missing API key');
    return res.status(500).json({
      error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to Vercel environment variables.'
    });
  }

  try {
    const { prompt, size, quality } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Invalid request: prompt is required' });
    }

    // Call OpenAI Images API (DALL·E 3)
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: size || '1024x1024',
      quality: quality || 'standard',
      response_format: 'url',
    });

    if (!response.data || response.data.length === 0) {
      return res.status(500).json({ error: 'No image data returned from API' });
    }

    const imageData = response.data[0];

    if (!imageData?.url) {
      return res.status(500).json({ error: 'No image URL returned from API' });
    }

    return res.status(200).json({
      imageUrl: imageData.url,
      revisedPrompt: imageData.revised_prompt,
    });
  } catch (error: any) {
    console.error('Image generation API error:', error);

    if (error?.message?.includes('API key')) {
      return res.status(500).json({
        error: 'OpenAI API key not configured properly.'
      });
    }

    if (error?.message?.includes('rate limit')) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.'
      });
    }

    if (error?.message?.includes('content policy')) {
      return res.status(400).json({
        error: 'Your prompt violates content policy. Please try a different prompt.'
      });
    }

    return res.status(500).json({
      error: error?.message || 'Something went wrong. Please try again.'
    });
  }
}
