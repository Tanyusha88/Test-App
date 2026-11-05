// Kind → [tint background, tint text, solid accent] using the Organic ramps.
export const KINDS = {
  Kindness: ['var(--color-accent-100)', 'var(--color-accent-800)', 'var(--color-accent-500)'],
  Effort: ['var(--color-accent-2-100)', 'var(--color-accent-2-800)', 'var(--color-accent-2-500)'],
  Courage: ['var(--color-accent-200)', 'var(--color-accent-900)', 'var(--color-accent-700)'],
  Rest: ['var(--color-neutral-100)', 'var(--color-neutral-800)', 'var(--color-neutral-500)'],
  Growth: ['var(--color-accent-2-200)', 'var(--color-accent-2-900)', 'var(--color-accent-2-700)'],
};

export const KIND_NAMES = Object.keys(KINDS);

export function tint(kind) {
  const c = KINDS[kind] || KINDS.Kindness;
  return { bg: c[0], fg: c[1], color: c[2] };
}

export const KIND_ACTS = [
  'Text one person to say what you appreciate about them.',
  'Let someone go ahead of you today, without making a point of it.',
  'Ask a colleague what they are stuck on, then actually help.',
];

export const SUGGESTIONS = [
  'Thank you, me, for showing up when I did not feel like it.',
  'Thank you, me, for being patient with someone who needed it.',
  'Thank you, me, for taking the walk instead of the scroll.',
];
