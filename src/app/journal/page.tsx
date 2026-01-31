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
          <h1 className="text-2xl font-semibold text-center flex-1">Journal</h1>
          <Button href="/" variant="secondary" className="px-4 py-2 text-sm">Back</Button>
        </div>
        {entries.length === 0 ? (
          <p className="text-gray-600">No entries yet. Your reflections appear here after you complete a day.</p>
        ) : (
          <ul className="space-y-3 list-none">
            {entries.map((e) => (
              <li
                key={e.date}
                className={`rounded-2xl p-4 bg-gradient-to-br ${cardStyles[e.day % cardStyles.length]} shadow-sm`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-gray-700 font-semibold">Day {e.day}</div>
                    <div className="text-xs text-gray-600">{e.date}</div>
                    <div className="mt-2 text-gray-800">{e.text.slice(0, 120)}{e.text.length > 120 ? '…' : ''}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => setSelected(selected === e.date ? null : e.date)}
                      className="text-xs px-3 py-1 rounded-full bg-white text-[#1F3B80] border border-[#DDE7FF]"
                    >
                      {selected === e.date ? "Close" : "View"}
                    </button>
                  </div>
                </div>
                {selected === e.date && (
                  <div className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">{e.text}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
