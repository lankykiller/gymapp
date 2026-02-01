"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
  `font-bold text-2xl pb-1 ${
    pathname === href
      ? "border-b-4 border-current"
      : "border-b-4 border-transparent hover:border-current"
  }`;

  return (
    <nav className="flex justify-center items-center gap-14 p-2 dark:bg-black text-lg">
      <Link href="/" className={linkClass("/")}>
        Training
      </Link>
      <Link href="/stats" className={linkClass("/stats")}>
        Stats
      </Link>
      <Link href="/settings" className={linkClass("/settings")}>
        Settings
      </Link>
    </nav>
  );
}
