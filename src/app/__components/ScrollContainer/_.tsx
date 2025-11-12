"use client";

import { useEffect } from "react";
import { useScrollContainer } from "./_.hook";

interface ScrollContainerProps {
  children?: React.ReactNode;
  onSectionChange?: (
    currentSection: number,
    scrollToSection: (index: number) => void,
  ) => void;
}

export const ScrollContainer = ({
  children,
  onSectionChange,
}: ScrollContainerProps) => {
  const { scrollContainerRef, currentSection, scrollToSection } =
    useScrollContainer();

  useEffect(() => {
    if (onSectionChange) {
      onSectionChange(currentSection, scrollToSection);
    }
  }, [currentSection, scrollToSection, onSectionChange]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex h-full w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
    >
      {children}
    </div>
  );
};
