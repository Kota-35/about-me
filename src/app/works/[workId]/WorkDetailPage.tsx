"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Project } from "@/app/__components/WorkSection/seed";
import { MagneticButton } from "@/components/MagneticButton";
import { Tag } from "@/components/tags";

interface WorkDetailPageProps {
  project: Project;
}

export const WorkDetailPage = ({ project }: WorkDetailPageProps) => {
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

        {/* プロジェクト概要 */}
        {project.overview && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              プロジェクト概要
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-foreground/90 md:text-lg">
                {project.overview}
              </p>
            </div>
          </section>
        )}

        {/* 設計思想 */}
        {project.designPhilosophy && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              開発の考え方
            </h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-foreground/90 md:text-lg">
                {project.designPhilosophy}
              </p>
            </div>
          </section>
        )}

        {/* 技術スタック */}
        {project.technologies &&
          Object.keys(project.technologies).length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
                技術スタック
              </h2>
              <div className="space-y-6">
                {Object.entries(project.technologies).map(
                  ([category, techs]) => (
                    <div key={category}>
                      <h3 className="mb-3 font-sans text-lg font-light text-foreground/80 md:text-xl">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {techs.map((tech) => (
                          <Tag
                            key={tech.displayName}
                            displayName={tech.displayName}
                            iconKey={tech.iconKey}
                            size="md"
                          />
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          )}

        {/* 主な機能 */}
        {project.features && project.features.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              主な機能
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

        {/* システムアーキテクチャ */}
        {project.architecture && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              システムアーキテクチャ
            </h2>
            <div className="rounded-lg bg-foreground/5 p-6 font-mono text-sm leading-relaxed text-foreground/90 md:text-base">
              <pre className="whitespace-pre-wrap">{project.architecture}</pre>
            </div>
          </section>
        )}

        {/* 実装のポイント */}
        {project.implementationPoints &&
          project.implementationPoints.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
                実装のポイント
              </h2>
              <ul className="space-y-3">
                {project.implementationPoints.map((point) => (
                  <li
                    key={point}
                    className="relative pl-6 text-foreground/90 before:absolute before:left-0 before:content-['•'] md:text-lg"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          )}

        {/* コードの特徴 */}
        {project.codeFeatures && project.codeFeatures.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              コードの特徴
            </h2>
            <ul className="space-y-3">
              {project.codeFeatures.map((feature) => (
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

        {/* 今後の改善案 */}
        {project.futureImprovements &&
          project.futureImprovements.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
                今後の改善案
              </h2>
              <ul className="space-y-3">
                {project.futureImprovements.map((improvement) => (
                  <li
                    key={improvement}
                    className="relative pl-6 text-foreground/90 before:absolute before:left-0 before:content-['•'] md:text-lg"
                  >
                    {improvement}
                  </li>
                ))}
              </ul>
            </section>
          )}

        {/* 学んだこと */}
        {project.learnings && project.learnings.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-sans text-2xl font-light text-foreground md:text-3xl">
              学んだこと
            </h2>
            <ul className="space-y-3">
              {project.learnings.map((learning) => (
                <li
                  key={learning}
                  className="relative pl-6 text-foreground/90 before:absolute before:left-0 before:content-['•'] md:text-lg"
                >
                  {learning}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
