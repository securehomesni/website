/**
 * Bundle builder rules, shared by the page (first render) and the browser (live updates).
 * Discount percentages are set in `bundle.discounts` in src/config/site.ts.
 */

export type BundleChoice = {
  cameras: number; // 0 = no CCTV
  sensors: number; // 0 = no alarm
  lights: number; // 0 = no security lighting
};

export type BundleDiscounts = {
  twoServices: number;
  threeServices: number;
  largeSystemBonus: number;
  largeSystemFrom: number;
};

export type BundleResult = {
  services: number;
  devices: number;
  percent: number;
  reason: string;
  nextStep: string;
  lines: string[];
};

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function priceBundle(choice: BundleChoice, d: BundleDiscounts): BundleResult {
  const { cameras, sensors, lights } = choice;
  const services = [cameras, sensors, lights].filter((n) => n > 0).length;
  const devices = cameras + sensors + lights;

  const lines: string[] = [];
  if (cameras > 0) lines.push(`${plural(cameras, 'HD camera', 'HD cameras')} with a recorder and phone viewing`);
  if (sensors > 0) lines.push(`Intruder alarm with ${plural(sensors, 'sensor', 'sensors')}, a bell box and app control`);
  if (lights > 0) lines.push(`${plural(lights, 'LED security light', 'LED security lights')} with motion sensors`);

  let percent = 0;
  let reason = '';
  let nextStep = '';

  if (services === 3) {
    percent = d.threeServices;
    reason = 'For combining CCTV, an alarm and security lighting';
  } else if (services === 2) {
    percent = d.twoServices;
    reason = 'For combining two services';
    nextStep = `Add the third service to raise your discount to ${d.threeServices}%.`;
  } else {
    nextStep =
      services === 1
        ? `Add a second service to unlock a ${d.twoServices}% bundle discount.`
        : 'Choose at least one service to build your bundle.';
  }

  if (services >= 2) {
    if (devices >= d.largeSystemFrom) {
      percent += d.largeSystemBonus;
      reason += `, plus ${d.largeSystemBonus}% extra for a larger system`;
    } else if (!nextStep) {
      const more = d.largeSystemFrom - devices;
      nextStep = `Add ${plural(more, 'more device', 'more devices')} for an extra ${d.largeSystemBonus}% off.`;
    }
  }

  return { services, devices, percent, reason, nextStep, lines };
}

/** Plain-text description, used to pre-fill the call-back form's message. */
export function describeBundle(choice: BundleChoice, home?: string): string {
  const parts: string[] = [];
  if (choice.cameras > 0) parts.push(plural(choice.cameras, 'camera', 'cameras'));
  if (choice.sensors > 0) parts.push(`an alarm with ${plural(choice.sensors, 'sensor', 'sensors')}`);
  if (choice.lights > 0) parts.push(plural(choice.lights, 'security light', 'security lights'));
  if (!parts.length) return '';
  return `Bundle request: ${parts.join(', ')}.${home ? ` Type of home: ${home}.` : ''}`;
}
