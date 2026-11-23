/**
 * FAQs, shown on the contact page. Answers are HTML so they can contain links.
 * Keep answers short; link to a guide for anything longer.
 */
export const ICO_HOME_CCTV_URL =
  'https://ico.org.uk/your-data-matters/domestic-cctv-systems-guidance-for-people-using-cctv/';

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Is it legal to have CCTV on my house?',
    answer: `Yes. You can use CCTV to protect your home. If your cameras only record your own property, data protection law doesn't apply to the footage. If they capture anything beyond your boundary, such as the street or a neighbour's garden, UK data protection law does apply and you'll have some responsibilities. The Information Commissioner's Office explains these in its <a href="${ICO_HOME_CCTV_URL}">guidance on home CCTV systems</a>.`,
  },
  {
    question: 'Will my cameras record my neighbours?',
    answer:
      "We position every camera to focus on your property, and we can use privacy masking to black out areas you shouldn't record, such as a neighbour's windows or garden. We'll show you exactly what each camera sees before we leave.",
  },
  {
    question: 'Do I need a sign saying CCTV is in use?',
    answer:
      "If your cameras record beyond your property, you should let people know, and a sign is the simplest way to do that. If they only cover your own property, a sign isn't required, though many people choose to put one up anyway.",
  },
  {
    question: 'What does SSAIB registered mean?',
    answer:
      "SSAIB is an independent certification body for security installers. Registered companies are inspected regularly to check that their installations, paperwork and staff vetting meet recognised standards. Some insurers ask for an alarm fitted by a certified installer.",
  },
  {
    question: 'Can I see my cameras and control my alarm from my phone?',
    answer:
      "Yes. We set up the app on your phone before we leave and show you how to view live and recorded footage, save a clip, and set or unset your alarm.",
  },
  {
    question: 'How long does installation take?',
    // PLACEHOLDER: confirm typical timings
    answer:
      'Most homes take one day for CCTV or an alarm, and up to two days for both. We agree a date that suits you when you accept the quote.',
  },
  {
    question: 'Is the survey really free?',
    answer:
      "Yes. There's no charge and no obligation. An engineer visits, looks at your home with you, and sends a fixed written quote afterwards.",
  },
];

/** FAQs for the home security (services) page. */
export const serviceFaqs: { question: string; answer: string }[] = [
  {
    question: 'How much does a home security system cost?',
    // PLACEHOLDER: add typical price ranges if you're happy to publish them
    answer:
      'It depends on the size of your home and what you want to protect. After a free survey we send a fixed written quote, so you know the full price before any work starts. Our <a href="/#bundle-title">CCTV, alarm and security light bundle</a> is a good starting point for many homes.',
  },
  {
    question: 'Do I need CCTV, an alarm or both?',
    answer:
      "CCTV lets you see what's happening and keeps a record. An alarm warns you and scares people off when someone tries to get in. Security lighting makes both work better at night. Many people choose all three, but we'll only recommend what your home needs.",
  },
  {
    question: "Can you repair or service a system you didn't install?",
    answer:
      'Yes. We repair, upgrade and service most CCTV and alarm systems, and we can take over systems fitted by other companies, including ones that have stopped trading.',
  },
  {
    question: 'Can I switch to you from Ring, Verisure or ADT?',
    answer:
      "Yes. Check your contract's end date and notice period, then request a call back. We'll survey your home, keep any equipment you own where we can, and time the installation so you're never left without protection.",
  },
  {
    question: 'What brands do you install?',
    answer:
      'We specialise in Hikvision CCTV and Pyronix intruder alarms, both of which you can control from an app on your phone.',
  },
  {
    question: 'What guarantee do I get?',
    answer: 'Every installation comes with a 12-month guarantee covering equipment and workmanship.',
  },
  {
    question: 'Is it legal to have CCTV on my house?',
    answer: faqs[0].answer,
  },
];
