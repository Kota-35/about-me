"use client";

import clsx from "clsx";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ShaderContainer } from "@/components/ShaderContainer";
import { ScrollContainer } from "./__components/ScrollContainer";

const Home = () => {
  return (
    <main
      className={clsx(
        "relative",
        "h-screen",
        "w-full",
        "overflow-hidden",
        "bg-background",
      )}
    >
      <CustomCursor />
      <GrainOverlay />
      <ShaderContainer />
      <ScrollContainer>
        {/* スクロール可能なコンテンツをここに追加 */}
      </ScrollContainer>
    </main>
  );
};

export default Home;
