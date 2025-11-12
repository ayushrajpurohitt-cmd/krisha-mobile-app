import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWeather, getForecast, getWeatherByCity } from '@/lib/weather';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const city = searchParams.get('city');
    const type = searchParams.get('type') || 'current';

    let result;

    if (city) {
      // Get weather by city name
      result = await getWeatherByCity(city);
    } else if (lat && lon) {
      // Get weather by coordinates
      if (type === 'forecast') {
        result = await getForecast(parseFloat(lat), parseFloat(lon));
      } else {
        result = await getCurrentWeather(parseFloat(lat), parseFloat(lon));
      }
    } else {
      return NextResponse.json(
        { error: 'Missing parameters', message: 'Provide either city or lat/lon coordinates' },
        { status: 400 }
      );
    }

    if ('error' in result) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
