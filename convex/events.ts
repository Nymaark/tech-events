import { string } from 'zod';
import { query, mutation } from './_generated/server';
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
    return event
      ? {
          ...event,
          imageUrl: event.image ? await ctx.storage.getUrl(event.image) : null,
        }
      : null;
  },
});

export const getSimilarEvents = query({
  args: {
    tags: v.array(v.string()),
    excludeSlug: v.optional(v.string()), // optional: exclude the current event
  },
  handler: async (ctx, args) => {
    const events = await ctx.db.query('events').collect();

    // Filter events that have at least one matching tag
    const similarEvents = events.filter((event) => {
      // Optionally exclude the current event
      if (args.excludeSlug && event.slug === args.excludeSlug) {
        return false;
      }

      // Check if event has any tag that's in the input tags
      return event.tags.some((tag) => args.tags.includes(tag));
    });

    return Promise.all(
      similarEvents.map(async (event) => ({
        ...event,
        imageUrl: event.image ? await ctx.storage.getUrl(event.image) : null,
      }))
    );
  },
});

export const createBooking = mutation({
  args: {
    userMail: v.string(),
    eventSlug: v.string(),
  },
  handler: async (ctx, { userMail, eventSlug }) => {
    const existing = await ctx.db
      .query('bookings')
      .withIndex('by_email_event', (q) => q.eq('userMail', userMail).eq('eventSlug', eventSlug))
      .first();

    if (existing) {
      throw new Error('Booking already exists for this email');
    }

    return await ctx.db.insert('bookings', {
      userMail: userMail,
      eventSlug: eventSlug,
    });
  },
});

export const getBookingCount = query({
  args: {
    eventSlug: v.string(),
  },
  handler: async (ctx, { eventSlug }) => {
    const bookings = await ctx.db
      .query('bookings')
      .withIndex('by_event', (q) => q.eq('eventSlug', eventSlug))
      .collect();

    return bookings.length;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});


export const uploadEvent = mutation({
  args: {
    agenda: v.array(v.string()),
    audience: v.string(),
    date: v.string(),
    description: v.string(),
    image: v.id("_storage"),
    location: v.string(),
    mode: v.string(),
    organizer: v.string(),
    overview: v.string(),
    slug: v.string(),
    tags: v.array(v.string()),
    time: v.string(),
    title: v.string(),
    venue: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("events", args)
  }
})