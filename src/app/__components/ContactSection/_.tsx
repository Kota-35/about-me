"use client";

import clsx from "clsx";

interface ContactSectionProps {
  scrollToSection?: ((index: number) => void) | null;
  currentSection?: number;
}

export const ContactSection = ({
  scrollToSection: _scrollToSection,
  currentSection = 0,
}: ContactSectionProps) => {
  // 横スクロールコンテナでは、currentSectionが3（Contact）の時にアニメーションを表示
  const isVisible = currentSection === 3;

  return (
    <section className="flex h-screen w-screen shrink-0 snap-center items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16 select-none">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={clsx(
            "mb-12 transition-all duration-700 md:mb-16",
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-12 opacity-100",
          )}
        >
          <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
            Contact
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-base">
            / Get in touch
          </p>
        </div>

        <div
          className={clsx(
            "space-y-6 transition-all duration-700 md:space-y-8",
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-16 opacity-100",
          )}
          style={{ transitionDelay: "200ms" }}
        >
          <a
            href="mailto:ishikuro6.2@gmail.com"
            className="group block transition-colors"
          >
            <div className="mb-1">
              <span className="font-mono text-xs text-foreground/60 md:text-sm">
                Email
              </span>
            </div>
            <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
              ishikuro6.2@gmail.com
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};
