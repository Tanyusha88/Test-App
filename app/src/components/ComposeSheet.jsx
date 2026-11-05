import { KIND_NAMES, tint } from '../lib/data.js';

export default function ComposeSheet({ draft, onDraft, kind, onPickKind, suggestions, onClose, onSave }) {
  const cantSave = draft.trim().length === 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: 'color-mix(in srgb, var(--color-neutral-900) 42%, transparent)',
      }}
    >
      <div className="tm-tap" onClick={onClose} style={{ flex: 1 }} />
      <div
        style={{
          background: 'var(--color-bg)',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: '22px 22px 30px',
          animation: 'tm-sheet .28s cubic-bezier(.2,.8,.2,1) both',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
          <h4 style={{ fontSize: 19, margin: 0, flex: 1 }}>A note to yourself</h4>
          <button className="btn btn-secondary tm-tap" onClick={onClose} style={{ width: 34, height: 34, padding: 0, fontSize: 15 }}>
            ✕
          </button>
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-neutral-700)', marginBottom: 8 }}>What was it about?</div>
        <div className="tm-scroll" style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4 }}>
          {KIND_NAMES.map((k) => {
            const on = kind === k;
            const c = tint(k);
            return (
              <button
                key={k}
                className="tm-tap"
                onClick={() => onPickKind(k)}
                style={{
                  flex: 'none',
                  cursor: 'pointer',
                  borderRadius: 2,
                  fontFamily: 'var(--font-body)',
                  fontSize: 12.5,
                  padding: '8px 15px',
                  border: `1px solid ${on ? c.color : 'var(--color-divider)'}`,
                  background: on ? c.color : 'transparent',
                  color: on ? 'var(--color-bg)' : 'var(--color-neutral-800)',
                }}
              >
                {k}
              </button>
            );
          })}
        </div>
        <textarea
          className="input"
          rows={3}
          placeholder="Thank you, me, for…"
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          style={{ marginTop: 14, borderRadius: 2, minHeight: 96, fontSize: 14.5, lineHeight: 1.55, padding: '14px 16px', resize: 'none' }}
        />
        <div style={{ fontSize: 11.5, color: 'var(--color-neutral-600)', margin: '12px 0 7px' }}>Or borrow one</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {suggestions.map((s) => (
            <button
              key={s}
              className="tm-tap"
              onClick={() => onDraft(s)}
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid var(--color-divider)',
                background: 'var(--color-surface)',
                borderRadius: 2,
                padding: '11px 15px',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                lineHeight: 1.5,
                color: 'var(--color-text)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          className="btn btn-primary btn-block tm-tap"
          onClick={onSave}
          disabled={cantSave}
          style={{ minHeight: 50, fontSize: 15, marginTop: 16 }}
        >
          Save this note
        </button>
      </div>
    </div>
  );
}
