import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonText() {
  return (
    <div className="text-slate-400 mt-10 flex w-full max-w-2xl flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
