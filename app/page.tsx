'use client';

import ExploreBtn from './components/explore-btn';
import EventCard from './components/event-card';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Home() {
  const techEvents = useQuery(api.events.getEvents)

  if (techEvents === undefined) {
    return <section>Loading events…</section>;
  }

  return (
    <section>
      <h1 className="text-center">Your Next Great Tech Event Awaits</h1>
      <p className="text-center mt-5">
        Discover, connect, and grow at the most exciting tech events near you.
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {techEvents!.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </ul>
      </div>
    </section>
  );
}
