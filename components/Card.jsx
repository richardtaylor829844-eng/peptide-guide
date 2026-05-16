// Server-safe Card component. Hover behavior comes from globals.css.
import Link from "next/link";

export function Card({ children, style, href, className = "" }) {
  const isClickable = !!href;
  const combinedClass = `pg-card ${isClickable ? "clickable" : ""} ${className}`.trim();
  if (isClickable) {
    return (
      <Link href={href} className={combinedClass} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <div className={combinedClass} style={style}>
      {children}
    </div>
  );
}
