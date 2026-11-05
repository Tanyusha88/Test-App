export default function Profile({
  totalNotes,
  daysKept,
  longestStreak,
  memberSince,
  breakdown,
  reminder,
  onToggleReminder,
  privateNotes,
  onTogglePrivate,
  exported,
  onExport,
}) {
  const reminderTime = reminder ? 'Every day at 9:00 pm' : 'Off — you decide when';
  const reminderTrack = reminder ? 'var(--color-accent)' : 'var(--color-neutral-400)';
  const reminderAlign = reminder ? 'flex-end' : 'flex-start';
  const privateLine = privateNotes ? 'Nothing leaves this device' : 'Synced to your account';
  const privateTrack = privateNotes ? 'var(--color-accent-2-500)' : 'var(--color-neutral-400)';
  const privateAlign = privateNotes ? 'flex-end' : 'flex-start';
  const exportLabel = exported ? 'Downloaded' : 'Export all notes';

  return (
    <>
      <div style={{ padding: '40px 22px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          className="washed"
          style={{
            width: 78,
            height: 78,
            borderRadius: 999,
            background: 'var(--color-accent-300)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <span style={{ fontSize: 8, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(32,30,29,.5)' }}>photo</span>
        </div>
        <div>
          <h2 style={{ fontSize: 26, margin: '0 0 3px' }}>You</h2>
          <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)' }}>Keeping notes since {memberSince}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 9, padding: '22px 22px 0' }}>
        <div className="card" style={{ flex: 1, gap: 2, padding: '15px 14px', background: 'var(--color-accent-100)' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 21 }}>{totalNotes}</span>
          <span style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-accent-800)' }}>Notes</span>
        </div>
        <div className="card" style={{ flex: 1, gap: 2, padding: '15px 14px', background: 'var(--color-accent-2-100)' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 21 }}>{daysKept}</span>
          <span style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-accent-2-800)' }}>
            Days kept
          </span>
        </div>
        <div className="card" style={{ flex: 1, gap: 2, padding: '15px 14px', background: 'var(--color-neutral-100)' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 21 }}>{longestStreak}</span>
          <span style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
            Longest
          </span>
        </div>
      </div>

      <div style={{ padding: '26px 22px 0' }}>
        <h4 style={{ fontSize: 15, margin: '0 0 12px' }}>What you thank yourself for</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {breakdown.map((b) => (
            <div key={b.kind} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, width: 82, flex: 'none' }}>{b.kind}</span>
              <span style={{ flex: 1, height: 10, borderRadius: 999, background: 'var(--color-neutral-300)', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', borderRadius: 999, width: b.width, background: b.color }} />
              </span>
              <span style={{ fontSize: 11.5, color: 'var(--color-neutral-700)', width: 30, textAlign: 'right', flex: 'none' }}>
                {b.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '28px 22px 0' }}>
        <h4 style={{ fontSize: 15, margin: '0 0 10px' }}>Settings</h4>
        <div className="card" style={{ padding: '4px 18px', gap: 0, background: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 0', borderBottom: '1px solid var(--color-divider)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14 }}>Evening reminder</div>
              <div style={{ fontSize: 11.5, color: 'var(--color-neutral-600)' }}>{reminderTime}</div>
            </div>
            <span
              className="tm-tap"
              onClick={onToggleReminder}
              role="switch"
              aria-checked={reminder}
              tabIndex={0}
              style={{
                width: 48,
                height: 28,
                borderRadius: 999,
                flex: 'none',
                padding: 3,
                display: 'flex',
                background: reminderTrack,
                justifyContent: reminderAlign,
              }}
            >
              <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--color-bg)', boxShadow: 'var(--shadow-sm)' }} />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 0', borderBottom: '1px solid var(--color-divider)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14 }}>Keep notes private</div>
              <div style={{ fontSize: 11.5, color: 'var(--color-neutral-600)' }}>{privateLine}</div>
            </div>
            <span
              className="tm-tap"
              onClick={onTogglePrivate}
              role="switch"
              aria-checked={privateNotes}
              tabIndex={0}
              style={{
                width: 48,
                height: 28,
                borderRadius: 999,
                flex: 'none',
                padding: 3,
                display: 'flex',
                background: privateTrack,
                justifyContent: privateAlign,
              }}
            >
              <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--color-bg)', boxShadow: 'var(--shadow-sm)' }} />
            </span>
          </div>
          <div className="tm-tap" onClick={onExport} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 0' }}>
            <div style={{ flex: 1, fontSize: 14 }}>{exportLabel}</div>
            <span style={{ fontSize: 15, color: 'var(--color-accent)' }}>→</span>
          </div>
        </div>
      </div>
      <div style={{ height: 120 }} />
    </>
  );
}
