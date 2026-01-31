"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";


type Props = { params: { day: string } };
type DayContent = {
  day: number;
  title: string;
  summary: string;
  source?: string;
  teaching: string;
  prompt: string;
  practice: string;
  image?: string;
};


export default function DayPage({ params }: Props) {
  const dayNum = Math.min(Math.max(1, Number(params.day || 1)), 365);
  const [content, setContent] = useState<DayContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/days/${dayNum}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load day content.");
        setLoading(false);
      });
  }, [dayNum]);

  return (
    <main className="min-h-screen p-6 bg-white text-gray-900">
      <div className="max-w-xl mx-auto">
        <Link href="/library" className="text-sm text-gray-500 mb-4 inline-block">← Back to Library</Link>
        {loading ? (
          <div className="text-center text-gray-400 py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : content && (
          <>
            <h1 className="text-2xl font-semibold mb-2">Day {content.day}</h1>
            <p className="text-sm text-gray-600 mb-4">{content.title}</p>

            <section className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h2 className="font-medium mb-2">Teaching</h2>
              <div className="text-gray-700">{content.summary}</div>
              {content.source && (
                <div className="text-xs text-gray-500 mt-2">Source: {content.source}</div>
              )}
            </section>

            <section className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h2 className="font-medium mb-2">Prompt</h2>
              <div className="text-gray-700">{content.prompt}</div>
            </section>

            <section className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="font-medium mb-2">Practice</h2>
              <div className="text-gray-700">{content.practice}</div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
