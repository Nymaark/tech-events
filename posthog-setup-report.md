# PostHog post-wizard report

The wizard has completed a deep integration of your Tech Events project. PostHog has been configured using the recommended `instrumentation-client.ts` approach for Next.js 16.1.6 (App Router), with a reverse proxy setup to improve tracking reliability. The integration includes automatic pageview capture, session replay, error tracking, and custom event tracking for key user interactions.

## Events Added

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the 'Explore Events' button to scroll to the events section - top of conversion funnel | `app/components/explore-btn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details - key conversion action | `app/components/event-card.tsx` |
| `nav_link_clicked` | User clicked a navigation link in the navbar - helps understand user journey | `app/components/navbar.tsx` |
| `logo_clicked` | User clicked the logo to navigate home | `app/components/navbar.tsx` |

## Files Modified

| File | Changes |
|------|---------|
| `.env.local` | Added PostHog environment variables (`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`) |
| `instrumentation-client.ts` | **New file** - Client-side PostHog initialization with exception capture and debug mode |
| `next.config.ts` | Added reverse proxy rewrites for PostHog to improve tracking reliability |
| `app/components/explore-btn.tsx` | Added `explore_events_clicked` event capture |
| `app/components/event-card.tsx` | Added `event_card_clicked` event capture with event properties |
| `app/components/navbar.tsx` | Added `nav_link_clicked` and `logo_clicked` event captures |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://eu.posthog.com/project/122041/dashboard/508796) - Core analytics dashboard for the Tech Events application

### Insights
- [Event Card Clicks - Trend](https://eu.posthog.com/project/122041/insights/oBxhgukA) - Track how many users click on event cards to view event details
- [Explore Button to Event Card - Funnel](https://eu.posthog.com/project/122041/insights/7PIs22QG) - Conversion funnel tracking users who click Explore Events button and then click on an event card
- [Navigation Clicks by Link](https://eu.posthog.com/project/122041/insights/4UgqtujK) - Breakdown of navbar link clicks by link name to understand user navigation patterns
- [Event Popularity by Event](https://eu.posthog.com/project/122041/insights/MfIzibyh) - Which tech events are generating the most clicks - breakdown by event title
- [All Key Events Overview](https://eu.posthog.com/project/122041/insights/1DG3RvgE) - Overview of all tracked events to monitor overall user engagement

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
