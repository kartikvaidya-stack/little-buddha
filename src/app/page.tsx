import Button from "../components/Button";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-white to-[#F6F8FF] text-[#2B2B2B]">
      <div className="relative mx-auto flex min-h-screen max-w-sm flex-col px-5 pb-20 pt-8">
        <div className="pointer-events-none absolute -top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#FFE6C7] blur-3xl" />
        <div className="pointer-events-none absolute bottom-16 right-4 h-40 w-40 rounded-full bg-[#DCE8FF] blur-3xl" />
        <header className="text-center">
          <div className="mx-auto inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-[14px] font-bold tracking-[0.28em] text-[#C15D00] shadow-sm">
            DAILY RITUAL
          </div>
          <div className="mt-1 text-[10px] italic tracking-[0.2em] text-[#C89A6B]">Powered by AI</div>
          <h1 className="mt-3 text-[32px] font-semibold leading-tight">Little Buddha</h1>
          <p className="mt-1 text-sm text-[#6A6A6A]">A 3‑minute daily teaching</p>
        </header>

        <section className="mt-6 rounded-[28px] bg-white p-5 shadow-[0_24px_70px_rgba(193,93,0,0.16)]">
          <div className="flex flex-col items-center">
            <img
              src="/images/buddha.jpg"
              alt="Little Buddha illustration"
              className="w-full max-w-[320px] aspect-[4/3] object-cover object-top ring-4 ring-[#FFE6C7]"
            />
            <div className="mt-4 text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-[#C15D00]">Today</div>
              <div className="mt-1 text-lg font-semibold">A fresh teaching awaits</div>
              <div className="mt-1 text-xs text-[#7A6D62]">Read | Reflect | Save</div>
            </div>
          </div>
        </section>

        <div className="mt-4 flex w-full items-center justify-between">
          <Button href="/today" className="h-28 w-[46%] rounded-[28px] bg-white text-[#4A4A4A] border border-[#F1CDA5] shadow-sm">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="mt-1 flex items-center gap-2 text-2xl font-bold text-[#2B2B2B]">
                <span aria-hidden>📖</span>
                Today
              </div>
              <div className="mt-1 text-sm font-semibold text-[#7A6D62]">Read & reflect</div>
            </div>
          </Button>
          <Button href="/journal" className="h-28 w-[46%] rounded-[28px] bg-white text-[#4A4A4A] border border-[#F1CDA5] shadow-sm">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="mt-1 flex items-center gap-2 text-2xl font-bold text-[#2B2B2B]">
                <span aria-hidden>🗒️</span>
                Journal
              </div>
              <div className="mt-1 text-sm font-semibold text-[#7A6D62]">Your saved notes</div>
            </div>
          </Button>
        </div>

        <div className="mt-3 h-14 rounded-[22px] bg-white border border-[#F3D8B8] px-4 py-3">
          <div className="text-[11px] text-gray-500">Streak</div>
          <div className="text-sm font-semibold">Day 1</div>
        </div>

        <div className="mt-4 rounded-[22px] bg-[#FFF3E0] p-4 text-center text-sm text-[#C15D00]">
          New teaching unlocks each day.
        </div>
      </div>
    </main>
  );
}

