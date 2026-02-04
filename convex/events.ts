import { query } from './_generated/server';
import { v } from 'convex/values';

export const getAllEvents = query({
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

export const getEvent = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const event = await ctx.db
      .query('events')
      .filter((q) => q.eq(q.field('slug'), slug))
      .unique();
    return event ? { 
      ...event,
      imageUrl: event.image ? await ctx.storage.getUrl(event.image) : null,
    } : null;
  },
});
