import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Other tables here...
  bookings: defineTable({
    userMail: v.string(),
    eventSlug: v.string(),
    })
      .index("by_event", ["eventSlug"])
      .index("by_email_event", ["userMail", "eventSlug"]),
  events: defineTable({
    agenda: v.array(v.string()),
    audience: v.string(),
    date: v.string(),
    description: v.string(),
    image: v.id('_storage'),
    location: v.string(),
    mode: v.string(),
    organizer: v.string(),
    overview: v.string(),
    slug: v.string(),
    tags: v.array(v.string()),
    time: v.string(),
    title: v.string(),
    venue: v.string(),
  }),
});
