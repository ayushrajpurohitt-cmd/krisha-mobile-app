// Production bypass authentication system
// This allows direct access without login for development/testing purposes

export interface BypassUser {
  id: string;
  email: string;
  name: string;
}

// Default bypass user for production testing
export const BYPASS_USER: BypassUser = {
  id: 'bypass-user-123',
  email: 'demo@krisha.com',
  name: 'Demo Farmer'
};

// Check if bypass mode is enabled
export function isBypassModeEnabled(): boolean {
  // Enable bypass mode by default for demo purposes
  // Can be disabled by setting DISABLE_AUTH_BYPASS=true
  return process.env.NODE_ENV === 'development' || 
         process.env.ENABLE_AUTH_BYPASS === 'true' ||
         process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true' ||
         process.env.DISABLE_AUTH_BYPASS !== 'true';
}

// Get bypass user
export function getBypassUser(): BypassUser {
  return BYPASS_USER;
}

// Generate bypass token
export function generateBypassToken(): string {
  return 'bypass-token-' + Date.now();
}

// Verify bypass token
export function verifyBypassToken(token: string): BypassUser | null {
  if (!isBypassModeEnabled()) {
    return null;
  }
  
  if (token.startsWith('bypass-token-')) {
    return BYPASS_USER;
  }
  
  return null;
}

// Bypass login function
export function bypassLogin(): { user: BypassUser; token: string } {
  if (!isBypassModeEnabled()) {
    throw new Error('Bypass mode is not enabled');
  }
  
  return {
    user: BYPASS_USER,
    token: generateBypassToken()
  };
}
