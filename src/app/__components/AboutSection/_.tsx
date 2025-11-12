"use client";

import clsx from "clsx";
import { useRef, useState } from "react";
import { Tag } from "@/components/tags";
import { ICON_KEYS, type IconKey } from "@/components/tags/constants";
import { EXPERIMENTS } from "./seed";

interface AboutSectionProps {
  scrollToSection?: ((index: number) => void) | null;
  currentSection?: number;
}

export const AboutSection = ({
  scrollToSection: _scrollToSection,
  currentSection = 0,
}: AboutSectionProps) => {
  // 横スクロールコンテナでは、currentSectionが1（About）の時にアニメーションを表示
  // セクション自体は常に表示される（opacity-0で非表示にしない）
  const isVisible = currentSection === 1;
  const ref = useRef<HTMLElement | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16 select-none"
    >
      <div className="mx-auto w-full max-w-7xl h-full flex flex-col">
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden py-12 md:py-16"
          data-scrollable="true"
        >
          {/* ヘッダー */}
          <div
            className={clsx(
              "mb-12 transition-all duration-700 md:mb-16",
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-12 opacity-100",
            )}
          >
            <h2 className="mb-4 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              About
            </h2>
          </div>

          {/* タイムライン */}
          <div className="relative">
            {/* タイムラインの縦線 */}
            <div className="absolute left-4 top-0 h-full w-px bg-foreground/20 md:left-8" />

            <div className="space-y-8 md:space-y-12">
              {[...EXPERIMENTS]
                .sort((a, b) => Number(b.id) - Number(a.id))
                .map((exp, index) => {
                  const isExpanded = expandedItems.has(exp.id);
                  const hasDetails = exp.details && exp.details.length > 0;

                  return (
                    <div
                      key={exp.id}
                      className={clsx(
                        "relative transition-all duration-700",
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-100",
                      )}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      {/* タイムラインのドット */}
                      <div className="absolute left-3 h-4 w-4 rounded-full border-2 border-foreground/30 bg-background md:left-6" />

                      <div className="ml-12 md:ml-16">
                        {/* 期間とタイトル */}
                        <div className="mb-2">
                          <div className="mb-1 font-mono text-xs text-foreground/60 md:text-sm">
                            {exp.period}
                          </div>
                          <h3 className="font-sans text-xl font-medium text-foreground md:text-2xl">
                            {exp.title}
                          </h3>
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="font-sans text-base text-foreground/90 md:text-lg">
                              {exp.company}
                            </span>
                            {exp.location && (
                              <span className="font-mono text-xs text-foreground/60">
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 説明 */}
                        <p className="mb-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                          {exp.description}
                        </p>

                        {/* 詳細（アコーディオン） */}
                        {hasDetails && (
                          <div className="mb-3">
                            <button
                              type="button"
                              onClick={() => toggleExpanded(exp.id)}
                              className="group flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground md:text-base"
                            >
                              <span className="font-mono">
                                {isExpanded ? "[-]" : "[+]"}
                              </span>
                              <span>
                                {isExpanded ? "Close details" : "View details"}
                              </span>
                            </button>

                            <div
                              className={clsx(
                                "overflow-hidden transition-all duration-300",
                                isExpanded
                                  ? "max-h-[1000px] opacity-100"
                                  : "max-h-0 opacity-0",
                              )}
                            >
                              <ul className="mt-3 space-y-2 pl-4">
                                {exp.details?.map((detail) => (
                                  <li
                                    key={`${exp.id}-${detail.slice(0, 20)}`}
                                    className="relative text-sm leading-relaxed text-foreground/80 before:absolute before:-left-4 before:content-['•'] md:text-base"
                                  >
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* タグ */}
                        {exp.tags && exp.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.tags.map((tag, tagIndex) => {
                              // 文字列のタグをIconKeyに変換（型安全でないが、既存データとの互換性のため）
                              const iconKey = Object.values(ICON_KEYS).includes(
                                tag as IconKey,
                              )
                                ? (tag as IconKey)
                                : undefined;
                              return (
                                <Tag
                                  key={`${exp.id}-${tag}-${tagIndex}`}
                                  displayName={tag}
                                  iconKey={iconKey}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* スキルセクション（オプション） */}
          <div
            className={clsx(
              "mt-16 transition-all duration-700 md:mt-24",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-100",
            )}
            style={{ transitionDelay: "600ms" }}
          >
            <h3 className="mb-6 font-sans text-2xl font-light text-foreground md:text-3xl">
              Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { displayName: "Python", iconKey: ICON_KEYS.Python },
                { displayName: "TypeScript", iconKey: ICON_KEYS.TypeScript },
                { displayName: "Rust", iconKey: ICON_KEYS.Rust },
                { displayName: "Clang", iconKey: ICON_KEYS.Clang },
                { displayName: "Java", iconKey: ICON_KEYS.Java },
                { displayName: "Golang", iconKey: ICON_KEYS.Golang },
                { displayName: "Cloud Run", iconKey: ICON_KEYS.CloudRun },
                { displayName: "React", iconKey: ICON_KEYS.React },
                { displayName: "Next.js", iconKey: ICON_KEYS.Nextjs },
                { displayName: "Hono", iconKey: ICON_KEYS.Honojs },
                { displayName: "k6", iconKey: ICON_KEYS.K6 },
              ].map((skill) => (
                <Tag
                  key={skill.displayName}
                  displayName={skill.displayName}
                  iconKey={skill.iconKey}
                  size="md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
