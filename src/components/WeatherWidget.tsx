import { useState, useEffect } from 'react';
import { fetchWeather } from '../services/weatherService';

interface WeatherData {
  temperature: number;
  condition: string;
  emoji: string;
  aiMessage: string;
  city: string;
}

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      const data = await fetchWeather();
      setWeather(data);
      setLoading(false);
    };

    loadWeather();

    // Refresh weather every 30 minutes
    const interval = setInterval(loadWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !weather) {
    return (
      <div className="fixed top-2 right-2 bg-[#ECE9D8] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-r-[#0A0A0A] border-b-[#0A0A0A] shadow-lg" style={{ width: '280px' }}>
        <div className="bg-gradient-to-r from-[#0054E3] to-[#1084D0] px-2 py-1 flex items-center justify-between">
          <span className="text-white font-bold text-sm">Weather</span>
        </div>
        <div className="p-3 text-center text-sm">
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-2 right-2 bg-[#ECE9D8] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-r-[#0A0A0A] border-b-[#0A0A0A] shadow-lg" style={{ width: '280px' }}>
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-[#0054E3] to-[#1084D0] px-2 py-1 flex items-center justify-between">
        <span className="text-white font-bold text-sm">Weather - {weather.city}</span>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Temperature and Icon */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-4xl">{weather.emoji}</span>
            <div>
              <div className="text-3xl font-bold text-gray-800">{weather.temperature}°C</div>
              <div className="text-sm text-gray-600">{weather.condition}</div>
            </div>
          </div>
        </div>

        {/* AI Message */}
        <div className="mt-3 p-2 bg-white border border-gray-400 rounded">
          <p className="text-xs text-gray-700 italic">"{weather.aiMessage}"</p>
        </div>
      </div>
    </div>
  );
};
