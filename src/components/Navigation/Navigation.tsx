"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./Navigation.css";

const Navigation = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Всі замовлення" },
    { href: "/timeline", label: "Тайм-лайн (тиждень)" },
    { href: "/extended-timeline", label: "Тайм-лайн (2 тижні)" },
  ];

  return (
    <nav className="navigation">
      <div className="navigation-container">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navigation-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
