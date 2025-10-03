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
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const assistantMessage = completion.choices[0]?.message?.content ||
      "Sorry, I couldn't process that. Can you try rephrasing?";

    return res.status(200).json({ message: assistantMessage });
  } catch (error: any) {
    console.error('Chat API error:', error);

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

    return res.status(500).json({
      error: error?.message || 'Something went wrong. Please try again.'
    });
  }
}
