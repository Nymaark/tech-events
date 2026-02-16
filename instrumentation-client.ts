import posthog from 'posthog-js';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
if (key) {
  try {
    posthog.init(key, {
      api_host: '/ingest',
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // Include the defaults option as required by PostHog
      defaults: '2025-11-30',
      // Enables capturing unhandled exceptions via Error Tracking
      capture_exceptions: true,
      // Turn on debug in development mode
      debug: process.env.NODE_ENV === 'development',
    });
  } catch (_) {
    // Avoid breaking the app if PostHog init fails (e.g. ad blocker, network)
  }
}

// IMPORTANT: Never combine this approach with other client-side PostHog initialization approaches,
// especially components like a PostHogProvider. instrumentation-client.ts is the correct solution
// for initializing client-side PostHog in Next.js 15.3+ apps.
