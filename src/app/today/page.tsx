"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProgress, canDoToday, completeToday, getSingaporeDate } from "../../lib/progress";
import { saveJournalEntry, getJournalEntry } from "../../lib/journal";
import Button from "../../components/Button";

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

type Step = 0 | 1 | 2;

export default function TodayPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(() => getProgress());
  const [locked, setLocked] = useState(() => !canDoToday());
  const [step, setStep] = useState<Step>(0);
  const [text, setText] = useState("");
  const [buddhaText, setBuddhaText] = useState("");
  const [content, setContent] = useState<DayContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [aiQuestions, setAiQuestions] = useState<string[]>([]);
  const todayDate = getSingaporeDate();
  const day = progress.currentDay;

  useEffect(() => {
    const entry = getJournalEntry(todayDate);
    if (entry) setText(entry.text);
  }, [todayDate]);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/days/${day}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load today's teaching.");
        setLoading(false);
      });
  }, [day]);

  const handleSave = () => {
    saveJournalEntry({ date: todayDate, day: progress.currentDay, text });
    const updated = completeToday();
    setProgress(updated);
    setLocked(true);
    router.push("/");
  };

  const handleAiHelp = async () => {
    if (!content) return;
    if (!buddhaText.trim()) {
      setAiError("Write a question for Buddha first.");
      return;
    }
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reflection: buddhaText,
          teachingTitle: content.title,
          teachingSummary: content.summary,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed");
      }
      const data = await res.json();
      setAiSummary(data.summary || "");
      setAiQuestions(Array.isArray(data.questions) ? data.questions : []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not generate reflection help.";
      setAiError(msg);
    } finally {
      setAiLoading(false);
    }
  };

  const goNext = () => setStep((prev) => (prev < 2 ? ((prev + 1) as Step) : prev));
  const goPrev = () => setStep((prev) => (prev > 0 ? ((prev - 1) as Step) : prev));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-white to-[#F6F8FF] text-[#2B2B2B]">
      <div className="mx-auto w-full max-w-md px-5 pb-16 pt-8">
        <header className="mb-6 text-center">
          <div className="mb-3 flex items-center justify-between">
            <Button href="/" variant="secondary" className="px-3 py-2 text-sm">Back</Button>
            <div className="text-xs text-gray-400"> </div>
          </div>
          <div className="mx-auto inline-flex items-center rounded-full border border-[#F3D8B8] bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.28em] text-[#C15D00]">
            DAY {day} OF 365
          </div>
          <h1 className="mt-3 text-2xl font-semibold">Daily Flow</h1>
          <p className="mt-1 text-xs text-gray-500">{todayDate}</p>
        </header>

        {locked && (
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium">You’re done for today</h2>
            <p className="mt-2 text-sm text-gray-600">Come back tomorrow for a new teaching.</p>
            <div className="mt-4 flex gap-3">
              <Button href="/" variant="secondary" className="px-4 py-2 text-base">Back home</Button>
              <Button href="/journal" className="px-4 py-2 text-base">Open journal</Button>
            </div>
          </section>
        )}

        {!locked && (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-gray-400 py-10">Loading…</div>
            ) : error ? (
              <div className="text-center text-red-500 py-10">{error}</div>
            ) : content && (
              <>
                <div className="flex items-center justify-center">
                  <div className="grid w-full grid-cols-3 rounded-full bg-white p-1 shadow-[0_12px_30px_rgba(193,93,0,0.12)]">
                    <button
                      onClick={() => setStep(0)}
                      aria-pressed={step === 0}
                      className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
                        step === 0 ? "bg-[#C15D00] text-white" : "text-[#4B5563]"
                      }`}
                    >
                      <span aria-hidden>📖</span>
                      Teach
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      aria-pressed={step === 1}
                      className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
                        step === 1 ? "bg-[#C15D00] text-white" : "text-[#4B5563]"
                      }`}
                    >
                      <span aria-hidden>🪷</span>
                      Ask
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      aria-pressed={step === 2}
                      className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
                        step === 2 ? "bg-[#C15D00] text-white" : "text-[#4B5563]"
                      }`}
                    >
                      <span aria-hidden>✍️</span>
                      Reflect
                    </button>
                  </div>
                </div>

                {step === 0 && (
                  <section className="rounded-3xl border border-[#F3D8B8] bg-white p-6 shadow-[0_20px_60px_rgba(193,93,0,0.10)]">
                    <div className="text-xs uppercase tracking-[0.2em] text-[#C15D00]">Step 1 · Teaching</div>
                    <h2 className="mt-2 text-xl font-semibold">{content.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-[#4A4A4A]">{content.summary}</p>
                    {content.source && (
                      <p className="mt-2 text-xs text-[#7A6D62]">Source: {content.source}</p>
                    )}
                    <div className="mt-4 rounded-2xl border border-[#F3D8B8] bg-[#FFF3E0] p-4 text-sm text-[#4A4A4A]">
                      {content.practice}
                    </div>
                  </section>
                )}

                {step === 1 && (
                  <section className="rounded-3xl border border-[#F3D8B8] bg-white p-6 shadow-sm">
                    <div className="text-xs uppercase tracking-[0.2em] text-[#C15D00]">Step 2 · Ask</div>
                    <h3 className="mt-2 text-lg font-medium">What guidance do you need right now?</h3>
                    <div className="mt-4 rounded-2xl border border-[#F3D8B8] bg-[#FFF9F1] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-[#C15D00]">Your question</div>
                          <div className="mt-1 text-sm text-[#7A4B1A]">Be short and honest.</div>
                        </div>
                        <span className="text-2xl" aria-hidden>🪷</span>
                      </div>
                      <textarea
                        className="mt-3 h-36 w-full resize-none rounded-2xl border border-[#F1CDA5] bg-white p-3 text-base leading-6 focus:outline-none focus:ring-2 focus:ring-[#F1CDA5]"
                        value={buddhaText}
                        onChange={(e) => setBuddhaText(e.target.value)}
                        placeholder="Ask for clarity, courage, or patience…"
                      />
                      <div className="mt-3">
                        <Button
                          onClick={handleAiHelp}
                          variant="secondary"
                          className="w-full px-4 py-3 text-base"
                        >
                          {aiLoading ? "Thinking…" : "Send to Buddha"}
                        </Button>
                        {aiError && <div className="mt-2 text-xs text-red-500">{aiError}</div>}
                        {!aiError && (aiSummary || aiQuestions.length > 0) && (
                          <div className="mt-3 rounded-2xl border border-[#F1CDA5] bg-white p-4 text-base text-[#4A4A4A]">
                            {aiSummary && <div className="font-semibold">{aiSummary}</div>}
                            {aiQuestions.length > 0 && (
                              <ul className="mt-3 list-disc pl-5 text-sm text-[#4A4A4A]">
                                {aiQuestions.map((q, i) => (
                                  <li key={i}>{q}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="rounded-3xl border border-[#F3D8B8] bg-white p-6 shadow-sm">
                    <div className="text-xs uppercase tracking-[0.2em] text-[#C15D00]">Step 3 · Reflect</div>
                    <h3 className="mt-2 text-lg font-medium">{content.prompt}</h3>
                    <div className="mt-5 rounded-2xl border border-[#F3D8B8] bg-[#FFF9F1] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-[#C15D00]">Notes</div>
                          <div className="mt-1 text-sm text-[#7A4B1A]">Write freely and save.</div>
                        </div>
                        <span className="text-2xl" aria-hidden>📝</span>
                      </div>
                      <textarea
                        className="mt-3 h-64 w-full resize-none rounded-2xl border border-[#F1CDA5] bg-white p-3 text-base leading-6 focus:outline-none focus:ring-2 focus:ring-[#F1CDA5]"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your reflection…"
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-2">
                      <Button onClick={handleSave} className="px-4 py-3 text-base">Save</Button>
                      <Button href="/journal" variant="secondary" className="px-4 py-3 text-base">Journal</Button>
                    </div>
                  </section>
                )}
              </>
            )}

            {!loading && !error && (
              <nav className="flex items-center justify-between">
                {step > 0 ? (
                  <Button onClick={goPrev} variant="secondary" className="px-4 py-2 text-base">Back</Button>
                ) : (
                  <div />
                )}
                <div className="text-sm text-[#7C88B0]">Step {step + 1} of 3</div>
                {step < 2 ? (
                  <Button onClick={goNext} className="px-4 py-2 text-base">Next</Button>
                ) : (
                  <div />
                )}
              </nav>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

