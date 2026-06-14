export interface ProjectPlaceholder {
  fig: string;
  monogram: string;
  accent: string;
  status: string;
}

export const projectPlaceholders: Record<string, ProjectPlaceholder> = {
  'forza-built': {
    fig: 'FIG.01',
    monogram: 'FB',
    accent: '#C4A484',
    status: 'B2B CATALOG',
  },
  'rugged-red': {
    fig: 'FIG.02',
    monogram: 'RR',
    accent: '#8B3A3A',
    status: 'HEADLESS ECOMMERCE',
  },
  'vito-fryfilter': {
    fig: 'FIG.03',
    monogram: 'VF',
    accent: '#E2725B',
    status: 'SHOPIFY STOREFRONT',
  },
  'nexrena-platform': {
    fig: 'FIG.04',
    monogram: 'NX',
    accent: '#4A5D4E',
    status: 'OPS PLATFORM',
  },
  'furniture-packages-usa': {
    fig: 'FIG.05',
    monogram: 'FP',
    accent: '#7D6B5D',
    status: 'B2B PROCUREMENT',
  },
};

export const defaultPlaceholder: ProjectPlaceholder = {
  fig: 'FIG.00',
  monogram: 'NL',
  accent: '#7D6B5D',
  status: 'SYSTEM PREVIEW',
};
