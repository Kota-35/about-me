"use client";

import clsx from "clsx";
import { useCustomCursor } from "./_.hook.ts";

export const CustomCursor = () => {
  const { outerRef, innerRef } = useCustomCursor();

  return (
    <>
      <div
        ref={outerRef}
        className={clsx(
          "pointer-events-none",
          "fixed",
          "left-0",
          "top-0",
          "z-50",
          "mix-blend-difference",
          "will-change-transform",
        )}
        style={{ contain: "layout style paint" }}
      >
        <div
          className={clsx(
            "h-4",
            "w-4",
            "rounded-full",
            "border-2",
            "border-white",
          )}
        />
      </div>
      <div
        ref={innerRef}
        className={clsx(
          "pointer-events-none",
          "fixed",
          "left-0",
          "top-0",
          "z-50",
          "mix-blend-difference",
          "will-change-transform",
        )}
        style={{ contain: "layout style paint" }}
      >
        <div className={clsx("h-2", "w-2", "rounded-full", "bg-white")} />
      </div>
    </>
  );
};
