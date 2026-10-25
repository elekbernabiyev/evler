"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [{ href: "/", label: "Ana səhifə" }, { href: "/satis", label: "Satış" }, { href: "/kiraye", label: "Kirayə" }];

export default function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-800/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-lg">🏠</span>Evler
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`rounded-md px-3 py-2 transition ${path === l.href ? "bg-white/15 text-white" : "text-slate-300 hover:text-white"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/elan-ver" className="btn whitespace-nowrap">+ Elan ver</Link>
      </div>
    </header>
  );
}
