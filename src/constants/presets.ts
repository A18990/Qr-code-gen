import { DesignPreset } from '../types';

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    id: 'classic',
    name: 'Classic Black',
    description: 'Universal 100% scan reliability for receipts, boxes & print',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    dotType: 'square',
    cornerSquareType: 'square',
    cornerDotType: 'square',
  },
  {
    id: 'midnight',
    name: 'Midnight Navy',
    description: 'Modern executive dark slate with smooth rounded corners',
    foregroundColor: '#0f172a',
    backgroundColor: '#ffffff',
    dotType: 'rounded',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
  },
  {
    id: 'indigo',
    name: 'Royal Indigo',
    description: 'Vibrant tech aesthetic with classy rounded modules',
    foregroundColor: '#4338ca',
    backgroundColor: '#ffffff',
    dotType: 'classy-rounded',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
  },
  {
    id: 'forest',
    name: 'Forest Emerald',
    description: 'Eco-friendly and organic look with circular dot pattern',
    foregroundColor: '#065f46',
    backgroundColor: '#ffffff',
    dotType: 'dots',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Crisp bold black on sunny warm yellow for maximum readability',
    foregroundColor: '#000000',
    backgroundColor: '#fef08a',
    dotType: 'square',
    cornerSquareType: 'square',
    cornerDotType: 'square',
  },
  {
    id: 'crimson',
    name: 'Crimson Burgundy',
    description: 'Warm, refined hospitality and dining tone',
    foregroundColor: '#831843',
    backgroundColor: '#ffffff',
    dotType: 'classy',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
  },
];

export const PRESET_LOGOS = [
  {
    id: 'link',
    name: 'Web Link',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%234338ca" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%234338ca" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>`,
  },
  {
    id: 'shop',
    name: 'Store & Menu',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%234338ca" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><rect width="20" height="5" x="2" y="7" rx="1"/></svg>`,
  },
  {
    id: 'phone',
    name: 'Contact',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%234338ca" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  },
  {
    id: 'nepal',
    name: 'Nepal Emblem',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23dc2626"><path d="M3 2v20h2V14l9-3-6-3 8-4-11-2H3z" stroke="%231e3a8a" stroke-width="1.5"/></svg>`,
  },
  {
    id: 'star',
    name: 'Verified Star',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23f59e0b" stroke="%23d97706" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
];
