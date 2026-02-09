'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { redirect } from 'next/navigation';

export function Page() {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTagInput, setCurrentTagInput] = useState('');

  const [agendas, setAgendas] = useState<string[]>([]);
  const [currentAgendaInput, setCurrentAgendaInput] = useState('');

  const uploadEvent = useMutation(api.events.uploadEvent);
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleTagKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter' && currentTagInput.trim()) {
      e.preventDefault();
      setTags([...tags, currentTagInput.trim()]);
      setCurrentTagInput('');
    }
  };

  const removeAgenda = (indexToRemove: number) => {
    setAgendas(agendas.filter((_, index) => index !== indexToRemove));
  };

  const handleAgendaKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter' && currentAgendaInput.trim()) {
      e.preventDefault();
      setAgendas([...agendas, currentAgendaInput.trim()]);
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
      agenda: agendas,
      audience: String(formData.get('audience') ?? ''),
      date: String(formData.get('date') ?? ''),
      description: String(formData.get('description') ?? ''),
      image: storageId,
      location: String(formData.get('location') ?? ''),
      mode: String(formData.get('mode') ?? ''),
      organizer: String(formData.get('organizer') ?? ''),
      overview: String(formData.get('overview') ?? ''),
      slug: slug,
      tags: tags,
      time: String(formData.get('time') ?? ''),
      title: String(formData.get('title') ?? ''),
      venue: String(formData.get('venue') ?? ''),
    };

    // Process/validate the data here
    console.log('Event data:', eventData);

    uploadEvent(eventData);

    setTimeout(redirect('/manage-events'), 500)
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1>Create Event</h1>
      <form id="create-event" onSubmit={handleSubmit} className="pt-12">
        <label>
          Event Title:
          <input name="title" type="text" required placeholder="Type event title here..." />
        </label>
        <label>
          Location:
          <input name="location" type="text" required placeholder="E.g. Las Vegas, Nevada"></input>
        </label>
        <label>
          Date:
          <input name="date" type="text" required placeholder="E.g. March 16th 2026"></input>
        </label>
        <label>
          Time:
          <input name="time" type="text" required placeholder="E.g. 9:00 AM" />
        </label>
        <label>
          Mode:
          <input name="mode" type="text" required placeholder="E.g. Hybrid (In-person & Virtual)" />
        </label>
        <label>
          Venue:
          <input name="venue" type="text" required placeholder="E.g. The Venetian Expo" />
        </label>
        <label>
          Audience:
          <input
            name="audience"
            type="text"
            required
            placeholder="E.g. Developers, Researchers, Business Leaders..."
          />
        </label>
        <label>
          Organizer:
          <input name="organizer" type="text" required placeholder="E.g. NVIDIA Corporation" />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            placeholder="Enter event description..."
            required
            className="block mt-1 mb-8 border-1 border-slate-400/60 focus:outline-hidden pl-1 focus:border-slate-300 w-full font-normal"
          ></textarea>
        </label>
        <label>
          Overview:
          <textarea
            name="overview"
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
            value={currentTagInput}
            onKeyDown={handleTagKeyDown}
            onChange={(e) => setCurrentTagInput(e.target.value)}
            type="text"
            placeholder="Enter tag and press Enter..."
          />
        </label>
        <div>
          {tags.map((tag, index) => (
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
            {agendas.map((agenda, index) => (
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
          Upload Event Photo:
          <input
            name="image"
            className="border-1 p-1 hover:text-primary/90 hover:cursor-pointer mb-1"
            type="file"
            required
          />
        </label>
        <button className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[6px] px-4 mt-12 py-2.5 text-lg font-semibold text-white">
          Upload Event
        </button>
      </form>
    </div>
  );
}

export default Page;
