'use client';

export function EditBtn({ slug }: { slug: string }) {
    return (
        <button className="text-primary hover:cursor-pointer hover:text-primary/70 font-bold underline"><a href={`/manage-events/edit-event/${slug}`}>Edit</a></button>
    )
}

export function DeleteBtn({ slug }: { slug: string }) {
    return (
        <button className="hover:text-red-400 hover:cursor-pointer underline font-bold">Delete</button>
    )
}