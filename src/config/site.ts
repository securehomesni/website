/**
 * BUSINESS DETAILS
 * ----------------------------------------------------------------------------
 * The single source of truth for name, contact details, accreditation and
 * navigation. Change something here and it updates the header, footer,
 * structured data and every page that uses it.
 *
 * Anything marked PLACEHOLDER must be replaced before launch.
 * Run `npm run placeholders` to list every remaining placeholder.
 *
 * Name, address and phone (NAP) must match the Google Business Profile
 * character for character, or local search rankings suffer.
 */

export const site = {
  name: 'Secure Home NI', // PLACEHOLDER: trading name exactly as on Google Business Profile
  legalName: 'Secure Home NI Ltd', // PLACEHOLDER
  companyNumber: 'NI000000', // PLACEHOLDER: Companies House number, or remove if a sole trader
  description:
    'SSAIB-registered CCTV and intruder alarm installers for homes in Belfast and across Northern Ireland.', // PLACEHOLDER: adjust to real service area

  // Ofcom reserves 028 9649 6000–6999 for drama, so this cannot ring a real person.
  phone: {
    display: '028 9649 6000', // PLACEHOLDER
    href: 'tel:+442896496000', // PLACEHOLDER: international format, no spaces
    e164: '+442896496000', // PLACEHOLDER
  },
  email: 'hello@example.co.uk', // PLACEHOLDER

  // Service-area businesses can hide the street address (showStreet: false),
  // which matches how Google Business Profile handles them.
  address: {
    street: '', // PLACEHOLDER
    locality: 'Belfast', // PLACEHOLDER
    region: 'County Antrim', // PLACEHOLDER
    postcode: 'BT1 1AA', // PLACEHOLDER
    country: 'GB',
    showStreet: false,
  },

  hours: [
    { days: 'Monday to Friday', time: '8am to 6pm', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' }, // PLACEHOLDER
    { days: 'Saturday', time: '9am to 1pm', schema: ['Saturday'], opens: '09:00', closes: '13:00' }, // PLACEHOLDER
  ],

  // Towns shown in "Areas we cover" and in LocalBusiness areaServed.
  // A town links to its own page when a matching file exists in src/content/locations/.
  areas: [
    'Belfast',
    'Lisburn',
    'Newtownabbey',
    'Holywood',
    'Bangor',
    'Newtownards',
    'Carrickfergus',
    'Antrim',
    'Ballyclare',
    'Comber',
    'Dundonald',
    'Carryduff',
  ], // PLACEHOLDER: confirm the real service area
  areaSummary: 'Belfast, North Down and South Antrim', // PLACEHOLDER

  ssaib: {
    registrationNumber: '000000', // PLACEHOLDER
    // PLACEHOLDER: link straight to the company's entry in the SSAIB directory if possible
    url: 'https://www.ssaib.org/',
  },

  insurance: {
    publicLiability: '£5 million', // PLACEHOLDER
  },

  reviews: {
    platform: 'Google',
    rating: '4.9', // PLACEHOLDER: never publish a rating you can't link to
    count: '120', // PLACEHOLDER
    url: 'https://www.google.com/maps', // PLACEHOLDER: the Google Business Profile reviews link
  },

  // "What makes us different". Keep each one concrete and provable.
  promises: [
    { title: 'Fixed written quotes', text: 'The price on the quote is the price you pay. No extras added on the day.' }, // PLACEHOLDER
    { title: 'Local and family-run', text: 'The person who surveys your home is part of the team that installs it.' }, // PLACEHOLDER
    { title: 'Help when you need it', text: 'Faults reported before noon are usually looked at the same working day.' }, // PLACEHOLDER
    { title: 'Two-year warranty', text: 'On all equipment and workmanship, with a simple number to call.' }, // PLACEHOLDER
  ],

  social: {
    facebook: '', // PLACEHOLDER: full URL or leave empty to hide
    instagram: '', // PLACEHOLDER
  },

  analytics: {
    // Cloudflare Web Analytics token. Leave empty if you switch analytics on
    // in the Cloudflare Pages dashboard instead (it injects the script for you).
    cloudflareToken: '',
  },
} as const;

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Areas we cover', href: '/areas/' },
  { label: 'Guides', href: '/guides/' },
  { label: 'About us', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const legalNav = [
  { label: 'Privacy policy', href: '/privacy-policy/' },
  { label: 'Accessibility statement', href: '/accessibility-statement/' },
] as const;

export const ctaLabel = 'Book a free survey';
