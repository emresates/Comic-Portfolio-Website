"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type SiteNavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

type SiteNavProps = {
  langButton: string;
  onToggleLang: () => void;
  brandHref?: string;
  items?: SiteNavItem[];
  sound?: {
    muted: boolean;
    onToggle: () => void;
    onLabel: string;
    offLabel: string;
  };
};

export function SiteNav({
  langButton,
  onToggleLang,
  brandHref = "/",
  items = [],
  sound,
}: SiteNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  const renderItem = (item: SiteNavItem) => {
    const className = `nav-link${item.isActive ? " is-active" : ""}`;
    if (item.href.startsWith("/")) {
      return (
        <Link
          key={item.href + item.label}
          href={item.href}
          className={className}
          onClick={close}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <a
        key={item.href + item.label}
        href={item.href}
        className={className}
        aria-current={item.isActive ? "location" : undefined}
        onClick={close}
      >
        {item.label}
      </a>
    );
  };

  return (
    <nav className="site-nav" aria-label="Main">
      <Link href={brandHref} className="site-nav__brand font-bangers">
        EMRE!
      </Link>

      <div className="site-nav__actions">
        {sound && (
          <button
            type="button"
            className={`sfx-btn${sound.muted ? " is-muted" : ""}`}
            onClick={sound.onToggle}
            aria-pressed={sound.muted}
            title={sound.muted ? sound.offLabel : sound.onLabel}
          >
            <span aria-hidden>{sound.muted ? "🔇" : "🔊"}</span>
            <span className="sfx-btn__label">
              {sound.muted ? sound.offLabel : sound.onLabel}
            </span>
          </button>
        )}
        <button type="button" className="lang-btn" onClick={onToggleLang}>
          {langButton}
        </button>
        {items.length > 0 && (
          <button
            type="button"
            className={`nav-burger${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="site-nav-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="site-nav__desktop">{items.map(renderItem)}</div>
          <div
            className={`site-nav__scrim${open ? " is-open" : ""}`}
            onClick={close}
            aria-hidden={!open}
          />
          <div
            id="site-nav-drawer"
            className={`site-nav__drawer${open ? " is-open" : ""}`}
            aria-hidden={!open}
          >
            <p className="font-luckiest site-nav__drawer-title">MENU</p>
            {items.map(renderItem)}
          </div>
        </>
      )}
    </nav>
  );
}
