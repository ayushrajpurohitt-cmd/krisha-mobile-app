// Weather API service for real weather data
// Using OpenWeatherMap API

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    description: string;
    icon: string;
    feelsLike: number;
  };
  forecast: Array<{
    date: string;
    temp: { min: number; max: number };
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  }>;
  location: {
    name: string;
    country: string;
  };
}

export interface WeatherError {
  error: string;
  message: string;
}

// Get current weather by coordinates
export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData | WeatherError> {
  try {
    if (!WEATHER_API_KEY) {
      return {
        error: 'API_KEY_MISSING',
        message: 'Weather API key not configured'
      };
    }

    const response = await fetch(
      `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      return {
        error: 'API_ERROR',
        message: `Weather API error: ${response.status}`
      };
    }

    const data = await response.json();
    
    return {
      current: {
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(data.visibility / 1000), // Convert m to km
        description: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].icon),
        feelsLike: Math.round(data.main.feels_like)
      },
      forecast: [], // Will be populated by getForecast
      location: {
        name: data.name,
        country: data.sys.country
      }
    };
  } catch (error) {
    return {
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch weather data'
    };
  }
}

// Get 7-day forecast
export async function getForecast(lat: number, lon: number): Promise<WeatherData | WeatherError> {
  try {
    if (!WEATHER_API_KEY) {
      return {
        error: 'API_KEY_MISSING',
        message: 'Weather API key not configured'
      };
    }

    const response = await fetch(
      `${WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      return {
        error: 'API_ERROR',
        message: `Weather API error: ${response.status}`
      };
    }

    const data = await response.json();
    
    // Process forecast data
    const forecast = data.list.slice(0, 7).map((item: { dt: number; main: { temp_min: number; temp_max: number; humidity: number }; weather: Array<{ main: string; description: string; icon: string }>; wind: { speed: number } }, index: number) => ({
      date: index === 0 ? 'Today' : 
            index === 1 ? 'Tomorrow' : 
            new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
      temp: {
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max)
      },
      description: item.weather[0].description,
      icon: getWeatherIcon(item.weather[0].icon),
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed * 3.6)
    }));

    return {
      current: {
        temp: Math.round(data.list[0].main.temp),
        humidity: data.list[0].main.humidity,
        windSpeed: Math.round(data.list[0].wind.speed * 3.6),
        visibility: Math.round(data.list[0].visibility / 1000),
        description: data.list[0].weather[0].description,
        icon: getWeatherIcon(data.list[0].weather[0].icon),
        feelsLike: Math.round(data.list[0].main.feels_like)
      },
      forecast,
      location: {
        name: data.city.name,
        country: data.city.country
      }
    };
  } catch (error) {
    return {
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch forecast data'
    };
  }
}

// Get weather by city name
export async function getWeatherByCity(city: string): Promise<WeatherData | WeatherError> {
  try {
    if (!WEATHER_API_KEY) {
      return {
        error: 'API_KEY_MISSING',
        message: 'Weather API key not configured'
      };
    }

    const response = await fetch(
      `${WEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      return {
        error: 'API_ERROR',
        message: `Weather API error: ${response.status}`
      };
    }

    const data = await response.json();
    
    return {
      current: {
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        visibility: Math.round(data.visibility / 1000),
        description: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].icon),
        feelsLike: Math.round(data.main.feels_like)
      },
      forecast: [],
      location: {
        name: data.name,
        country: data.sys.country
      }
    };
  } catch (error) {
    return {
      error: 'NETWORK_ERROR',
      message: 'Failed to fetch weather data'
    };
  }
}

// Convert OpenWeatherMap icon codes to text descriptions
function getWeatherIcon(iconCode: string): string {
  const iconMap: { [key: string]: string } = {
    '01d': 'clear-day', // clear sky day
    '01n': 'clear-night', // clear sky night
    '02d': 'partly-cloudy', // few clouds day
    '02n': 'cloudy', // few clouds night
    '03d': 'cloudy', // scattered clouds
    '03n': 'cloudy',
    '04d': 'cloudy', // broken clouds
    '04n': 'cloudy',
    '09d': 'rain', // shower rain
    '09n': 'rain',
    '10d': 'rain', // rain
    '10n': 'rain',
    '11d': 'thunderstorm', // thunderstorm
    '11n': 'thunderstorm',
    '13d': 'snow', // snow
    '13n': 'snow',
    '50d': 'fog', // mist
    '50n': 'fog'
  };
  
  return iconMap[iconCode] || 'partly-cloudy';
}

// Get user's current location
export function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}
