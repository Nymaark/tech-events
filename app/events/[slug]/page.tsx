import { Suspense } from "react";
import EventPage from "../event-page-content";
import { SkeletonText } from "@/app/components/loading-indicator";
import { cacheLife } from 'next/cache';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  'use cache';
  cacheLife('hours');
  
  return (
    <Suspense fallback={<SkeletonText />}>
      <EventPage params={params} />
    </Suspense>
  )
}