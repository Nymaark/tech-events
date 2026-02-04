export type TechEventType = {
    imageUrl: string | null;
    _id: string;
    _creationTime: number;
    image?: string | undefined;
    agenda: string[];
    audience: string;
    date: string;
    description: string;
    location: string;
    mode: string;
    organizer: string;
    overview: string;
    slug: string;
    tags: string[];
    time: string;
    title: string;
    venue: string;
}