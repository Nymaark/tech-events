import { Suspense } from "react";
import EventPage from "../event-page-content";
import { SkeletonText } from "@/app/components/loading-indicator";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<SkeletonText />}>
      <EventPage params={params} />
    </Suspense>
  )
}