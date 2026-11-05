import { formatHeaderDate } from '../lib/dates.js';

export default function Today({ now, streak, todayNotes, kindActs, onOpenCompose }) {
  const prompt = todayNotes.length ? 'Anything else worth thanking yourself for?' : 'What did you do well today?';
  const todayCount = todayNotes.length === 1 ? '1 note' : `${todayNotes.length} notes`;
  const todayEmpty = todayNotes.length === 0;

  return (
    <>
      <div style={{ padding: '40px 22px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 6 }}>
            {formatHeaderDate(now)}
          </div>
          <h2 style={{ fontSize: 31, margin: 0, lineHeight: 1.08 }}>
            Thank you,
            <br />
            me.
          </h2>
        </div>
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 999,
            background: 'var(--color-accent-2-200)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
            lineHeight: 1,
          }}
        >
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 19, color: 'var(--color-accent-2-800)' }}>{streak}</span>
          <span style={{ fontSize: 8, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-accent-2-800)', marginTop: 3 }}>
            days
          </span>
        </div>
      </div>

      <div style={{ padding: '22px 22px 0' }}>
        <div className="card elev-sm tm-tap" onClick={onOpenCompose} style={{ background: 'var(--color-accent-200)', padding: 20, gap: 14 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 21, lineHeight: 1.25, color: 'var(--color-accent-900)' }}>{prompt}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: 'var(--color-accent)',
                color: 'var(--color-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flex: 'none',
                paddingBottom: 2,
              }}
            >
              +
            </span>
            <span style={{ fontSize: 13, color: 'var(--color-accent-900)' }}>Add a note</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '26px 22px 4px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h4 style={{ fontSize: 15, margin: 0 }}>Today</h4>
        <span style={{ fontSize: 11.5, color: 'var(--color-neutral-600)' }}>{todayCount}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 22px 0' }}>
        {todayNotes.map((n) => (
          <div key={n.id} className="card elev-sm" style={{ padding: '16px 18px', gap: 9, animation: 'tm-rise .3s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="tag" style={{ fontSize: 10, padding: '3px 10px', background: n.bg, color: n.fg }}>
                {n.kind}
              </span>
              <span style={{ fontSize: 11, color: 'var(--color-neutral-600)', marginLeft: 'auto' }}>{n.time}</span>
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{n.text}</div>
          </div>
        ))}
        {todayEmpty && (
          <div style={{ padding: '28px 22px', borderRadius: 30, border: '1.5px dashed var(--color-neutral-400)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17, marginBottom: 5 }}>Nothing yet today</div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Small counts. Tying up one loose end counts.</div>
          </div>
        )}
      </div>

      <div style={{ padding: '28px 22px 0' }}>
        <div className="card" style={{ background: 'var(--color-accent-2-100)', padding: '18px 20px', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--color-accent-2-900)' }}>Pass it on</span>
            <span style={{ fontSize: 11.5, color: 'var(--color-accent-2-800)' }}>something kind for someone else</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {kindActs.map((a, i) => (
              <button
                key={i}
                className="tm-tap"
                onClick={a.onPick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 11,
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: `1px solid ${a.line}`,
                  background: a.bg,
                  borderRadius: 22,
                  padding: '11px 14px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: 'var(--color-accent-2-900)',
                }}
              >
                <span style={{ width: 20, height: 20, borderRadius: 999, flex: 'none', background: a.dot }} />
                <span style={{ flex: 1 }}>{a.text}</span>
                <span style={{ fontSize: 11, color: 'var(--color-accent-2-800)', flex: 'none' }}>{a.state}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: 120 }} />
    </>
  );
}
