"use client";

import { useScrollContainer } from "./_.hook";

interface ScrollContainerProps {
  children?: React.ReactNode;
}

export const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const { scrollContainerRef } = useScrollContainer();

  return (
    <div
      ref={scrollContainerRef}
      className="h-full w-full overflow-x-auto overflow-y-hidden"
    >
      {children}
    </div>
  );
};
