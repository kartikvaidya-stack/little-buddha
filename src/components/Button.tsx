"use client";

import Link from "next/link";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
};

export default function Button({ variant = "primary", href, className = "", children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 no-underline min-h-[56px] px-5 text-lg";
  const variants: Record<string, string> = {
    primary: "bg-[#E46A00] text-white shadow-[0_10px_24px_rgba(228,106,0,0.25)] hover:bg-[#F07A12] focus:ring-[#FFD7B5]",
    secondary: "bg-white text-[#8A3C00] border border-[#FFD7B5] shadow-sm hover:bg-[#FFF3E6] focus:ring-[#FFD7B5]",
    ghost: "bg-transparent text-[#8A3C00] hover:underline",
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
