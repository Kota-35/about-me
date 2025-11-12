"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Project } from "@/app/__components/WorkSection/seed";
import { MagneticButton } from "@/components/MagneticButton";
import { Tag } from "@/components/tags";

interface WorkDetailPageProps {
  project: Project;
}

export function WorkDetailPage({ project }: WorkDetailPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-12 md:py-20 lg:px-16">
        {/* ヘッダー */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 font-mono text-sm text-foreground/60 transition-colors hover:text-foreground md:text-base"
          >
            ← Back
          </button>
          <div className="mb-4">
            <span className="font-mono text-sm text-foreground/60 md:text-base">
              {project.number} / {project.category}
            </span>
          </div>
          <h1 className="mb-4 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-foreground/90 md:text-xl">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {project.repository && (
              <MagneticButton
                size="default"
                variant="primary"
                onClick={() =>
                  window.open(
                    `https://github.com/Kota-35/${project.repository}`,
                    "_blank",
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/github-icon.svg"
                    alt="GitHub"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                  <span>View on GitHub</span>
                </div>
              </MagneticButton>
            )}
            <span className="font-mono text-sm text-foreground/60">
              {project.year}
            </span>
          </div>
        </div>

        {/* 設計思想 */}
        {project.designPhilosophy && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              Design Philosophy
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-foreground/90 md:text-lg">
                {project.designPhilosophy}
              </p>
            </div>
          </section>
        )}

        {/* 技術スタック */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <Tag key={tech} name={tech} size="md" />
              ))}
            </div>
          </section>
        )}

        {/* 主な機能 */}
        {project.features && project.features.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              Key Features
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="relative pl-6 text-foreground/90 before:absolute before:left-0 before:content-['•'] md:text-lg"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
