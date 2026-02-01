"use client";

import Link from "next/link";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
};

export default function Button({ variant = "primary", href, className = "", children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 no-underline min-h-[64px] px-6 text-xl";
  const variants: Record<string, string> = {
    primary: "bg-[#F5A24D] text-white shadow-[0_10px_24px_rgba(245,162,77,0.25)] hover:bg-[#F7B368] focus:ring-[#FFE2C2]",
    secondary: "bg-white text-[#A45400] border border-[#FFE2C2] shadow-sm hover:bg-[#FFF6EC] focus:ring-[#FFE2C2]",
    ghost: "bg-transparent text-[#A45400] hover:underline",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
