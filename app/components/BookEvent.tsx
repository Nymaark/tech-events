'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function BookEvent({ slug }: { slug: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false)

  const createBooking = useMutation(api.events.createBooking);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await createBooking({
        eventSlug: slug,
        userMail: email,
      });

      setSubmitted(true);
    } catch (e) {
      console.error(e);
      setAlreadySignedUp(true);
    }
  };

  return (
    <div id="book-event">
      {alreadySignedUp ? (
        <p className='text-sm font-bold'>You are already signed up for this event!</p>
      ) : submitted ? (
        <p className="text-sm font-bold">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
            />
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
