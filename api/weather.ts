import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openaiKey = process.env.OPENAI_API_KEY;
const weatherKey = process.env.OPENWEATHER_API_KEY;

const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

interface WeatherData {
  temperature: number;
  condition: string;
  emoji: string;
  aiMessage: string;
  city: string;
}

// Map OpenWeather condition codes to emoji
const getWeatherEmoji = (condition: string): string => {
  const lower = condition.toLowerCase();
  if (lower.includes('clear')) return '☀️';
  if (lower.includes('cloud')) return '☁️';
  if (lower.includes('rain')) return '🌧️';
  if (lower.includes('drizzle')) return '🌦️';
  if (lower.includes('thunder')) return '⛈️';
  if (lower.includes('snow')) return '❄️';
  if (lower.includes('mist') || lower.includes('fog')) return '🌫️';
  return '🌤️';
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!weatherKey) {
    return res.status(500).json({
      error: 'OPENWEATHER_API_KEY not configured'
    });
  }

  if (!openai) {
    return res.status(500).json({
      error: 'OPENAI_API_KEY not configured'
    });
  }

  try {
    // Default to Brampton, Ontario
    const { lat = '43.7315', lon = '-79.7624' } = req.query;

    // Fetch weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`
    );

    if (!weatherResponse.ok) {
      throw new Error('Weather API error');
    }

    const weatherData = await weatherResponse.json();
    const temp = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].main;
    const description = weatherData.weather[0].description;
    const city = weatherData.name;

    // Generate AI weather pun/message
    const prompt = `Generate a short, funny, professional weather pun or witty comment for this weather:
Temperature: ${temp}°C
Condition: ${condition} (${description})
City: ${city}

Requirements:
- ONE sentence only (max 12 words)
- Include a weather pun or wordplay
- Keep it professional but clever
- Don't mention the temperature or emoji (widget shows those separately)
- Examples: "Looks like the clouds are having a meltdown today", "Rain or shine, it's time to weather the day!", "The forecast is clear: productivity ahead!"`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 50,
    });

    const aiMessage = completion.choices[0]?.message?.content?.trim() ||
      "Weather you like it or not, here's the forecast!";

    const response: WeatherData = {
      temperature: temp,
      condition,
      emoji: getWeatherEmoji(condition),
      aiMessage,
      city
    };

    return res.status(200).json(response);
  } catch (error: any) {
    console.error('Weather API error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to fetch weather'
    });
  }
}
