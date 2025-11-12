export interface Project {
  number: string;
  title: string;
  category: string;
  year: string;
  direction: "left" | "right";
  repository?: string; // GitHub repository name (e.g., "slack-response-reminder")
  workId: string; // Unique identifier for the work detail page
  description?: string; // Short description
  designPhilosophy?: string; // Design philosophy and approach
  technologies?: string[]; // Technologies used
  features?: string[]; // Key features
}

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "Slack Response Reminder",
    category: "Slack Bot / Automation",
    year: "2024",
    direction: "left",
    repository: "slack-response-reminder",
    workId: "slack-response-reminder",
    description:
      "Slackでの返信忘れを防ぐためのリマインダーボット。定期的に未返信のメッセージをチェックし、ユーザーに通知します。",
    designPhilosophy:
      "このプロジェクトは、チーム内のコミュニケーション効率を向上させることを目的としています。非同期コミュニケーションにおいて、返信の見落としはチームの生産性に大きな影響を与えます。シンプルで直感的なインターフェースを心がけ、ユーザーが意識せずに使えるツールを目指しました。",
    technologies: ["Python", "Slack API", "FastAPI"],
    features: [
      "未返信メッセージの自動検出",
      "カスタマイズ可能なリマインダー間隔",
      "チャンネル単位での設定管理",
      "ユーザーフレンドリーな通知システム",
    ],
  },
];
