export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  image?: string;
  allowEmbed?: boolean;
}

export const projects: Project[] = [
  {
    id: 'forza-built',
    title: 'Forzabuilt',
    year: '2026',
    description: 'Fast B2B commerce for industrial adhesives.',
    longDescription: 'Rebuilt a complex industrial adhesives catalog into a clean B2B storefront that helps buyers find products faster and place orders with less friction.',
    tags: ['Astro', 'Next.js', 'B2B', 'Tailwind'],
    link: 'https://forzabuilt.com',
    allowEmbed: true
  },
  {
    id: 'rugged-red',
    title: 'Rugged Red',
    year: '2025',
    description: 'Legacy infrastructure transformed into a growth engine.',
    longDescription: 'Modernized a legacy commerce stack with a headless setup focused on speed, maintainability, and conversion-oriented UX.',
    tags: ['React', 'AWS', 'E-Commerce', 'Node.js'],
    link: 'https://ruggedred.com',
    image: '/RuggedRed.png',
    allowEmbed: true
  },
  {
    id: 'vito-shop',
    title: 'VITO Fryfilter',
    year: '2024',
    description: 'Modern e-commerce for an industrial equipment brand.',
    longDescription: 'Moved a traditional industrial sales process into a modern online storefront that supports global buyers and partner channels.',
    tags: ['Shopify', 'React', 'Liquid'],
    link: 'https://shop.vitofryfilter.com',
    image: '/VITOShop.png',
    allowEmbed: false
  },
  {
    id: 'furniture-packages-usa',
    title: 'Furniture Packages USA (FPUSA)',
    year: '2022',
    description: 'Streamlined B2B architecture for commercial procurement.',
    longDescription: 'Simplified a complex procurement workflow for large furniture packages so teams can quote, coordinate, and move projects forward faster.',
    tags: ['Next.js', 'PostgreSQL', 'B2B', 'COBOL'],
    link: 'https://furniturepackagesusa.com',
    image: '/FPUSA.png',
    allowEmbed: true
  }
];
