import EventsTable from "../components/events-table";

export function Page() {
    return (
        <>
            <h1 className="p-3">Manage Events</h1>
            <button className="bg-primary hover:bg-primary/90 w-full md:w-60 mt-3 cursor-pointer items-center justify-center rounded-[6px] px-4 py-2.5 text-lg font-semibold text-black">Create Event</button>
            <EventsTable />
        </>
    )
}

export default Page;