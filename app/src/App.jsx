import { useMemo, useState } from 'react';
import './App.css';
import { usePersistentState } from './hooks/usePersistentState.js';
import { KIND_ACTS, KIND_NAMES, SUGGESTIONS, tint } from './lib/data.js';
import { computeStreaks, dayKey, formatMonthYear, formatTime, groupByDay } from './lib/dates.js';
import { uid } from './lib/id.js';
import Onboard from './screens/Onboard.jsx';
import Today from './screens/Today.jsx';
import Journal from './screens/Journal.jsx';
import Profile from './screens/Profile.jsx';
import ComposeSheet from './components/ComposeSheet.jsx';
import SavedOverlay from './components/SavedOverlay.jsx';
import TabBar from './components/TabBar.jsx';

const TABS = [
  { key: 'today', label: 'Today' },
  { key: 'journal', label: 'Journal' },
  { key: 'profile', label: 'You' },
];

export default function App() {
  const [now] = useState(() => new Date());
  const todayKey = dayKey(now);

  const [onboarded, setOnboarded] = usePersistentState('onboarded', false);
  const [memberSince, setMemberSince] = usePersistentState('memberSince', null);
  const [notes, setNotes] = usePersistentState('notes', []);
  const [doneActsByDay, setDoneActsByDay] = usePersistentState('doneActs', {});
  const [reminder, setReminder] = usePersistentState('reminder', true);
  const [privateNotes, setPrivateNotes] = usePersistentState('private', true);

  const [screen, setScreen] = useState(onboarded ? 'today' : 'onboard');
  const [composing, setComposing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState('');
  const [draftKind, setDraftKind] = useState('Kindness');
  const [exported, setExported] = useState(false);

  const enter = (nextScreen) => {
    if (!onboarded) {
      setOnboarded(true);
      setMemberSince(Date.now());
    }
    setScreen(nextScreen);
  };

  const go = (nextScreen) => {
    setScreen(nextScreen);
    setComposing(false);
  };

  const save = () => {
    const text = draft.trim();
    if (!text) return;
    const note = { id: uid(), kind: draftKind, text, createdAt: Date.now() };
    setNotes((prev) => [note, ...prev]);
    setComposing(false);
    setSaved(true);
    setDraft('');
  };

  const withTint = (n) => ({ ...n, ...tint(n.kind), time: formatTime(new Date(n.createdAt)) });

  const todayNotes = useMemo(
    () => notes.filter((n) => dayKey(new Date(n.createdAt)) === todayKey).map(withTint),
    [notes, todayKey]
  );

  const pastDays = useMemo(() => {
    return groupByDay(notes)
      .filter((g) => g.key !== todayKey)
      .map((g) => ({ ...g, notes: g.notes.map(withTint) }));
  }, [notes, todayKey]);

  const streaks = useMemo(() => computeStreaks(notes, now), [notes, now]);
  const daysKept = useMemo(() => groupByDay(notes).length, [notes]);

  const breakdown = useMemo(() => {
    const counts = Object.fromEntries(KIND_NAMES.map((k) => [k, 0]));
    for (const n of notes) counts[n.kind] = (counts[n.kind] || 0) + 1;
    const total = notes.length;
    return KIND_NAMES.map((kind) => {
      const count = counts[kind];
      const pct = total ? Math.round((count / total) * 100) : 0;
      return { kind, pct, width: pct + '%', color: tint(kind).color, count };
    }).sort((a, b) => b.count - a.count);
  }, [notes]);

  const doneActs = doneActsByDay[todayKey] || [];
  const toggleAct = (i) => {
    setDoneActsByDay((prev) => {
      const current = prev[todayKey] || [];
      const next = current.includes(i) ? current.filter((x) => x !== i) : current.concat(i);
      return { ...prev, [todayKey]: next };
    });
  };

  const kindActs = KIND_ACTS.map((text, i) => {
    const done = doneActs.includes(i);
    return {
      text,
      state: done ? 'done' : '',
      bg: done ? 'var(--color-accent-2-200)' : 'transparent',
      line: done ? 'var(--color-accent-2-400)' : 'var(--color-divider)',
      dot: done ? 'var(--color-accent-2-600)' : 'var(--color-accent-2-300)',
      onPick: () => toggleAct(i),
    };
  });

  const tabs = TABS.map((t) => ({
    label: t.label,
    onPick: () => go(t.key),
    bg: screen === t.key ? 'var(--color-accent)' : 'transparent',
    fg: screen === t.key ? 'var(--color-bg)' : 'var(--color-neutral-400)',
  }));

  const exportNotes = () => {
    const lines = [...notes]
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((n) => `${new Date(n.createdAt).toLocaleString()} — ${n.kind}\n${n.text}`)
      .join('\n\n');
    const blob = new Blob([lines || 'No notes yet.'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thank-you-me-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  };

  const showTabs = screen !== 'onboard' && !saved;

  return (
    <div className="app-shell">
      <div className="screen tm-scroll" style={{ position: 'relative', overflowY: 'auto' }}>
        {screen === 'onboard' && (
          <Onboard
            onBegin={() => {
              enter('today');
              setComposing(true);
            }}
            onBeginJournal={() => enter('journal')}
          />
        )}

        {screen === 'today' && (
          <Today
            now={now}
            streak={streaks.current}
            todayNotes={todayNotes}
            kindActs={kindActs}
            onOpenCompose={() => setComposing(true)}
          />
        )}

        {screen === 'journal' && (
          <Journal streak={streaks.current} longestStreak={streaks.longest} days={pastDays} now={now} />
        )}

        {screen === 'profile' && (
          <Profile
            totalNotes={notes.length}
            daysKept={daysKept}
            longestStreak={streaks.longest}
            memberSince={memberSince ? formatMonthYear(new Date(memberSince)) : formatMonthYear(now)}
            breakdown={breakdown}
            reminder={reminder}
            onToggleReminder={() => setReminder((v) => !v)}
            privateNotes={privateNotes}
            onTogglePrivate={() => setPrivateNotes((v) => !v)}
            exported={exported}
            onExport={exportNotes}
          />
        )}

        {showTabs && <TabBar tabs={tabs} />}

        {composing && (
          <ComposeSheet
            draft={draft}
            onDraft={setDraft}
            kind={draftKind}
            onPickKind={setDraftKind}
            suggestions={SUGGESTIONS}
            onClose={() => setComposing(false)}
            onSave={save}
          />
        )}

        {saved && (
          <SavedOverlay
            line={`That is ${todayNotes.length} today. It stays here for you to find again.`}
            onDismiss={() => {
              setSaved(false);
              setScreen('today');
            }}
          />
        )}
      </div>
    </div>
  );
}
