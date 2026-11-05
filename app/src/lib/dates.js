// Local calendar-day key, e.g. "2026-09-16" — never UTC, so a note taken
// late at night groups with the evening it was written, not the next day.
export function dayKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function diffCalendarDays(a, b) {
  const ms = startOfDay(a).getTime() - startOfDay(b).getTime();
  return Math.round(ms / 86400000);
}

const WEEKDAY_FMT = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
const MONTH_FMT = new Intl.DateTimeFormat('en-US', { month: 'long' });
const MONTH_SHORT_FMT = new Intl.DateTimeFormat('en-US', { month: 'short' });

// "Tuesday 16 September"
export function formatHeaderDate(date) {
  return `${WEEKDAY_FMT.format(date)} ${date.getDate()} ${MONTH_FMT.format(date)}`;
}

// "2:10 pm"
export function formatTime(date) {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    .format(date)
    .toLowerCase();
}

// "September" for the journal's month kicker
export function formatMonth(date) {
  return MONTH_FMT.format(date);
}

// "June 2026" for "keeping notes since"
export function formatMonthYear(date) {
  return `${MONTH_FMT.format(date)} ${date.getFullYear()}`;
}

// Day-group label used in the journal: Yesterday / weekday name / "3 Sep".
export function dayLabel(date, today = new Date()) {
  const diff = diffCalendarDays(today, date);
  if (diff === 1) return 'Yesterday';
  if (diff > 1 && diff < 7) return WEEKDAY_FMT.format(date);
  const withYear = date.getFullYear() !== today.getFullYear();
  return `${date.getDate()} ${MONTH_SHORT_FMT.format(date)}${withYear ? ' ' + date.getFullYear() : ''}`;
}

// Groups notes ({ createdAt, ... }) by local calendar day.
// Returns days sorted most-recent-first: [{ key, date, notes }].
export function groupByDay(notes) {
  const map = new Map();
  for (const note of notes) {
    const d = new Date(note.createdAt);
    const key = dayKey(d);
    if (!map.has(key)) map.set(key, { key, date: startOfDay(d), notes: [] });
    map.get(key).notes.push(note);
  }
  for (const group of map.values()) {
    group.notes.sort((a, b) => b.createdAt - a.createdAt);
  }
  return [...map.values()].sort((a, b) => b.date - a.date);
}

// Current streak (consecutive days with a note, walking back from today —
// or from yesterday if nothing's been written yet today) and the longest
// run seen anywhere in the note history.
export function computeStreaks(notes, today = new Date()) {
  const days = new Set(notes.map((n) => dayKey(new Date(n.createdAt))));
  const todayKey = dayKey(today);

  let current = 0;
  let cursor = new Date(today);
  if (!days.has(todayKey)) cursor.setDate(cursor.getDate() - 1);
  while (days.has(dayKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const sortedKeys = [...days].sort();
  let longest = 0;
  let run = 0;
  let prevTime = null;
  for (const key of sortedKeys) {
    const t = new Date(key + 'T00:00:00').getTime();
    run = prevTime !== null && t - prevTime === 86400000 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prevTime = t;
  }

  return { current, longest: Math.max(longest, current) };
}
