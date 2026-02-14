'use client';

import { useMemo, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EventCard from '../components/event-card';
import EventCardSkeleton from '../components/event-card-skeleton';
import type { TechEventType } from '../lib/tech-events';

function getAllUniqueTags(events: TechEventType[]): string[] {
  const set = new Set<string>();
  events.forEach((event) => event.tags?.forEach((tag) => set.add(tag)));
  return Array.from(set).sort();
}

export default function EventsList() {
  const techEvents = useQuery(api.events.getAllEvents);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const uniqueTags = useMemo(
    () => (techEvents ? getAllUniqueTags(techEvents) : []),
    [techEvents]
  );

  const filteredEvents = useMemo(() => {
    if (!techEvents) return [];
    if (!selectedTag) return techEvents;
    return techEvents.filter((event) => event.tags?.includes(selectedTag));
  }, [techEvents, selectedTag]);

  if (techEvents === undefined) {
    return (
      <>
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-blue-950/70 rounded-[6px] animate-pulse"
              aria-hidden
            />
          ))}
        </div>
        <ul className="events">
          {[...Array(6)].map((_, index) => (
            <li key={index} className="list-none">
              <EventCardSkeleton />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      {uniqueTags.length > 0 && (
        <div className="mb-10">
          <div className="relative">
            <div
              className={`flex flex-wrap gap-2 overflow-hidden ${
                tagsExpanded ? 'max-h-full' : 'max-h-10 max-lg:max-h-20'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className={`pill transition-all duration-200 ease-out shrink-0 ${
                  selectedTag === null
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/50'
                    : 'hover:bg-slate-500/40'
                }`}
              >
                All
              </button>
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`pill transition-all duration-200 shrink-0 ${
                    selectedTag === tag
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary/50'
                      : 'hover:bg-slate-500/40'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {!tagsExpanded && (
              <>
                <div className="flex justify-center relative z-10">
                  <button
                    type="button"
                    onClick={() => setTagsExpanded(true)}
                    className="border-slate-700 bg-slate-700/70 mt-1 hover:bg-primary/90 flex w-fit cursor-pointer  rounded-full border px-6 py-2 text-center  text-sm font-medium"
                  >
                    Show All Tags
                  </button>
                </div>
              </>
            )}
            {tagsExpanded && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setTagsExpanded(false)}
                  className="text-primary text-sm font-medium hover:underline focus:outline-none focus:underline"
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <ul className="events">
        {filteredEvents.map((event) => (
          <li
            key={event.slug}
            className="list-none hover:scale-103 transition-all duration-200"
          >
            <EventCard {...event} />
          </li>
        ))}
      </ul>
      {filteredEvents.length === 0 && (
        <p className="text-light-200 text-center py-10">
          {selectedTag
            ? `No events found with the tag "${selectedTag}".`
            : 'No events yet.'}
        </p>
      )}
    </>
  );
}
