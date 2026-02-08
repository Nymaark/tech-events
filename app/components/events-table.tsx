import { preloadQuery, preloadedQueryResult } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';
import { EditBtn, DeleteBtn } from './edit-delete-btns';

export default async function EventsTable() {
  const preloadedEvents = await preloadQuery(api.events.getAllEvents);
  const events = preloadedQueryResult(preloadedEvents);

  return (
    <div className="w-full lg:overflow-auto overflow-x-scroll">
      <table className="w-full min-w-320 bg-slate-900/60 mt-7 rounded-lg">
        <thead className="bg-slate-600/30">
          <tr>
            <th>Event</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Booked Spots</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.slug}>
              <td>
                <div className="flex flex-row items-center">
                  <div className="relative w-11 h-11">
                    <Image
                      src={event.imageUrl ? event.imageUrl : '/not-found'}
                      alt="event image"
                      fill={true}
                      objectFit="cover"
                    />
                  </div>
                  <span className="pl-3">{event.title}</span>
                </div>
              </td>
              <td>{event.location}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>&lt; 500</td>
              <td>
                <div className="flex flex-row justify-around pr-4">
                  <EditBtn slug={event.slug} />
                  <DeleteBtn slug={event.slug} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
