'use client';

import EventCard from './event-card';
import EventCardSkeleton from './event-card-skeleton';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function FeaturedEvents() {
  const techEvents = useQuery(api.events.getAllEvents);

  if (techEvents === undefined) {
    return (
      <ul className="events">
        {[...Array(6)].map((_, index) => (
          <li key={index} className="list-none">
            <EventCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="events">
      {techEvents!.map((event) => (
        <li key={event.slug} className="list-none">
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
}
