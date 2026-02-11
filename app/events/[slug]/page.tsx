'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import EventPage from './event-page-content';
import { SkeletonText } from '@/app/components/loading-indicator';

export default function Page() {
  const params: { slug: string} = useParams()
  
  return (
    <Suspense fallback={<SkeletonText />}>
      <EventPage params={params} />
    </Suspense>
  );
}
