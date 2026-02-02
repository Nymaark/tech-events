export type TechEventType = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string; // e.g. 'March 24th 2026'
  time: string; // e.g. '9:00 AM'
};

const techEvents: TechEventType[] = [
  {
    image: '/images/event1.png',
    title: 'NVIDIA GTC 2026',
    slug: 'nvidia-gtc-2026',
    location: 'San Jose, California',
    date: 'March 16th 2026',
    time: '9:00 AM',
  },
  {
    image: '/images/event2.png',
    title: 'RSA Conference 2026',
    slug: 'rsa-conference-2026',
    location: 'San Francisco, California',
    date: 'March 23rd 2026',
    time: '8:30 AM',
  },
  {
    image: '/images/event3.png',
    title: 'Google Cloud Next 2026',
    slug: 'google-cloud-next-2026',
    location: 'Las Vegas, Nevada',
    date: 'April 22nd 2026',
    time: '9:00 AM',
  },
  {
    image: '/images/event4.png',
    title: 'Dell Technologies World 2026',
    slug: 'dell-technologies-world-2026',
    location: 'Las Vegas, Nevada',
    date: 'May 18th 2026',
    time: '8:00 AM',
  },
  {
    image: '/images/event5.png',
    title: 'Cisco Live 2026',
    slug: 'cisco-live-2026',
    location: 'Las Vegas, Nevada',
    date: 'June 1st 2026',
    time: '9:00 AM',
  },
  {
    image: '/images/event6.png',
    title: 'Black Hat USA 2026',
    slug: 'black-hat-usa-2026',
    location: 'Las Vegas, Nevada',
    date: 'August 1st 2026',
    time: '10:00 AM',
  },
  {
    image: '/images/event7.png',
    title: 'Ai4 2026',
    slug: 'ai4-2026',
    location: 'Las Vegas, Nevada',
    date: 'August 4th 2026',
    time: '9:00 AM',
  },
];

export default techEvents;
