"use client";

import { useRef, useState } from "react";

interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  details?: string[]; // 長い詳細情報（インターンなど）用
  tags?: string[];
}

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

  // サンプルデータ - 実際の経歴に置き換えてください
  const experiences: ExperienceItem[] = [
    {
      id: "1",
      period: "2024 - Present",
      title: "Software Engineer",
      company: "Company Name",
      location: "Tokyo, Japan",
      description: "Backend and frontend development, data infrastructure.",
      details: [
        "Developed and maintained microservices architecture",
        "Led team of 5 engineers in agile development",
        "Improved system performance by 40%",
      ],
      tags: ["TypeScript", "Python", "React"],
    },
    {
      id: "2",
      period: "2023 - 2024",
      title: "Intern",
      company: "Tech Startup",
      location: "Tokyo, Japan",
      description:
        "Full-stack development internship focusing on web applications.",
      details: [
        "Worked on frontend development using React and TypeScript",
        "Implemented RESTful APIs using Node.js and Express",
        "Participated in code reviews and agile ceremonies",
        "Collaborated with senior engineers on feature development",
        "Optimized database queries resulting in 30% performance improvement",
        "Wrote comprehensive unit and integration tests",
      ],
      tags: ["React", "TypeScript", "Node.js"],
    },
    {
      id: "3",
      period: "2022 - 2023",
      title: "Student",
      company: "University",
      location: "Tokyo, Japan",
      description: "Computer Science major with focus on software engineering.",
      tags: ["Python", "Java", "Data Structures"],
    },
  ];

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 snap-center items-start overflow-y-auto px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl py-12 md:py-16">
        {/* ヘッダー */}
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-12 opacity-100"
          }`}
        >
          <h2 className="mb-4 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            About
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
            エンジニアとしての経験と、技術への情熱について。
          </p>
        </div>

        {/* タイムライン */}
        <div className="relative">
          {/* タイムラインの縦線 */}
          <div className="absolute left-4 top-0 h-full w-px bg-foreground/20 md:left-8" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => {
              const isExpanded = expandedItems.has(exp.id);
              const hasDetails = exp.details && exp.details.length > 0;

              return (
                <div
                  key={exp.id}
                  className={`relative transition-all duration-700 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-100"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  {/* タイムラインのドット */}
                  <div className="absolute left-3 h-3 w-3 rounded-full border-2 border-foreground/30 bg-background md:left-6" />

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
                            {isExpanded ? "詳細を閉じる" : "詳細を見る"}
                          </span>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
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
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-foreground/20 bg-foreground/10 px-2.5 py-1 font-mono text-xs text-foreground/90 backdrop-blur-md"
                          >
                            {tag}
                          </span>
                        ))}
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
          className={`mt-16 transition-all duration-700 md:mt-24 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-100"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <h3 className="mb-6 font-sans text-2xl font-light text-foreground md:text-3xl">
            Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Python",
              "TypeScript",
              "Rust",
              "React",
              "Next.js",
              "Node.js",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-foreground/20 bg-foreground/10 px-4 py-2 font-mono text-sm text-foreground/90 backdrop-blur-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
