import Content from "./content"
import { Suspense } from "react"
import { SkeletonText } from "@/app/components/loading-indicator"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

    return (
        <Suspense fallback={<SkeletonText />}>
            <Content params={params} />
        </Suspense>
    )
}
