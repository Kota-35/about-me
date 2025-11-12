"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import { Tag } from "@/components/tags";

interface HeroSectionProps {
  scrollToSection?: ((index: number) => void) | null;
}

export const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section className="relative flex min-h-screen w-screen shrink-0 snap-center flex-col justify-end px-6 pb-16 pt-24 select-none md:px-12 md:pb-24">
      <div className="max-w-3xl">
        <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
          <span className="text-balance">Kota Ishikuro</span>
        </h1>

        <p className="mb-4 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-2xl font-light leading-relaxed text-foreground duration-1000 delay-200 md:text-3xl">
          <span className="text-pretty">
            「分からない」を「できる」に変える。
          </span>
        </p>

        <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-300 md:text-xl">
          <span className="text-pretty">
            Transforming business challenges into technical solutions,
            accelerating team growth as an engineer.
          </span>
        </p>

        <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
          <p className="font-mono text-xs text-foreground/90">
            Backend・Frontend Engineer, Data Infrastructure, Data Analysis
          </p>
        </div>

        <div className="mb-8 flex animate-in fade-in slide-in-from-bottom-4 flex-wrap gap-2 duration-1000 delay-400">
          <Tag name="Python" />
          <Tag name="TypeScript" />
          <Tag name="Rust" />
        </div>

        <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
          <MagneticButton
            size="lg"
            variant="primary"
            onClick={() => window.open("https://github.com/Kota-35", "_blank")}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/github-icon.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span>GitHub</span>
            </div>
          </MagneticButton>
          {scrollToSection && (
            <MagneticButton
              size="lg"
              variant="secondary"
              onClick={() => scrollToSection(3)}
            >
              View My Work
            </MagneticButton>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
        <div className="flex items-center gap-2">
          <p className="font-mono text-xs text-foreground/80">
            Scroll to explore
          </p>
          <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
            <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
          </div>
        </div>
      </div>
    </section>
  );
};
