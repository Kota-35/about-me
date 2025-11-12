"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ShaderContainer } from "@/components/ShaderContainer";
import { useShaderContainer } from "@/components/ShaderContainer/_.hook";
import { AboutSection } from "./__components/AboutSection";
import { ContactSection } from "./__components/ContactSection";
import { HeroSection } from "./__components/HeroSection";
import { Navigation } from "./__components/Navigation";
import { ScrollContainer } from "./__components/ScrollContainer";
import { WorkSection } from "./__components/WorkSection";

const Home = () => {
  const { isLoaded } = useShaderContainer();
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollToSection, setScrollToSection] = useState<
    ((index: number) => void) | null
  >(null);

  const handleSectionChange = useCallback(
    (section: number, scrollFn: (index: number) => void) => {
      setCurrentSection(section);
      setScrollToSection(() => scrollFn);
    },
    [],
  );

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

      {scrollToSection && (
        <Navigation
          currentSection={currentSection}
          scrollToSection={scrollToSection}
          isLoaded={isLoaded}
        />
      )}

      <ScrollContainer onSectionChange={handleSectionChange}>
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection
          scrollToSection={scrollToSection}
          currentSection={currentSection}
        />
        <WorkSection
          scrollToSection={scrollToSection}
          currentSection={currentSection}
        />
        <ContactSection
          scrollToSection={scrollToSection}
          currentSection={currentSection}
        />
      </ScrollContainer>
    </main>
  );
};

export default Home;
