"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "../ContactForm";
import { siteConfig } from "@/config/site";
import { contactBtnBase } from "./shared";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";

export function ContactSection() {
  const tContact = useTranslations("contact");

  return (
    <section
      id="iletisim"
      className="border-t-[6px] border-ink bg-halftone-yellow bg-comic-red px-4 py-[90px] pb-[100px] text-center"
    >
      <div className="mx-auto max-w-[640px]">
        <div className="mb-5 inline-block -rotate-[3deg] animate-wiggle-slow rounded-[14px] border-4 border-ink bg-comic-yellow px-6 py-2.5 font-stamp text-[30px] text-comic-red shadow-[5px_5px_0_#1a1a2e]">
          {tContact("bang")}
        </div>
        <h2 className="mb-4 font-display text-[clamp(42px,7vw,72px)] tracking-[3px] text-white text-stroke-ink [text-shadow:5px_5px_0_#1a1a2e]">
          {tContact("title")}
        </h2>
        <p className="mb-8 text-lg font-bold text-white">{tContact("text")}</p>
        <ContactForm
          labels={{
            name: tContact("form.name"),
            email: tContact("form.email"),
            message: tContact("form.message"),
            send: tContact("form.send"),
            sending: tContact("form.sending"),
            success: tContact("form.success"),
            error: tContact("form.error"),
            namePh: tContact("form.namePh"),
            emailPh: tContact("form.emailPh"),
            messagePh: tContact("form.messagePh"),
          }}
        />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className={`${contactBtnBase} bg-white text-comic-red hover:bg-comic-cream-hot hover:text-comic-red-dark`}
          >
            <FaEnvelope />
            <span>{tContact("emailBtn")}</span>
          </a>
          {siteConfig.social.github && (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contactBtnBase} bg-ink text-comic-yellow hover:bg-comic-red-dark hover:text-white`}
            >
              <FaGithub />
              <span>GITHUB</span>
            </a>
          )}
          {siteConfig.social.linkedin && (
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contactBtnBase} bg-comic-teal text-white hover:bg-comic-orange hover:text-ink`}
            >
              <FaLinkedin />
              <span>LINKEDIN</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
