import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonText() {
  return (
    <div className="w-full flex-center text-slate-400 mt-10 flex flex-col gap-2">
      <Skeleton className="h-4 lg:w-1/2 w-full" />
      <Skeleton className="h-4 lg:w-1/2 w-full" />
      <Skeleton className="h-4 lg:w-1/3 w-3/4" />
    </div>
  )
}
