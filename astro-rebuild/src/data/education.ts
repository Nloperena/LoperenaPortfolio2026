/** Education — keep in sync with Nicholas_Loperena_Resume_v8.pdf */
export type EducationEntry = {
  school: string;
  logo: string;
  logoAlt: string;
  items: readonly { dates: string; label: string }[];
};

export const education: EducationEntry[] = [
  {
    school: 'University of Central Florida',
    logo: '/ucf.webp',
    logoAlt: 'University of Central Florida seal',
    items: [
      { dates: '2019', label: 'Coding Boot Camp — Full-Stack Web Development (Certificate)' },
      { dates: '2019 – 2020', label: 'Cybersecurity Program' },
    ],
  },
  {
    school: 'Valencia College',
    logo: '/valencia-college.webp',
    logoAlt: 'Valencia College seal',
    items: [{ dates: '2015 – 2016', label: 'Business Certificate' }],
  },
];
