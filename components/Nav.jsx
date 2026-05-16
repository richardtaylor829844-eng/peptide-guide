"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { S } from "@/lib/data";

const ITEMS = [
  { href: "/", label: "Home" },
  { href: "/peptides", label: "Peptides" },
  { href: "/my-stack", label: "Stack" },
  { href: "/calc", label: "Calc" },
  { href: "/ask", label: "Ask AI" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav
      className="pg-nav"
      style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(11,17,32,.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid " + S.br, padding: "8px 12px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 10, flexWrap: "wrap", minHeight: 56,
      }}
    >
      <Link
        href="/"
        className="pg-nav-title"
        style={{ cursor: "pointer", fontWeight: 700, fontSize: 17, userSelect: "none", color: S.t }}
      >
        <span style={{ color: S.a }}>Peptide</span> Reference Guide
      </Link>
      <div
        className="pg-nav-buttons"
        style={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "flex-end", flex: "1 1 260px", minWidth: 0 }}
      >
        {ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                background: active ? S.ab : "transparent",
                border: "1px solid " + (active ? S.abr : "transparent"),
                color: active ? S.a : S.t,
                padding: "6px 10px", borderRadius: 7,
                fontFamily: S.f, fontSize: 12, fontWeight: 500,
                transition: "all .15s", whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
