export default function TabBar({ tabs }) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        marginTop: 'auto',
        padding: '10px 22px 26px',
        background: 'linear-gradient(to top, var(--color-bg) 62%, transparent)',
      }}
    >
      <div className="elev-md" style={{ display: 'flex', background: 'var(--color-neutral-900)', borderRadius: 999, padding: 6 }}>
        {tabs.map((t) => (
          <button
            key={t.label}
            className="tm-tap"
            onClick={t.onPick}
            style={{
              flex: 1,
              border: 0,
              cursor: 'pointer',
              borderRadius: 999,
              padding: '11px 4px',
              fontFamily: 'var(--font-heading)',
              fontSize: 13,
              background: t.bg,
              color: t.fg,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
