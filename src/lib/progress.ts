// Little Buddha progress logic
// Enforces: only ONE day can be completed per real calendar day (Singapore time)
// Progress is stored locally and is private

const PROGRESS_KEY = "little-buddha-progress";

export type ProgressState = {
  currentDay: number;
  lastCompletedDate: string | null; // YYYY-MM-DD (SG)
};

export function getSingaporeDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function getProgress(): ProgressState {
  if (typeof window === "undefined") {
    return { currentDay: 1, lastCompletedDate: null };
  }

  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) {
    return { currentDay: 1, lastCompletedDate: null };
  }

  try {
    return JSON.parse(raw) as ProgressState;
  } catch {
    return { currentDay: 1, lastCompletedDate: null };
  }
}

export function canDoToday(): boolean {
  const progress = getProgress();
  const today = getSingaporeDate();
  return progress.lastCompletedDate !== today;
}

export function completeToday(): ProgressState {
  const progress = getProgress();
  const today = getSingaporeDate();

  const updated: ProgressState = {
    currentDay: Math.min(progress.currentDay + 1, 365),
    lastCompletedDate: today,
  };

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
  return updated;
}
