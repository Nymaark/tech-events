import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import EditEventForm from "./edit-event-form";
import { notFound } from "next/navigation";

export default async function Content({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const preloadedEventData = await preloadQuery(api.events.getEvent, { slug: slug });
    const eventData = preloadedQueryResult(preloadedEventData);

    if (!eventData) {
        return notFound();
    }

    return (
        <>
            <EditEventForm eventData={eventData} />
        </>        
    )
}