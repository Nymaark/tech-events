const EventCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Poster image skeleton */}
      <div className="w-full h-[300px] bg-blue-950/70 rounded-md mb-4" />

      {/* Location skeleton */}
      <div className="flex flex-row gap-2 mb-3">
        <div className="w-[14px] h-[14px] bg-blue-950/70 rounded" />
        <div className="h-4 bg-blue-950/70 rounded w-40" />
      </div>

      {/* Title skeleton */}
      <div className="h-6 bg-blue-950/70 rounded w-3/4 mb-4" />

      {/* Date and time skeleton */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-[14px] h-[14px] bg-blue-950/70 rounded" />
          <div className="h-4 bg-blue-950/70 rounded w-24" />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-[14px] h-[14px] bg-blue-950/70 rounded" />
          <div className="h-4 bg-blue-950/70 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
