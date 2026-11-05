export default function SavedOverlay({ line, onDismiss }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        padding: 40,
        textAlign: 'center',
        background: 'var(--color-accent-100)',
      }}
    >
      <div
        style={{
          width: 118,
          height: 118,
          borderRadius: 999,
          background: 'var(--color-accent-2-300)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'tm-pop .42s cubic-bezier(.2,.9,.25,1) both',
        }}
      >
        <div style={{ width: 54, height: 54, borderRadius: 999, background: 'var(--color-accent)' }} />
      </div>
      <h2 style={{ fontSize: 30, margin: 0 }}>Noted.</h2>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--color-neutral-800)', margin: 0, maxWidth: 260 }}>{line}</p>
      <button className="btn btn-secondary tm-tap" onClick={onDismiss} style={{ minHeight: 46, paddingInline: 26 }}>
        Back to today
      </button>
    </div>
  );
}
