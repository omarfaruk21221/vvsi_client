"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({ href, children, ...props }) {
  const pathname = usePathname();
  const isActive =
    href === href ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-primary text-primary-content shadow-lg font-bold"
          : "hover:bg-primary/10 text-base-content opacity-80"
      }`}
      {...props}
    >
      {children}
    </Link>
  );
}
