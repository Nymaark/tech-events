'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

type EventData = {
  title: string;
  audience: string;
  mode: string;
  time: string;
  location: string;
  slug: string;
  organizer: string;
  description: string;
  tags: string[];
  agenda: string[];
  image?: string | null;
  overview: string;
  venue: string;
  date: string;
};

export default function EditEventForm({ eventData }: { eventData: EventData }) {
  const {
    title,
    audience,
    mode,
    time,
    location,
    slug,
    organizer,
    description,
    tags,
    agenda,
    image,
    overview,
    venue,
    date,
  } = eventData;

  const [qTags, setTags] = useState<string[]>(tags);
  const [currentTagInput, setCurrentTagInput] = useState('');

  const [qAgendas, setAgendas] = useState<string[]>(agenda);
  const [currentAgendaInput, setCurrentAgendaInput] = useState('');

  const uploadEvent = useMutation(api.events.uploadEvent);
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);

  const removeTag = (indexToRemove: number) => {
    setTags(qTags.filter((_, index) => index !== indexToRemove));
  };

  const handleTagKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter' && currentTagInput.trim()) {
      e.preventDefault();
      setTags([...qTags, currentTagInput.trim()]);
      setCurrentTagInput('');
    }
  };

  const removeAgenda = (indexToRemove: number) => {
    setAgendas(qAgendas.filter((_, index) => index !== indexToRemove));
  };

  const handleAgendaKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter' && currentAgendaInput.trim()) {
      e.preventDefault();
      setAgendas([...qAgendas, currentAgendaInput.trim()]);
      setCurrentAgendaInput('');
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const slug = String(formData.get('title') ?? '')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Upload Image to Convex database and get reference storageID to store in the event document:
    const imageFile = formData.get('image') as File | null;
    if (!imageFile) {
      console.error('No image file provided');
      return;
    }

    // useMutation returns a function; call it to get the upload URL (string)
    const uploadUrl = await generateUploadUrl();

    // Upload the file to the returned URL)
    const result = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': imageFile.type },
      body: imageFile,
    });

    if (!result.ok) {
      console.error('Image upload failed', result.statusText);
      return;
    }
    const { storageId } = await result.json();

    const eventData = {
      agenda: qAgendas,
      audience: String(formData.get('audience') ?? ''),
      date: String(formData.get('date') ?? ''),
      description: String(formData.get('description') ?? ''),
      image: storageId,
      location: String(formData.get('location') ?? ''),
      mode: String(formData.get('mode') ?? ''),
      organizer: String(formData.get('organizer') ?? ''),
      overview: String(formData.get('overview') ?? ''),
      slug: slug,
      tags: qTags,
      time: String(formData.get('time') ?? ''),
      title: String(formData.get('title') ?? ''),
      venue: String(formData.get('venue') ?? ''),
    };

    // Process/validate the data here
    console.log('Event data:', eventData);

    uploadEvent(eventData);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1>Edit Event</h1>
      <h2 className="font-semibold text-2xl mt-5">{title}</h2>
      <form id="create-event" onSubmit={handleSubmit} className="pt-12">
        <label>
          Event Title:
          <input
            name="title"
            defaultValue={title}
            type="text"
            required
            placeholder="Type event title here..."
          />
        </label>
        <label>
          Location:
          <input
            name="location"
            defaultValue={location}
            type="text"
            required
            placeholder="E.g. Las Vegas, Nevada"
          ></input>
        </label>
        <label>
          Date:
          <input
            name="date"
            type="text"
            defaultValue={date}
            required
            placeholder="E.g. March 16th 2026"
          ></input>
        </label>
        <label>
          Time:
          <input name="time" type="text" defaultValue={time} required placeholder="E.g. 9:00 AM" />
        </label>
        <label>
          Mode:
          <input
            name="mode"
            defaultValue={mode}
            type="text"
            required
            placeholder="E.g. Hybrid (In-person & Virtual)"
          />
        </label>
        <label>
          Venue:
          <input
            name="venue"
            defaultValue={venue}
            type="text"
            required
            placeholder="E.g. The Venetian Expo"
          />
        </label>
        <label>
          Audience:
          <input
            name="audience"
            defaultValue={audience}
            type="text"
            required
            placeholder="E.g. Developers, Researchers, Business Leaders..."
          />
        </label>
        <label>
          Organizer:
          <input
            name="organizer"
            defaultValue={organizer}
            type="text"
            required
            placeholder="E.g. NVIDIA Corporation"
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            defaultValue={description}
            placeholder="Enter event description..."
            required
            className="block mt-1 mb-8 border-1 border-slate-400/60 focus:outline-hidden pl-1 focus:border-slate-300 w-full font-normal"
          ></textarea>
        </label>
        <label>
          Overview:
          <textarea
            name="overview"
            defaultValue={overview}
            placeholder="Enter event overview..."
            required
            className="block border-1 mt-1 mb-8 border-slate-400/60 focus:outline-hidden pl-1 focus:border-slate-300 w-full font-normal"
          ></textarea>
        </label>
        <label>
          Tags:
          <input
            name="tags"
            className="mb-4"
            defaultValue={currentTagInput}
            onKeyDown={handleTagKeyDown}
            onChange={(e) => setCurrentTagInput(e.target.value)}
            type="text"
            placeholder="Enter tag and press Enter..."
          />
        </label>
        <div>
          {qTags.map((tag, index) => (
            <button
              className="pill border-1 border-slate-400 mb-7 mx-2 pr-4 hover:border-slate-400/30 hover:cursor-pointer"
              type="button"
              onClick={() => removeTag(index)}
              key={index}
            >
              <span className="mr-2">{tag}</span>
              <span className="text-red-400 font-bold">×</span>
            </button>
          ))}
        </div>
        <label>
          Points on Agenda:
          <input
            name="agenda"
            className="mb-4"
            value={currentAgendaInput}
            onKeyDown={handleAgendaKeyDown}
            onChange={(e) => setCurrentAgendaInput(e.target.value)}
            type="text"
            placeholder="Enter agenda point and press Enter..."
          />
        </label>
        <div className="mb-8">
          <ul>
            {qAgendas.map((agenda, index) => (
              <li key={index}>
                <button
                  className="hover:text-slate-300/50 hover:cursor-pointer"
                  type="button"
                  onClick={() => removeAgenda(index)}
                >
                  <span className="mr-2">{agenda}</span>
                  <span className="text-red-400 font-bold">×</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <label>
          <span className='font-normal text-slate-400'>(Optional)</span> Update Event Photo:
          <input
            name="image"
            className="border-1 p-1 hover:text-primary/90 hover:cursor-pointer mb-1"
            type="file"
            required
          />
        </label>
        <button className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[6px] px-4 mt-12 py-2.5 text-lg font-semibold text-black">
          Update Event
        </button>
      </form>
    </div>
  );
}
