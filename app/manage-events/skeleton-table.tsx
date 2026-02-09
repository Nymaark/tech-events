import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="mt-8 flex w-full flex-col gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="flex gap-4 w-full" key={index}>
          <Skeleton className="h-4 p-9 flex-1" />
          <Skeleton className="h-4 p-9 w-1/3" />
          <Skeleton className="h-4 p-9 w-1/4" />
        </div>
      ))}
    </div>
  )
}
