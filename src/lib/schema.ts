/**
 * Structured data (JSON-LD) helpers.
 * Business details come from src/config/site.ts so they always match the visible page.
 */
import { site } from '../config/site';

export function localBusinessSchema(siteUrl: URL) {
  const base = siteUrl.href.replace(/\/$/, '');
  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  };
  if (site.address.showStreet && site.address.street) {
    address.streetAddress = site.address.street;
  }

  const sameAs = [site.social.facebook, site.social.instagram].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${base}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: `${base}/`,
    telephone: site.phone.e164,
    email: site.email,
    image: `${base}/og-default.png`,
    logo: `${base}/favicon.svg`,
    address,
    areaServed: site.areas.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.opens,
      closes: h.closes,
    })),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'SSAIB registered security systems installer',
      credentialCategory: 'Certification',
      identifier: site.ssaib.registrationNumber,
      recognizedBy: {
        '@type': 'Organization',
        name: 'SSAIB',
        url: 'https://www.ssaib.org/',
      },
    },
    knowsAbout: ['CCTV installation', 'Intruder alarms', 'Home security'],
    ...(sameAs.length ? { sameAs } : {}),
    // Note: no aggregateRating. Google ignores self-published review markup for
    // LocalBusiness, and ratings must never be made up.
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], siteUrl: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).href,
    })),
  };
}

export function serviceSchema(
  opts: { name: string; description: string; path: string; areas?: string[] },
  siteUrl: URL,
) {
  const base = siteUrl.href.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: new URL(opts.path, siteUrl).href,
    provider: { '@id': `${base}/#business` },
    areaServed: (opts.areas ?? site.areas).map((name) => ({ '@type': 'City', name })),
  };
}
