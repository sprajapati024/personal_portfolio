interface WeatherData {
  temperature: number;
  condition: string;
  emoji: string;
  aiMessage: string;
  city: string;
}

export const fetchWeather = async (): Promise<WeatherData> => {
  try {
    const response = await fetch('/api/weather');

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Weather service error:', error);

    // Return fallback data
    return {
      temperature: 0,
      condition: 'Unknown',
      emoji: '🌤️',
      aiMessage: "Weather data on vacation, check back later!",
      city: 'Brampton'
    };
  }
};
