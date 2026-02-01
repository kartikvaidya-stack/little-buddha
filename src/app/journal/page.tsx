"use client";

import React, { useState } from "react";
import Button from "../../components/Button";
import { listJournalEntries } from "../../lib/journal";

export default function JournalPage() {
  const [entries] = useState(() => listJournalEntries());
  const [selected, setSelected] = useState<string | null>(null);
  const cardStyles = [
    "from-[#DCEBFF] to-[#D8F4EE]",
    "from-[#E1F0FF] to-[#D3F5EE]",
    "from-[#D6E9FF] to-[#CFF2EB]",
    "from-[#CFE3FF] to-[#C7EFE6]",
  ];

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-[#E9F2FF] via-white to-[#E7F7F2] text-gray-900">
      <div className="max-w-xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="w-16" />
          <h1 className="font-display text-3xl font-semibold text-center flex-1">Journal</h1>
          <Button href="/" variant="secondary" className="px-4 py-2 text-base">Back</Button>
        </div>
        {entries.length === 0 ? (
          <p className="text-gray-600">No entries yet. Your reflections appear here after you complete a day.</p>
        ) : (
          <ul className="space-y-3 list-none">
            {entries.map((e) => (
              <li
                key={e.date}
                className={`rounded-[22px] p-4 bg-gradient-to-br ${cardStyles[e.day % cardStyles.length]} shadow-sm`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base text-gray-800 font-semibold">{e.title || e.teachingTitle || `Day ${e.day}`}</div>
                    <div className="text-sm text-gray-600">Day {e.day} · {e.date}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => setSelected(selected === e.date ? null : e.date)}
                      className="text-lg px-6 py-4 rounded-full bg-white text-[#1F3B80] border border-[#DDE7FF]"
                    >
                      {selected === e.date ? "Close" : "View"}
                    </button>
                  </div>
                </div>
                {selected === e.date && (
                  <div className="mt-3 text-base text-gray-700 whitespace-pre-wrap">
                    <div className="mt-1">{e.text}</div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
