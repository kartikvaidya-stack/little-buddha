"use client";

import React, { useEffect, useState } from "react";
import { getProgress } from "../../lib/progress";
import Link from "next/link";

export default function LibraryPage() {
  const [days, setDays] = useState<any[]>([]);
  const progress = getProgress();
  const unlockedDay = Math.min(progress.currentDay, 365);

  useEffect(() => {
    let canceled = false;
    fetch('/api/days')
      .then((r) => r.json())
      .then((data) => { if (!canceled) setDays(data); })
      .catch(() => { if (!canceled) setDays([]); });
    return () => { canceled = true; };
  }, []);

  return (
    <main className="min-h-screen p-6 bg-white text-gray-900">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Library</h1>
        <p className="text-sm text-gray-600 mb-4">A fixed 365-day path. Only one day may be completed per calendar day.</p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {days.map((d) => {
            const unlocked = d.day <= unlockedDay;
            return (
              <li key={d.day} className={`p-3 rounded-lg calm-card ${unlocked ? 'border-emerald-50' : 'border-gray-50'} text-center`}> 
                <div className="flex items-center justify-center h-20 mb-3">
                  <img src={d.image} alt="" className="h-full object-contain" />
                </div>
                <div className="font-medium">Day {d.day}: {d.title}</div>
                <div className="text-xs text-gray-600 mt-1">{d.summary}</div>
                <div className="mt-3">
                  {unlocked ? (
                    <Link href={`/library/${d.day}`} className="inline-block px-3 py-1 rounded bg-emerald-600 text-white text-xs">Open</Link>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded bg-gray-200 text-gray-600 text-xs">Locked</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
