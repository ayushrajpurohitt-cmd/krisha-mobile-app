import { NextRequest, NextResponse } from 'next/server';
import { getMarketService } from '@/lib/market';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get('crop');
    const location = searchParams.get('location');
    const type = searchParams.get('type') || 'prices';

    const marketService = getMarketService();

    // Check if API key is configured
    if (!marketService.isApiKeyValid()) {
      return NextResponse.json({ 
        error: 'Market API key not configured',
        fallback: true 
      }, { status: 400 });
    }

    switch (type) {
      case 'prices':
        const filters = {
          crop: crop || undefined,
          location: location || undefined
        };
        const marketData = await marketService.getMarketPrices(filters);
        return NextResponse.json({ 
          success: true, 
          data: marketData,
          apiKey: marketService.getApiKey().substring(0, 8) + '...' // Show partial key for debugging
        });

      case 'trends':
        if (!crop) {
          return NextResponse.json({ error: 'Crop parameter required for trends' }, { status: 400 });
        }
        const trends = await marketService.getMarketTrends(crop, 7);
        return NextResponse.json({ 
          success: true, 
          data: trends,
          crop,
          days: 7
        });

      case 'crop':
        if (!crop) {
          return NextResponse.json({ error: 'Crop parameter required' }, { status: 400 });
        }
        const cropPrice = await marketService.getCropPrice(crop, location || undefined);
        if (cropPrice) {
          return NextResponse.json({ 
            success: true, 
            data: cropPrice
          });
        } else {
          return NextResponse.json({ 
            success: false, 
            error: 'Crop price not found' 
          }, { status: 404 });
        }

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Market API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, crop, location, filters } = body;

    const marketService = getMarketService();

    if (!marketService.isApiKeyValid()) {
      return NextResponse.json({ 
        error: 'Market API key not configured',
        fallback: true 
      }, { status: 400 });
    }

    switch (action) {
      case 'get_prices':
        const marketData = await marketService.getMarketPrices(filters);
        return NextResponse.json({ 
          success: true, 
          data: marketData
        });

      case 'get_crop_price':
        if (!crop) {
          return NextResponse.json({ error: 'Crop parameter required' }, { status: 400 });
        }
        const cropPrice = await marketService.getCropPrice(crop, location);
        return NextResponse.json({ 
          success: true, 
          data: cropPrice
        });

      case 'get_trends':
        if (!crop) {
          return NextResponse.json({ error: 'Crop parameter required' }, { status: 400 });
        }
        const trends = await marketService.getMarketTrends(crop, 7);
        return NextResponse.json({ 
          success: true, 
          data: trends
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Market API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
