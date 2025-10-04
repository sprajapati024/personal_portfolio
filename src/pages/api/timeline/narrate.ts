import type { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  media: string | null;
  tags: string[];
}

interface NarrateRequest {
  event: TimelineEvent;
}

interface NarrateResponse {
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NarrateResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event } = req.body as NarrateRequest;

  if (!event || !event.title || !event.description) {
    return res.status(400).json({ error: 'Invalid event data' });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const prompt = `You are a professional career narrator. Given this career milestone, expand it into 1-2 engaging sentences that tell a compelling story.

Event: ${event.title}
Date: ${event.date}
Location: ${event.location}
Description: ${event.description}
Tags: ${event.tags.join(', ')}

Provide a brief, engaging narration (1-2 sentences) that brings this moment to life. Be professional yet conversational.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional career storyteller who creates brief, engaging narratives about career milestones.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const narration = data.choices[0]?.message?.content?.trim() || 'Unable to generate narration.';

    return res.status(200).json({ text: narration });
  } catch (error) {
    console.error('Narration error:', error);
    return res.status(500).json({ error: 'Failed to generate narration' });
  }
}
