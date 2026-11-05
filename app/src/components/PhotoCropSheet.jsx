import { useEffect, useMemo, useRef, useState } from 'react';
import { cropToDataUrl, loadImageFile } from '../lib/image.js';

const FRAME = 260; // CSS px — the square crop viewport shown on screen
const OUTPUT = 480; // px — resolution of the saved photo

export default function PhotoCropSheet({ file, onCancel, onSave }) {
  const [state, setState] = useState(null); // { img, url, naturalW, naturalH }
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef(null);

  useEffect(() => {
    let cancelled = false;
    loadImageFile(file).then(({ img, url }) => {
      if (cancelled) return;
      setState({ img, url, naturalW: img.naturalWidth, naturalH: img.naturalHeight });
    });
    return () => {
      cancelled = true;
    };
  }, [file]);

  useEffect(() => {
    return () => {
      if (state?.url) URL.revokeObjectURL(state.url);
    };
  }, [state?.url]);

  // CSS px per source-image px at the current zoom, and the clamped pan
  // range that keeps the image covering the frame with no empty edges.
  const geometry = useMemo(() => {
    if (!state) return null;
    const baseScale = Math.max(FRAME / state.naturalW, FRAME / state.naturalH);
    const dispScale = baseScale * zoom;
    const dispW = state.naturalW * dispScale;
    const dispH = state.naturalH * dispScale;
    const maxX = Math.max(0, (dispW - FRAME) / 2);
    const maxY = Math.max(0, (dispH - FRAME) / 2);
    return { dispScale, dispW, dispH, maxX, maxY };
  }, [state, zoom]);

  const clampedOffset = useMemo(() => {
    if (!geometry) return offset;
    return {
      x: Math.min(geometry.maxX, Math.max(-geometry.maxX, offset.x)),
      y: Math.min(geometry.maxY, Math.max(-geometry.maxY, offset.y)),
    };
  }, [offset, geometry]);

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startY: e.clientY, origin: clampedOffset };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    setOffset({ x: drag.current.origin.x + dx, y: drag.current.origin.y + dy });
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const save = () => {
    if (!state || !geometry) return;
    const imgLeft = (FRAME - geometry.dispW) / 2 + clampedOffset.x;
    const imgTop = (FRAME - geometry.dispH) / 2 + clampedOffset.y;
    const sSize = FRAME / geometry.dispScale;
    const sx = -imgLeft / geometry.dispScale;
    const sy = -imgTop / geometry.dispScale;
    onSave(cropToDataUrl(state.img, { sx, sy, sSize }, OUTPUT));
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: 'color-mix(in srgb, var(--color-neutral-900) 55%, transparent)',
      }}
    >
      <div
        style={{
          background: 'var(--color-bg)',
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          padding: '22px 22px 30px',
          animation: 'tm-sheet .28s cubic-bezier(.2,.8,.2,1) both',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
          <h4 style={{ fontSize: 19, margin: 0, flex: 1 }}>Position your photo</h4>
          <button className="btn btn-secondary tm-tap" onClick={onCancel} style={{ width: 34, height: 34, padding: 0, fontSize: 15 }}>
            ✕
          </button>
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-neutral-700)', marginBottom: 14 }}>Drag to reposition, use the slider to zoom.</div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              position: 'relative',
              width: FRAME,
              height: FRAME,
              borderRadius: 999,
              overflow: 'hidden',
              touchAction: 'none',
              cursor: 'grab',
              background: 'var(--color-neutral-300)',
              boxShadow: '0 0 0 3px var(--color-accent-200)',
            }}
          >
            {state && geometry && (
              <img
                src={state.url}
                alt=""
                draggable={false}
                style={{
                  position: 'absolute',
                  width: geometry.dispW,
                  height: geometry.dispH,
                  left: (FRAME - geometry.dispW) / 2 + clampedOffset.x,
                  top: (FRAME - geometry.dispH) / 2 + clampedOffset.y,
                  maxWidth: 'none',
                  userSelect: 'none',
                }}
              />
            )}
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          style={{ width: '100%', marginTop: 18, accentColor: 'var(--color-accent)' }}
        />

        <button className="btn btn-primary btn-block tm-tap" onClick={save} disabled={!state} style={{ minHeight: 50, fontSize: 15, marginTop: 16 }}>
          Save photo
        </button>
      </div>
    </div>
  );
}
