"use client";

import { useEffect, useState } from "react";

const AUDIO_KEY = "little-buddha-audio-enabled";

export default function AudioToggle() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUDIO_KEY) === "1";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(AUDIO_KEY, enabled ? "1" : "0");

    // try to play a background audio if present
    const audioEl = document.getElementById("ambient-audio") as HTMLAudioElement | null;
    if (!audioEl) return;
    if (enabled) {
      audioEl.play().catch(() => {});
    } else {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
  }, [enabled]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-700">Ambient audio</label>
      <button
        aria-pressed={enabled}
        onClick={() => setEnabled((v) => !v)}
        className={`px-3 py-1 rounded-full text-sm ${enabled ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800"}`}
      >
        {enabled ? "On" : "Off"}
      </button>

      {/* only mount the audio element when the user enables audio to avoid
          automatic fetches (prevents noisy 404s during development) */}
      {enabled ? (
        <audio id="ambient-audio" loop src="/ambient.mp3" preload="none" />
      ) : null}
    </div>
  );
}
