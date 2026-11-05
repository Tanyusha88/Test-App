import { dayLabel, formatMonth } from '../lib/dates.js';

export default function Journal({ streak, longestStreak, days, now }) {
  const evenings = streak === 1 ? '1 evening' : `${streak} evenings`;
  const longest = longestStreak === 1 ? '1 day' : `${longestStreak} days`;
  const streakLine =
    streak > 0
      ? `${evenings} in a row. The longest run so far was ${longest}.`
      : `No streak going right now. The longest run so far was ${longest}.`;

  return (
    <>
      <div style={{ padding: '40px 22px 0' }}>
        <div style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 6 }}>
          {formatMonth(now)}
        </div>
        <h2 style={{ fontSize: 31, margin: '0 0 18px' }}>The journal</h2>
        <div className="card" style={{ background: 'var(--color-accent-2-100)', flexDirection: 'row', alignItems: 'center', gap: 16, padding: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 999,
              background: 'var(--color-accent-2-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'none',
            }}
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--color-accent-2-900)' }}>{streak}</span>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--color-accent-2-900)' }}>{streakLine}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '22px 22px 0' }}>
        {days.map((d) => (
          <div key={d.key}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 16 }}>{dayLabel(d.date, now)}</span>
              <span style={{ fontSize: 11, color: 'var(--color-neutral-600)' }}>
                {d.notes.length === 1 ? '1 note' : `${d.notes.length} notes`}
              </span>
              <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {d.notes.map((n) => (
                <div key={n.id} className="card elev-sm" style={{ padding: '14px 16px', gap: 7 }}>
                  <span
                    className="tag"
                    style={{ fontSize: 10, padding: '2px 9px', alignSelf: 'flex-start', background: n.bg, color: n.fg }}
                  >
                    {n.kind}
                  </span>
                  <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>{n.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {days.length === 0 && (
          <div style={{ padding: '28px 22px', borderRadius: 30, border: '1.5px dashed var(--color-neutral-400)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17, marginBottom: 5 }}>Nothing here yet</div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Past days will collect here as you keep writing.</div>
          </div>
        )}
      </div>
      <div style={{ height: 120 }} />
    </>
  );
}
