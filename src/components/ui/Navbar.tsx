"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={`text-sm font-medium ${
          pathname === "/" ? "" : "text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Overview
      </Link>
      <Link
        href="/users"
        className={`text-sm font-medium ${
          pathname === "/users" ? "" : "text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Users
      </Link>
    </nav>
  );
}
