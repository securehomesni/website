/**
 * "How we compare" table on the homepage.
 *
 * IMPORTANT: comparisons with named competitors must be accurate, fair and checkable
 * (CAP Code rules on comparative advertising). Only state what each company publishes,
 * re-check every row at least every six months, and update `lastChecked`.
 * Have this reviewed before launch.
 *
 * Sources (checked November 2026):
 * - Ring: https://en-uk.ring.com/pages/features
 *   ("A Ring Protect subscription unlocks Video Recording, Saving and Sharing")
 * - Verisure: https://www.verisure.co.uk/advice-and-help/frequently-asked-questions/how-much-does-a-verisure-alarm-cost
 *   (upfront installation payment, monthly subscription, 12-month minimum contract)
 *   https://www.verisure.co.uk/advice-and-help/frequently-asked-questions/how-long-is-the-contract-and-how-do-i-cancel-it
 *   ("Equipment remains property of Verisure", 60 days' notice after the initial term)
 * - ADT: no reliable published residential terms found, so the ADT column stays general.
 */
export const lastChecked = 'November 2026';

export const competitors = ['Ring', 'Verisure', 'ADT'] as const;

export const rows: { label: string; us: string; others: [string, string, string] }[] = [
  {
    label: 'Who fits it',
    us: 'Our own local engineers',
    others: ['Designed for you to fit yourself', 'Professional installation', 'Professional installation'],
  },
  {
    label: 'Who owns the equipment',
    us: 'You do',
    others: ['You do', 'Verisure (it stays their property)', 'Depends on your agreement'],
  },
  {
    label: 'Saving camera recordings',
    us: 'Saved on a recorder in your home, no subscription',
    others: ['Needs a Ring Protect subscription', 'Depends on your package', 'Depends on your package'],
  },
  {
    label: 'Monthly fees',
    us: 'Only if you choose monitoring or servicing',
    others: ['For recording, through Ring Protect', 'Yes, a monthly subscription', 'Usually, for monitoring'],
  },
  {
    label: 'Minimum contract',
    us: 'None',
    others: ['None for the devices', '12 months', 'Check your agreement'],
  },
  {
    label: 'Who you deal with',
    us: 'A local team based in Belfast',
    others: ['A global brand (part of Amazon)', 'A national company', 'A national company'],
  },
];
