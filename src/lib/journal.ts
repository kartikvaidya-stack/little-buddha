// Journal storage helpers for Little Buddha
// Stores private journal entries in localStorage under a single key

export type JournalEntry = {
  date: string; // YYYY-MM-DD (SG)
  day: number; // day number 1-365
  text: string;
  teachingTitle?: string;
  title?: string;
};

const JOURNAL_KEY = "little-buddha-journals";

function readRaw(): Record<string, JournalEntry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeRaw(map: Record<string, JournalEntry>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(map));
}

export function saveJournalEntry(entry: JournalEntry) {
  const map = readRaw();
  map[entry.date] = entry;
  writeRaw(map);
}

export function getJournalEntry(date: string): JournalEntry | null {
  const map = readRaw();
  return map[date] ?? null;
}

export function listJournalEntries(): JournalEntry[] {
  const map = readRaw();
  return Object.values(map).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function removeJournalEntry(date: string) {
  const map = readRaw();
  if (map[date]) {
    delete map[date];
    writeRaw(map);
  }
}
