import EventsList from './events-list';

export const dynamic = 'force-dynamic';
export const revalidate = 7200;

export default function EventsPage() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-center lg:mt-20 mt-10 lg:text-[90px] max-w-180">All Events</h1>
      <p className="text-center mt-7 mb-3">
        Browse tech events and filter by topic to find what matters to you.
      </p>

      <div className="mt-5 space-y-7" id="events">
        <h3>Events</h3>
        <EventsList />
      </div>
    </section>
  );
}
