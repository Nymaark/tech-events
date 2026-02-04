import { preloadQuery, preloadedQueryResult } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';

const EventDetailsItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
  <div className="flex flex-row gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const preloadedEvent = await preloadQuery(api.events.getEvent, { slug: slug });

  const event = preloadedQueryResult(preloadedEvent);
  if (!event) return notFound();

  const {
    description,
    imageUrl,
    title,
    tags,
    agenda,
    date,
    time,
    location,
    image,
    mode,
    overview,
    venue,
    organizer,
    audience,
  } = event;

  return (
    <section id="event">
      <div className="header">
        <h1>{title}</h1>
        <p className="mt-2">{description}</p>
      </div>
      <div className="details">
        {/* Right side - Event content */}
        <div className="content">
          <Image
            src={imageUrl ?? '/images/placeholder.png'}
            alt="Event banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailsItem icon="/icons/calendar.svg" alt="Calendar" label={date} />
            <EventDetailsItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailsItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailsItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailsItem icon="/icons/audience.svg" alt="audience" label={audience} />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>
        {/* Left side - Booking form */}
        <aside className="booking">
          <p className="text-lg font-semibold">Book Event</p>
        </aside>
      </div>
    </section>
  );
}
