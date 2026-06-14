export interface LinkedInRecommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  date: string;
  quote: string;
  avatar: string;
  avatarAlt: string;
  linkedInUrl: string;
}

/** Received recommendations from linkedin.com/in/nicholas-loperena — synced from profile. */
export const linkedInRecommendations: LinkedInRecommendation[] = [
  {
    id: 'randy-bakes',
    name: 'Randy Bakes',
    title: 'Head of Marketing',
    company: 'Forza',
    relationship: 'Managed Nicholas directly',
    date: 'April 2026',
    linkedInUrl: 'https://www.linkedin.com/in/randybakes/',
    avatar: '/recommendations/randy-bakes.jpg',
    avatarAlt: 'Photo of Randy Bakes, Head of Marketing at Forza',
    quote:
      "You will NOT FIND a Web Developer (including AI bots) with a more positive and stronger 'can do' attitude than Nico. He reported to me for over a year while we built out our new website and upgraded our LinkedIn posts. Nico brought a lot of breadth to the development assignment — knowledgeable and quite current about most user-facing and backend tools and solutions, including AI. He worked remotely for me, and I was ALWAYS able to reach Nico directly. He kept me in the loop on deadlines, and he helped me set realistic deadlines, too. He worked extremely well with our lead graphic designer, our owner, and me. Finally, he gave his best consistently and without drama or attitude. You will be missed, Nico! Best in all your endeavors.",
  },
  {
    id: 'sydney-saathoff',
    name: 'Sydney Saathoff',
    title: 'Digital Media Specialist',
    company: 'Forza',
    relationship: 'Worked with Nicholas on the same team',
    date: 'April 2026',
    linkedInUrl: 'https://www.linkedin.com/in/sydney-saathoff/',
    avatar: '/recommendations/sydney-saathoff.jpg',
    avatarAlt: 'Photo of Sydney Saathoff, Digital Media Specialist at Forza',
    quote:
      'Nico is extremely easy to work with. He is such a hard worker and will work overtime just to get something done. I had such a blast creating with him. We made such an amazing website together as a team! He is also very kind hearted and patient. I will miss working with him every day.',
  },
  {
    id: 'muhammad-tayyab-hassan',
    name: 'Muhammad Tayyab Hassan',
    title: 'Digital Marketing',
    company: 'VITO Fryfilter',
    relationship: 'Worked with Nicholas on different teams',
    date: 'August 2024',
    linkedInUrl: 'https://www.linkedin.com/in/mtayyabhassan/',
    avatar: '/recommendations/muhammad-tayyab-hassan.jpg',
    avatarAlt: 'Photo of Muhammad Tayyab Hassan, Digital Marketing at VITO Fryfilter',
    quote:
      'I highly recommend Nicholas. Working with him has been a pleasure due to his friendly and supportive attitude. Nico is always willing to help with ongoing tasks and provides valuable suggestions and input. His front-end development, design, and digital marketing skills are outstanding, making him a great asset to any team.',
  },
];

export const linkedInRecommendationsUrl = 'https://www.linkedin.com/in/nicholas-loperena/details/recommendations/';
