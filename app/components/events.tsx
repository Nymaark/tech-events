import EventCard from './event-card';
import EventCardSkeleton from './event-card-skeleton';
import { api } from '@/convex/_generated/api';
import { preloadQuery, preloadedQueryResult } from 'convex/nextjs';

export const dynamic = 'force-dynamic';
export const revalidate = 7200;

export default async function FeaturedEvents() {

  const preloadedTechEvents = await preloadQuery(api.events.getAllEvents);
  const techEvents = preloadedQueryResult(preloadedTechEvents)

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
        <li key={event.slug} className="list-none hover:scale-103 transition-all duration-200">
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
}

type simEventsType = {
    imageUrl: string | null;
    _id: string;
    _creationTime: number;
    agenda: string[];
    audience: string;
    date: string;
    description: string;
    image: string;
    location: string;
    mode: string;
    organizer: string;
    overview: string;
    slug: string;
    tags: string[];
    time: string;
    title: string;
    venue: string;
}[]

export function SimilarEvents({ similarEvents }: { similarEvents: simEventsType}) {
    return (
    <ul className="events">
      {similarEvents!.map((event) => (
        <li key={event.slug} className="list-none hover:scale-103 transition-all duration-200">
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
}