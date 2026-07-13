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

const navLinkBase =
  "font-display tracking-wide text-ink no-underline border-[3px] rounded-lg transition-[background,border-color,box-shadow,color,transform] duration-[120ms] hover:border-ink hover:bg-white hover:text-comic-red hover:shadow-[2px_2px_0_#1a1a2e]";

const navLinkDesktop = `${navLinkBase} text-lg px-3 py-1.5 border-transparent`;
const navLinkDesktopActive =
  "border-ink bg-comic-cream-hot text-comic-red shadow-[3px_3px_0_#1a1a2e] -rotate-1";

const navLinkDrawer =
  "font-display text-[22px] tracking-wide text-ink no-underline px-3.5 py-3 bg-white border-[3px] border-ink rounded-lg shadow-[3px_3px_0_#1a1a2e] text-left w-full block transition-[background,transform] duration-[120ms] hover:bg-comic-cream-hot";
const navLinkDrawerActive = "bg-comic-cream-hot -rotate-1";

const sfxBtnBase =
  "font-display text-base tracking-wide cursor-pointer border-[3px] border-ink rounded-lg px-3 py-1.5 shadow-[3px_3px_0_rgba(26,26,46,0.35)] transition-[background,color,transform,box-shadow] duration-[120ms] hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_rgba(26,26,46,0.35)] max-[860px]:min-w-11 max-[860px]:min-h-11 max-[860px]:px-2.5 max-[860px]:py-2 max-[860px]:text-lg";

const langBtn =
  "font-display text-lg tracking-wide cursor-pointer bg-ink text-comic-yellow border-[3px] border-ink rounded-lg px-3.5 py-1.5 shadow-[3px_3px_0_rgba(26,26,46,0.4)] transition-[background,color,transform,box-shadow] duration-[120ms] hover:bg-comic-red hover:text-white hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_rgba(26,26,46,0.4)] max-[860px]:min-h-11 max-[860px]:px-3 max-[860px]:py-2";

function navLinkClass(isActive: boolean, variant: "desktop" | "drawer") {
  if (variant === "drawer") {
    return `${navLinkDrawer}${isActive ? ` ${navLinkDrawerActive}` : ""}`;
  }
  return `${navLinkDesktop}${isActive ? ` ${navLinkDesktopActive}` : ""}`;
}

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

  const renderItem = (item: SiteNavItem, variant: "desktop" | "drawer") => {
    const className = navLinkClass(!!item.isActive, variant);
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
    <nav
      className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-comic-yellow px-4 py-3 border-b-4 border-ink shadow-[0_4px_0_rgba(26,26,46,0.25)] min-[861px]:flex-wrap min-[861px]:px-5"
      aria-label="Main"
    >
      <Link
        href={brandHref}
        className="order-1 shrink-0 font-display text-[26px] max-[420px]:text-[22px] tracking-[2px] bg-comic-red text-white! px-3 py-1 max-[420px]:px-2.5 border-[3px] border-ink rounded-lg -rotate-2 shadow-[3px_3px_0_#1a1a2e] no-underline hover:text-white!"
      >
        EMRE!
      </Link>

      {items.length > 0 && (
        <div className="order-2 mx-2 hidden min-[861px]:flex min-[861px]:flex-1 flex-wrap items-center justify-end gap-1.5">
          {items.map((item) => renderItem(item, "desktop"))}
        </div>
      )}

      <div className="order-3 ml-auto flex items-center gap-2 min-[861px]:ml-0">
        {sound && (
          <button
            type="button"
            className={`${sfxBtnBase} ${
              sound.muted
                ? "bg-ink text-comic-yellow"
                : "bg-white text-ink hover:bg-comic-yellow"
            }`}
            onClick={sound.onToggle}
            aria-pressed={sound.muted}
            title={sound.muted ? sound.offLabel : sound.onLabel}
          >
            <span aria-hidden>{sound.muted ? "🔇" : "🔊"}</span>
            <span className="ml-1 max-[860px]:hidden">
              {sound.muted ? sound.offLabel : sound.onLabel}
            </span>
          </button>
        )}
        <button type="button" className={langBtn} onClick={onToggleLang}>
          {langButton}
        </button>
        {items.length > 0 && (
          <button
            type="button"
            className="inline-flex max-[860px]:flex min-[861px]:hidden flex-col justify-center gap-[5px] w-11 h-11 p-2.5 cursor-pointer bg-white border-[3px] border-ink rounded-lg shadow-[3px_3px_0_rgba(26,26,46,0.35)]"
            aria-expanded={open}
            aria-controls="site-nav-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-[3px] w-full bg-ink rounded-sm transition-[transform,opacity] duration-200 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-full bg-ink rounded-sm transition-[transform,opacity] duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-full bg-ink rounded-sm transition-[transform,opacity] duration-200 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        )}
      </div>

      {items.length > 0 && (
        <>
          <div
            className={`fixed inset-0 top-0 z-60 bg-[rgba(26,26,46,0.55)] min-[861px]:hidden! ${
              open ? "block" : "hidden"
            }`}
            onClick={close}
            aria-hidden={!open}
          />
          <div
            id="site-nav-drawer"
            className={`fixed top-0 right-0 z-70 flex h-dvh w-[min(320px,88vw)] flex-col gap-2.5 overflow-y-auto bg-comic-yellow border-l-[5px] border-ink pt-[72px] px-[18px] pb-7 shadow-[-8px_0_0_rgba(26,26,46,0.25)] transition-transform duration-250 ease-out min-[861px]:hidden! ${
              open
                ? "translate-x-0 pointer-events-auto visible"
                : "translate-x-[105%] pointer-events-none invisible"
            }`}
            aria-hidden={!open}
          >
            <p className="font-stamp m-0 mb-2 text-[28px] text-comic-red -rotate-2">
              MENU
            </p>
            {items.map((item) => renderItem(item, "drawer"))}
          </div>
        </>
      )}
    </nav>
  );
}
