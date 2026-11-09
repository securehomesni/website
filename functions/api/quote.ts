/**
 * Cloudflare Pages Function: POST /api/quote
 *
 * 1. Rejects bots (honeypot field + Cloudflare Turnstile verification)
 * 2. Validates the fields again on the server
 * 3. Emails the enquiry to the business via Resend
 * 4. Replies with JSON (JavaScript form) or redirects (no-JavaScript form)
 *
 * Environment variables (Cloudflare Pages → Settings → Variables and secrets):
 *   TURNSTILE_SECRET_KEY  required  Turnstile secret key
 *   RESEND_API_KEY        required  API key from resend.com
 *   QUOTE_TO_EMAIL        required  where enquiries are sent
 *   QUOTE_FROM_EMAIL      required  verified sender, e.g. "Website <website@yourdomain.co.uk>"
 *   DEV_MODE              optional  "true" logs enquiries instead of emailing (local testing only)
 */

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  QUOTE_TO_EMAIL?: string;
  QUOTE_FROM_EMAIL?: string;
  DEV_MODE?: string;
}

interface Context {
  request: Request;
  env: Env;
}

type FieldName = 'name' | 'phone' | 'email' | 'postcode' | 'message';
type Errors = Partial<Record<FieldName, string>>;

const MAX = { name: 100, phone: 20, email: 150, postcode: 10, message: 2000 } as const;

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  const wantsJson = (request.headers.get('Accept') ?? '').includes('application/json');

  const respond = (status: number, body: Record<string, unknown>, redirectTo: string) =>
    wantsJson
      ? Response.json(body, { status })
      : Response.redirect(new URL(redirectTo, request.url).toString(), 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(400, { ok: false, message: 'We couldn’t read the form. Please try again.' }, '/contact/?error=1');
  }

  const get = (key: string) => String(form.get(key) ?? '').trim();

  // Honeypot: real people never see this field. Pretend it worked so bots move on.
  if (get('website')) {
    return respond(200, { ok: true }, '/thank-you/');
  }

  // Turnstile
  const token = get('cf-turnstile-response');
  const passed = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
  if (!passed) {
    return respond(
      400,
      { ok: false, message: 'The spam check didn’t complete. Please try again, or give us a call.' },
      '/contact/?error=1',
    );
  }

  const data = {
    name: get('name').slice(0, MAX.name),
    phone: get('phone').slice(0, MAX.phone),
    email: get('email').slice(0, MAX.email),
    postcode: get('postcode').toUpperCase().slice(0, MAX.postcode),
    message: get('message').slice(0, MAX.message),
    interests: form.getAll('interest').map(String).slice(0, 10),
  };

  const errors = validate(data);
  if (Object.keys(errors).length) {
    return respond(422, { ok: false, errors }, '/contact/?error=1');
  }

  try {
    await sendEmail(data, env);
  } catch (err) {
    console.error('Quote email failed', err);
    return respond(
      502,
      { ok: false, message: 'Your request wasn’t sent because of a problem on our side. Please call us instead.' },
      '/contact/?error=1',
    );
  }

  return respond(200, { ok: true }, '/thank-you/');
};

// A GET (e.g. someone opening /api/quote in a browser) gets a clear answer
export const onRequestGet = async (): Promise<Response> =>
  new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });

function validate(d: { name: string; phone: string; email: string; postcode: string }): Errors {
  const errors: Errors = {};
  if (!d.name) errors.name = 'Enter your full name';
  if (!d.phone) errors.phone = 'Enter your phone number';
  else if (!/^[0-9 +()-]+$/.test(d.phone) || d.phone.replace(/\D/g, '').length < 10)
    errors.phone = 'Enter a phone number, like 07700 900123 or 028 9000 0000';
  if (!d.email) errors.email = 'Enter your email address';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    errors.email = 'Enter an email address in the correct format, like name@example.com';
  if (!d.postcode) errors.postcode = 'Enter your postcode';
  else if (!/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(d.postcode))
    errors.postcode = 'Enter a full postcode, like BT1 1AA';
  return errors;
}

async function verifyTurnstile(token: string, secret: string | undefined, ip: string | null): Promise<boolean> {
  if (!token || !secret) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const outcome = (await res.json()) as { success?: boolean };
    return outcome.success === true;
  } catch {
    return false;
  }
}

async function sendEmail(
  d: { name: string; phone: string; email: string; postcode: string; message: string; interests: string[] },
  env: Env,
): Promise<void> {
  const text = [
    'New free survey request from the website',
    '',
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `Postcode: ${d.postcode}`,
    `Interested in: ${d.interests.length ? d.interests.join(', ') : 'Not specified'}`,
    '',
    'Message:',
    d.message || '(none)',
  ].join('\n');

  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL || !env.QUOTE_FROM_EMAIL) {
    if (env.DEV_MODE === 'true') {
      console.log(`[DEV_MODE] Email not sent. Enquiry received:\n${text}`);
      return;
    }
    throw new Error('Email is not configured: set RESEND_API_KEY, QUOTE_TO_EMAIL and QUOTE_FROM_EMAIL');
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.QUOTE_FROM_EMAIL,
      to: [env.QUOTE_TO_EMAIL],
      reply_to: d.email,
      subject: `Survey request: ${d.name}, ${d.postcode}`,
      text, // plain text only, so nothing the visitor typed can be rendered as HTML
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}
