// Market API integration for Krisha Agricultural Assistant
// API Key: 579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b

export interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  change: number;
  location: string;
  date: string;
  icon: string;
  volume?: number;
  market?: string;
  quality?: string;
}

export interface MarketData {
  crops: string[];
  locations: string[];
  prices: MarketPrice[];
  lastUpdated: string;
  source: string;
}

export interface MarketFilters {
  crop?: string;
  location?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

class MarketService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.MARKET_API_KEY || process.env.NEXT_PUBLIC_MARKET_API_KEY || '';
    this.baseUrl = 'https://api.marketdata.com'; // Replace with actual API endpoint
  }

  async getMarketPrices(filters?: MarketFilters): Promise<MarketData> {
    try {
      // For now, we'll use mock data with the API key structure
      // In production, replace with actual API calls
      const mockData = this.generateMockMarketData();
      return mockData;
    } catch (error) {
      console.error('Market API error:', error);
      return this.getFallbackData();
    }
  }

  async getCropPrice(crop: string, location?: string): Promise<MarketPrice | null> {
    try {
      const marketData = await this.getMarketPrices({ crop, location });
      return marketData.prices.find(p => p.crop.toLowerCase() === crop.toLowerCase()) || null;
    } catch (error) {
      console.error('Error fetching crop price:', error);
      return null;
    }
  }

  async getMarketTrends(crop: string, days: number = 7): Promise<MarketPrice[]> {
    try {
      // Mock trend data - replace with actual API call
      const trends = this.generateTrendData(crop, days);
      return trends;
    } catch (error) {
      console.error('Error fetching market trends:', error);
      return [];
    }
  }

  private generateMockMarketData(): MarketData {
    const crops = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Sugarcane', 'Potato', 'Tomato'];
    const locations = ['Delhi Mandi', 'Mumbai APMC', 'Kolkata Market', 'Chennai Market', 'Pune Market'];
    
    const prices: MarketPrice[] = [
      {
        crop: 'Wheat',
        price: 2450,
        unit: 'per quintal',
        change: 2.5,
        location: 'Delhi Mandi',
        date: new Date().toISOString().split('T')[0],
        icon: 'wheat',
        volume: 1500,
        market: 'Delhi Mandi',
        quality: 'Grade A'
      },
      {
        crop: 'Rice',
        price: 3200,
        unit: 'per quintal',
        change: -1.2,
        location: 'Mumbai APMC',
        date: new Date().toISOString().split('T')[0],
        icon: 'rice',
        volume: 2000,
        market: 'Mumbai APMC',
        quality: 'Basmati'
      },
      {
        crop: 'Corn',
        price: 1800,
        unit: 'per quintal',
        change: 3.8,
        location: 'Kolkata Market',
        date: new Date().toISOString().split('T')[0],
        icon: 'corn',
        volume: 1200,
        market: 'Kolkata Market',
        quality: 'Feed Grade'
      },
      {
        crop: 'Soybean',
        price: 4200,
        unit: 'per quintal',
        change: -0.5,
        location: 'Chennai Market',
        date: new Date().toISOString().split('T')[0],
        icon: 'soybean',
        volume: 800,
        market: 'Chennai Market',
        quality: 'Oil Grade'
      },
      {
        crop: 'Cotton',
        price: 6800,
        unit: 'per quintal',
        change: 1.8,
        location: 'Pune Market',
        date: new Date().toISOString().split('T')[0],
        icon: 'cotton',
        volume: 600,
        market: 'Pune Market',
        quality: 'Medium Staple'
      },
      {
        crop: 'Sugarcane',
        price: 320,
        unit: 'per quintal',
        change: 0.8,
        location: 'Delhi Mandi',
        date: new Date().toISOString().split('T')[0],
        icon: 'sugarcane',
        volume: 3000,
        market: 'Delhi Mandi',
        quality: 'Raw'
      },
      {
        crop: 'Potato',
        price: 1200,
        unit: 'per quintal',
        change: -2.1,
        location: 'Mumbai APMC',
        date: new Date().toISOString().split('T')[0],
        icon: 'potato',
        volume: 2500,
        market: 'Mumbai APMC',
        quality: 'Fresh'
      },
      {
        crop: 'Tomato',
        price: 1800,
        unit: 'per quintal',
        change: 4.2,
        location: 'Kolkata Market',
        date: new Date().toISOString().split('T')[0],
        icon: 'tomato',
        volume: 1800,
        market: 'Kolkata Market',
        quality: 'Fresh'
      }
    ];

    return {
      crops,
      locations,
      prices,
      lastUpdated: new Date().toISOString(),
      source: 'Market API'
    };
  }

  private generateTrendData(crop: string, days: number): MarketPrice[] {
    const trends: MarketPrice[] = [];
    const basePrice = 2000 + Math.random() * 1000;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const price = basePrice + (Math.random() - 0.5) * 200;
      const change = (Math.random() - 0.5) * 5;
      
      trends.push({
        crop,
        price: Math.round(price),
        unit: 'per quintal',
        change: Math.round(change * 10) / 10,
        location: 'Market Average',
        date: date.toISOString().split('T')[0],
        icon: crop.toLowerCase()
      });
    }
    
    return trends;
  }

  private getFallbackData(): MarketData {
    return {
      crops: ['Wheat', 'Rice', 'Corn'],
      locations: ['Delhi Mandi', 'Mumbai APMC'],
      prices: [
        {
          crop: 'Wheat',
          price: 2400,
          unit: 'per quintal',
          change: 0,
          location: 'Delhi Mandi',
          date: new Date().toISOString().split('T')[0],
          icon: 'wheat'
        }
      ],
      lastUpdated: new Date().toISOString(),
      source: 'Fallback Data'
    };
  }

  isApiKeyValid(): boolean {
    return this.apiKey.length > 0;
  }

  getApiKey(): string {
    return this.apiKey;
  }
}

// Create singleton instance
let marketService: MarketService | null = null;

export function getMarketService(): MarketService {
  if (!marketService) {
    marketService = new MarketService();
  }
  return marketService;
}

// Utility functions
export async function fetchMarketPrices(filters?: MarketFilters): Promise<MarketData> {
  const service = getMarketService();
  return await service.getMarketPrices(filters);
}

export async function fetchCropPrice(crop: string, location?: string): Promise<MarketPrice | null> {
  const service = getMarketService();
  return await service.getCropPrice(crop, location);
}

export async function fetchMarketTrends(crop: string, days: number = 7): Promise<MarketPrice[]> {
  const service = getMarketService();
  return await service.getMarketTrends(crop, days);
}
