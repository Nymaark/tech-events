import { Suspense } from "react"
import { SkeletonText } from "@/app/components/loading-indicator"
import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { notFound } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import EditEventForm from "./edit-event-form";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    type EventData = {
      _id: Id<"events">,
      title: string;
      audience: string;
      mode: string;
      time: string;
      location: string;
      slug: string;
      organizer: string;
      description: string;
      tags: string[];
      agenda: string[];
      image: Id<"_storage">;
      overview: string;
      venue: string;
      date: string;
    };
    const { slug } = await params;
    const preloadedEventData = await preloadQuery(api.events.getEvent, { slug: slug });
    const eventData = preloadedQueryResult(preloadedEventData);
    if (!eventData) notFound();

    return (
        <Suspense fallback={<SkeletonText />}>
            <EditEventForm eventData={eventData} />
        </Suspense>
    )
}
