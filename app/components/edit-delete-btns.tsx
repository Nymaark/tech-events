'use client';

export function EditBtn({ slug }: { slug: string }) {
    return (
        <button className="text-white bg-primary px-3 py-1 rounded-sm hover:cursor-pointer hover:bg-primary/80 font-semibold"><a href={`/manage-events/edit-event/${slug}`}>Edit</a></button>
    )
}

export function DeleteBtn({ slug }: { slug: string }) {
    return (
        <button className="hover:text-red-400 hover:cursor-pointer underline font-bold">Delete</button>
    )
}