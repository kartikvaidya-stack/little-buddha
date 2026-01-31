"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/today", label: "Start" },
  { href: "/journal", label: "Journal" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-indigo-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 items-center justify-center rounded-full px-3 py-2 text-xs font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-emerald-600 to-indigo-500 text-white shadow-[0_10px_24px_rgba(79,70,229,0.25)]"
                  : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
