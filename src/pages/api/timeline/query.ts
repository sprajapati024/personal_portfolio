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

interface QueryRequest {
  question: string;
  events: TimelineEvent[];
}

interface QueryResponse {
  text: string;
  jump_to_id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, events } = req.body as QueryRequest;

  if (!question || !events || events.length === 0) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const eventsContext = events
      .map((e, i) => `${i + 1}. [ID: ${e.id}] ${e.date} - ${e.title} (${e.location}): ${e.description}`)
      .join('\n');

    const prompt = `You are an AI assistant helping users explore a career timeline. Answer the user's question based on the timeline events below. If the question relates to a specific event, include the event ID in your response.

Timeline Events:
${eventsContext}

User Question: ${question}

Instructions:
1. Answer the question based on the timeline events
2. If the question relates to a specific event, mention which one
3. Be concise and helpful (2-3 sentences max)
4. If you identify a relevant event, return its ID

Format your response as JSON:
{
  "text": "your answer here",
  "jump_to_id": "event-id or null"
}`;

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
            content: 'You are a helpful AI assistant that answers questions about career timeline events. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    const parsed = JSON.parse(content);

    return res.status(200).json({
      text: parsed.text || 'Unable to answer the question.',
      jump_to_id: parsed.jump_to_id || undefined
    });
  } catch (error) {
    console.error('Query error:', error);
    return res.status(500).json({ error: 'Failed to process query' });
  }
}
