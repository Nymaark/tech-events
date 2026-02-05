import ExploreBtn from './components/explore-btn';
import FeaturedEvents from './components/events';
import { cacheLife } from 'next/cache';

export default async function Home() {
  'use cache';
  cacheLife('hours');

  return (
    <section>
      <h1 className="text-center">Your Next Great Tech Event Awaits</h1>
      <p className="text-center mt-5">
        Discover, connect, and grow at the most exciting tech events near you.
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <FeaturedEvents />
      </div>
    </section>
  );
}
