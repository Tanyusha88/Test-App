export default function Onboard({ onBegin, onBeginJournal }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 26px 40px' }}>
      <div
        style={{
          width: 112,
          height: 112,
          borderRadius: 999,
          background: 'var(--color-accent-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
        }}
      >
        <div style={{ width: 62, height: 62, borderRadius: 999, background: 'var(--color-accent-2-300)' }} />
      </div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'var(--color-accent-700)',
          marginBottom: 10,
        }}
      >
        A daily practice
      </div>
      <h2 style={{ fontSize: 36, margin: '0 0 14px', lineHeight: 1.05 }}>
        Thank
        <br />
        yourself
        <br />
        first.
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--color-neutral-800)', margin: '0 0 6px', maxWidth: 300 }}>
        Each evening, write down something you did well and say thanks for it. Nobody else sees it.
      </p>
      <div style={{ flex: 1, minHeight: 34 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          className="btn btn-primary btn-block tm-tap"
          onClick={onBegin}
          style={{ minHeight: 52, fontSize: 16, margin: 0 }}
        >
          Write today's note
        </button>
        <button
          className="btn btn-secondary btn-block tm-tap"
          onClick={onBeginJournal}
          style={{ minHeight: 48, margin: 0 }}
        >
          I've kept one before
        </button>
      </div>
    </div>
  );
}
