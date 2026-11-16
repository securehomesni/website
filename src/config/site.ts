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
  name: 'Secure Homes NI', // PLACEHOLDER: trading name exactly as on Google Business Profile
  // The company behind the brand, shown in the footer
  tradingAs: {
    name: 'Unified Integrated Systems',
    url: 'https://www.unified-is.com/',
  },
  description:
    'SSAIB-registered installers of CCTV, intruder alarms and security lighting for homes in Belfast and across Northern Ireland.', // PLACEHOLDER: adjust to real service area
  established: '2010', // PLACEHOLDER: year the business started

  // Ofcom reserves 028 9649 6000–6999 for drama, so this cannot ring a real person.
  phone: {
    display: '028 9649 6000', // PLACEHOLDER
    href: 'tel:+442896496000', // PLACEHOLDER: international format, no spaces
    e164: '+442896496000', // PLACEHOLDER
  },

  // Service-area businesses can hide the street address (showStreet: false),
  // which matches how Google Business Profile handles them.
  address: {
    street: '', // PLACEHOLDER
    locality: 'Belfast',
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

  reviews: {
    platform: 'Google',
    rating: '4.9', // PLACEHOLDER: never publish a rating you can't link to
    count: '120', // PLACEHOLDER
    url: 'https://www.google.com/maps', // PLACEHOLDER: the Google Business Profile reviews link
  },

  // "Why customers choose us" on the homepage. Keep each one concrete and provable.
  reasons: [
    { title: 'Emergency call-outs', text: 'If your alarm or cameras stop working, call us. We’ll get an engineer out as quickly as we can, including evenings and weekends.' }, // PLACEHOLDER: confirm hours and response times
    { title: 'Free home surveys', text: 'An engineer visits, walks round with you and recommends only what your home needs. No charge and no obligation.' },
    { title: '12-month guarantee', text: 'Every installation is guaranteed for 12 months, covering both equipment and workmanship.' },
    { title: 'Homeowner focused', text: 'Systems designed around how your family lives, explained in plain English, with an app that’s simple to use.' },
    { title: 'Competitive prices', text: 'Fixed written quotes with no hidden extras, and no monthly fees unless you choose monitoring or servicing.' },
    { title: 'Excellent aftercare', text: 'Help on the phone when you need it, servicing plans, and the same local team looking after your system for years.' },
  ],

  // Equipment brands we specialise in. Text only: add official partner logos only with the manufacturer's permission.
  brands: [
    { name: 'Hikvision', role: 'CCTV specialists', text: 'HD and 4K cameras and recorders, with the Hik-Connect app on your phone.' },
    { name: 'Pyronix', role: 'intruder alarm specialists', text: 'Wired and wireless alarms, with the HomeControl+ app to set and unset from anywhere.' },
  ],

  // Christmas effects in the homepage hero: falling snow and a Secure Homes NI sleigh. It only runs between these dates (month-day),
  // checked in the visitor's browser, so it switches itself on and off each year
  // without a rebuild. Set show: false to turn it off completely.
  christmas: {
    show: true,
    from: '11-15',
    until: '01-06',
  },

  // Quote shown on the homepage. PLACEHOLDER: draft wording, to be approved by Aaron.
  director: {
    name: 'Aaron Ashton',
    role: 'Director',
    quote:
      'Most people here don’t want their home to feel like a fortress. They want to see who’s at the door, know the house is fine while they’re away, and have a local number to ring if anything goes wrong. That’s what we build, from terraces in Belfast to bungalows in North Down: equipment that copes with Northern Ireland weather, fitted properly and looked after for years.',
  },

  // Homepage bundle offer. Set `show: false` to hide the section.
  bundle: {
    show: true,
    name: 'Complete home security bundle',
    price: '£x', // PLACEHOLDER: the bundle price, e.g. '£1,295'
    priceNote: 'fully installed, including VAT', // PLACEHOLDER: confirm VAT and what the price covers
    includes: [
      { title: 'CCTV', text: '[2] HD cameras with night vision, a recorder and phone viewing' }, // PLACEHOLDER
      { title: 'Intruder alarm', text: 'Wireless alarm with [3] sensors, a bell box and app control' }, // PLACEHOLDER
      { title: 'Security light', text: '[1] LED floodlight with a motion sensor, positioned to light your doors or drive' }, // PLACEHOLDER
    ],
    terms: 'Typical three-bedroom home. Larger homes and extra equipment are quoted after your free survey.', // PLACEHOLDER
  },

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
  { label: 'About us', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const legalNav = [
  { label: 'Privacy policy', href: '/privacy-policy/' },
  { label: 'Accessibility statement', href: '/accessibility-statement/' },
] as const;

// The main call to action, used on buttons across the site.
// Buttons link to the call-back form on the contact page.
export const ctaLabel = 'Request a call back';
export const ctaHref = '/contact/#quote';
