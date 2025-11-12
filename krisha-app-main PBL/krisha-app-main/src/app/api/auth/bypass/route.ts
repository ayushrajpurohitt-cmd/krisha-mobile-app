import { NextRequest, NextResponse } from 'next/server';
import { bypassLogin, isBypassModeEnabled } from '@/lib/auth-bypass';

export async function POST(request: NextRequest) {
  try {
    // Check if bypass mode is enabled
    if (!isBypassModeEnabled()) {
      return NextResponse.json({ error: 'Bypass mode is not enabled' }, { status: 403 });
    }

    // Get bypass credentials
    const result = bypassLogin();
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Bypass authentication failed' }, { status: 500 });
  }
}
