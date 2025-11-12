"use client";

import clsx from "clsx";

interface NavigationProps {
  currentSection: number;
  scrollToSection: (index: number) => void;
  isLoaded: boolean;
}

export const Navigation = ({
  currentSection,
  scrollToSection,
  isLoaded,
}: NavigationProps) => {
  const navItems = ["Home", "About", "Work", "Contact"];

  return (
    <nav
      className={clsx(
        "fixed left-0 right-0 top-0 z-50 flex items-center justify-center px-6 py-6 transition-opacity duration-700 md:px-12",
        isLoaded ? "opacity-100" : "opacity-0",
        "select-none",
      )}
    >
      <button
        type="button"
        onClick={() => scrollToSection(0)}
        className="absolute left-6 flex items-center gap-2 transition-transform hover:scale-105 md:left-12"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
          <span className="font-sans text-xl font-bold text-foreground">K</span>
        </div>
        <span className="font-sans text-xl font-semibold tracking-tight text-foreground">
          Kota
        </span>
      </button>

      <div className="hidden items-center gap-8 md:flex">
        {navItems.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => scrollToSection(index)}
            className={clsx(
              "group relative font-sans text-sm font-medium transition-colors",
              currentSection === index
                ? "text-foreground"
                : "text-foreground/80 hover:text-foreground",
            )}
          >
            {item}
            <span
              className={clsx(
                "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300",
                currentSection === index ? "w-full" : "w-0 group-hover:w-full",
              )}
            />
          </button>
        ))}
      </div>

      {/* <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
        Get Started
      </MagneticButton> */}
    </nav>
  );
};
