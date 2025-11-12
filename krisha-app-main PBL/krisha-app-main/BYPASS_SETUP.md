# Bypass Login Setup for Production

## Overview
The Krisha app includes a bypass login feature that allows instant access without registration. This is useful for demos and testing.

## How to Enable Bypass Login in Production

### Option 1: Environment Variables (Recommended)
Add these environment variables to your production deployment:

```bash
# Enable bypass mode
ENABLE_AUTH_BYPASS=true
NEXT_PUBLIC_BYPASS_AUTH=true
```

### Option 2: Default Behavior
By default, bypass mode is enabled unless explicitly disabled. To disable it, set:

```bash
DISABLE_AUTH_BYPASS=true
```

## Environment Variables for Vercel

In your Vercel dashboard, add these environment variables:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
ENABLE_AUTH_BYPASS = true
NEXT_PUBLIC_BYPASS_AUTH = true
```

## How It Works

- **Bypass Button**: Red "Demo Login" button appears in bottom-right corner
- **Demo Credentials**: Uses `demo@krisha.com` / `demo123`
- **Instant Access**: One-click login to full app functionality
- **Security**: Only works when bypass mode is enabled

## Security Considerations

- Bypass mode is safe for demos and testing
- Can be disabled for production by setting `DISABLE_AUTH_BYPASS=true`
- Uses demo credentials that don't affect real user data
- Perfect for presentations and user testing

## Troubleshooting

If the bypass button is not showing:

1. Check environment variables are set correctly
2. Ensure `ENABLE_AUTH_BYPASS=true` or `NEXT_PUBLIC_BYPASS_AUTH=true`
3. Verify `DISABLE_AUTH_BYPASS` is not set to `true`
4. Clear browser cache and refresh the page

## Demo Usage

1. Visit the home page
2. Look for red "Demo Login" button in bottom-right corner
3. Click the button to instantly access the dashboard
4. Full app functionality available without registration
