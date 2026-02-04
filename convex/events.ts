import { query } from './_generated/server';
import { v } from 'convex/values';

export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query('events').collect();
    return Promise.all(
      events.map(async (event) => ({
        ...event,
        imageUrl: event.image ? await ctx.storage.getUrl(event.image) : null,
      }))
    );
  },
});
