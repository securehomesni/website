/**
 * Homepage FAQs. Answers are HTML so they can contain links.
 * Keep answers short; link to a guide for anything longer.
 */
export const ICO_HOME_CCTV_URL =
  'https://ico.org.uk/your-data-matters/domestic-cctv-systems-guidance-for-people-using-cctv/';

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Is it legal to have CCTV on my house?',
    answer: `Yes. You can use CCTV to protect your home. If your cameras only record your own property, data protection law doesn't apply to the footage. If they capture anything beyond your boundary, such as the street or a neighbour's garden, UK data protection law does apply and you'll have some responsibilities. The Information Commissioner's Office explains these in its <a href="${ICO_HOME_CCTV_URL}">guidance on home CCTV systems</a>, and we've summarised it in our <a href="/guides/domestic-cctv-and-the-law/">guide to domestic CCTV and the law</a>.`,
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
