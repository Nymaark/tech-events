import Image from 'next/image';
import ExploreBtn from './components/explore-btn';
import techEvents from './lib/tech-events';
import EventCard from './components/event-card';

export default function Home() {
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
          {techEvents.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </ul>
      </div>
    </section>
  );
}
