'use client';
import { useState } from 'react';

export function Page() {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTagInput, setCurrentTagInput] = useState('');

  const [agendas, setAgendas] = useState<string[]>([]);
  const [currentAgendaInput, setCurrentAgendaInput] = useState('');

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

  return (
    <div className='flex flex-col w-full items-center'>
      <h1>Create Event</h1>
      <form id="create-event" className='pt-12'>
        <label>
          Event title:
          <input name="title" type="text" required placeholder="Type event name here..." />
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
          />
        </label>
        <button className="bg-primary hover:bg-primary/90 w-full cursor-pointer items-center justify-center rounded-[6px] px-4 mt-12 py-2.5 text-lg font-semibold text-black">
          Upload Event
        </button>
      </form>
    </div>
  );
}

export default Page;

type nschema = {
  image: string;
  slug: string;
};

type schema = {
  agenda: string[];
  audience: string;
  date: string;
  description: string;
  image: string;
  location: string;
  mode: string;
  organizer: string;
  overview: string;
  slug: string;
  tags: string[];
  time: string;
  title: string;
  venue: string;
};
