'use client';

import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';

function Navbar() {
  const handleLogoClick = () => {
    posthog.capture('logo_clicked', {
      navigation_source: 'navbar',
    });
  };

  const handleNavLinkClick = (linkName: string) => {
    posthog.capture('nav_link_clicked', {
      link_name: linkName,
      navigation_source: 'navbar',
    });
  };

  return (
    <header>
      <nav className="flex flex-row w-full">
        <Link
          href="/"
          className="logo flex flex-row justify-space-between"
          onClick={handleLogoClick}
        >
          <Image src="/icons/techevent_logo.svg" alt="Tech Events logo" width={30} height={30} />
          <p className="hidden md:inline">TechEvents</p>
        </Link>

        <ul className="text-xl md-text-l">
          <Link href="/" onClick={() => handleNavLinkClick('Home')}>
            Home
          </Link>
          <Link href="/" onClick={() => handleNavLinkClick('Events')}>
            Events
          </Link>
          <Link href="/manage-events" onClick={() => handleNavLinkClick('Create Event')}>
            Manage Events
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
