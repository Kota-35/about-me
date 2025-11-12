"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/MagneticButton";
import { PROJECTS } from "./seed";
import type { WorkSectionProps } from "./types";

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
  isVisible: boolean;
}

function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const router = useRouter();

  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left"
        ? "-translate-x-16 opacity-100"
        : "translate-x-16 opacity-100";
    }
    return "translate-x-0 opacity-100";
  };

  const handleRepositoryClick = () => {
    if (project.repository) {
      window.open(`https://github.com/Kota-35/${project.repository}`, "_blank");
    }
  };

  const handleViewDetails = () => {
    router.push(`/works/${project.workId}`);
  };

  return (
    <div
      className={clsx(
        "group flex flex-col gap-4 border-b border-foreground/10 py-6 transition-all duration-700 hover:border-foreground/20 md:py-8",
        getRevealClass(),
      )}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="font-mono text-sm text-foreground/70 transition-colors group-hover:text-foreground/90 md:text-base">
            {project.number}
          </span>
          <div>
            <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-foreground/70 md:text-sm">
              {project.category}
            </p>
          </div>
        </div>
        <span className="font-mono text-xs text-foreground/70 md:text-sm">
          {project.year}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <MagneticButton
          size="default"
          variant="primary"
          onClick={handleViewDetails}
          borderGlow="rainbow"
        >
          View details
        </MagneticButton>
        {project.repository && (
          <MagneticButton
            size="default"
            variant="secondary"
            onClick={handleRepositoryClick}
            borderGlow="silver"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/github-icon.svg"
                alt="GitHub"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span>GitHub</span>
            </div>
          </MagneticButton>
        )}
      </div>
    </div>
  );
}

export const WorkSection = ({
  scrollToSection: _scrollToSection,
  currentSection = 0,
}: WorkSectionProps) => {
  // 横スクロールコンテナでは、currentSectionが2（Work）の時にアニメーションを表示
  const isVisible = currentSection === 2;

  return (
    <section className="flex h-screen w-screen shrink-0 snap-center items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16 select-none">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={clsx(
            "mb-12 transition-all duration-700 md:mb-16",
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-12 opacity-100",
          )}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Featured
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / Recent explorations
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
