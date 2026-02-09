'use client';

import Image from 'next/image';
import posthog from 'posthog-js';

const ExploreBtn = () => {
  const handleClick = () => {
    posthog.capture('explore_events_clicked', {
      button_location: 'hero_section',
    });
  };

  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleClick}>
      <a href="#events" className="transition-all duration-300">
        Explore Events
      </a>
      <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} className="ml-3" />
    </button>
  );
};

export default ExploreBtn;
