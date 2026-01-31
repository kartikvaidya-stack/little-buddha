"use client";

import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    // do not register service worker in development — it interferes with HMR and
    // causes confusing cached/404 responses while actively developing.
    if (process.env.NODE_ENV !== "production") {
      if (typeof window === "undefined") return;
      if (!("serviceWorker" in navigator)) return;
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
      return;
    }
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        // silently ignore; keep privacy-first approach
        console.log("SW registered:", reg.scope);
      } catch (err) {
        console.warn("SW registration failed:", err);
      }
    };

    // register when page becomes visible to avoid background work on load
    if (document.visibilityState === "visible") register();
    else {
      const onVisible = () => {
        register();
        document.removeEventListener("visibilitychange", onVisible);
      };
      document.addEventListener("visibilitychange", onVisible);
    }
  }, []);

  return null;
}
