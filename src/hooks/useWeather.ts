import { useEffect, useState } from "react";

// Open-Meteo WMO weather codes → emoji + label
function getWeatherInfo(code: number): { emoji: string; label: string } {
  if (code === 0) return { emoji: "☀️", label: "Ясно" };
  if (code <= 2) return { emoji: "🌤️", label: "Малохмарно" };
  if (code === 3) return { emoji: "☁️", label: "Хмарно" };
  if (code <= 48) return { emoji: "🌫️", label: "Туман" };
  if (code <= 55) return { emoji: "🌦️", label: "Мряка" };
  if (code <= 65) return { emoji: "🌧️", label: "Дощ" };
  if (code <= 75) return { emoji: "❄️", label: "Сніг" };
  if (code <= 82) return { emoji: "🌧️", label: "Злива" };
  if (code <= 86) return { emoji: "🌨️", label: "Снігопад" };
  return { emoji: "⛈️", label: "Гроза" };
}

interface WeatherData {
  temperature: number;
  emoji: string;
  label: string;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = () => {
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=50.4756&longitude=24.2919&current=temperature_2m,weather_code&timezone=Europe%2FKyiv",
        { signal: controller.signal },
      )
        .then((res) => res.json())
        .then((data) => {
          const temp = Math.round(data.current.temperature_2m);
          const code = data.current.weather_code;
          setWeather({ temperature: temp, ...getWeatherInfo(code) });
        })
        .catch(() => {
          /* silently ignore */
        });
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 10_000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return weather;
}
