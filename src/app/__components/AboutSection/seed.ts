import type { ExperienceItem } from "./types";

// サンプルデータ - 実際の経歴に置き換えてください
export const EXPERIMENTS: ExperienceItem[] = [
  {
    id: "1",
    period: "2020 - 2023",
    title: "Student",
    company: "富山県立富山東高等学校",
    location: "Toyama Japan",
    description: "サッカー部",
    tags: [],
  },
  {
    id: "2",
    period: "2023 - 2027",
    title: "Student",
    company: "信州大学",
    location: "Nagano, Japan",
    description: "電子情報システム工学科",
    tags: ["Python", "Clang", "Java"],
  },
  {
    id: "3",
    period: "2024 - Present",
    title: "Intern",
    company: "RREHATCH",
    location: "Tokyo, Japan",
    description:
      "Backend・Frontend Engineer, Data Analyst, Data Infrastructure, Business efficiency improvement",
    details: [
      "マーケティングを支えるSaaS開発のバックエンド・フロントエンド開発",
      "分析ダッシュボードSaaS開発",
      "人材プラットフォームにAIエージェントチャット機能を提供するための、BE開発",
      "Slack返信リマインド",
      "AIアシスタント(業務効率化) ",
    ],
    tags: [
      "React",
      "TypeScript",
      "Honojs",
      "Nextjs",
      "K6",
      "CloudRun",
      "Python",
      "Rust",
    ],
  },
];
