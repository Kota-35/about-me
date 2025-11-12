import type { IconKey } from "@/components/tags/constants";
import { ICON_KEYS } from "@/components/tags/constants";
import { tech } from "@/components/tags/helpers";

export interface Technology {
  displayName: string;
  iconKey?: IconKey;
}

export interface Project {
  number: string;
  title: string;
  category: string;
  year: string;
  direction: "left" | "right";
  repository?: string; // GitHub repository name (e.g., "slack-response-reminder")
  workId: string; // Unique identifier for the work detail page
  description?: string; // Short description
  overview?: string; // Project overview
  designPhilosophy?: string; // Design philosophy and approach
  technologies?: Record<string, Technology[]>; // Technologies used, grouped by category
  features?: string[]; // Key features
  architecture?: string; // System architecture description
  implementationPoints?: string[]; // Implementation highlights
  codeFeatures?: string[]; // Code characteristics
  futureImprovements?: string[]; // Future improvement plans
  learnings?: string[]; // What was learned
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
    overview:
      "Slackの未返信メッセージを自動検知し、担当者にリマインド通知を送信するシステムです。クライアント対応チャンネルにおける返信漏れを防ぎ、コミュニケーションの質を向上させます。",
    designPhilosophy:
      "このプロジェクトは、チーム内のコミュニケーション効率を向上させることを目的としています。非同期コミュニケーションにおいて、返信の見落としはチームの生産性に大きな影響を与えます。シンプルで直感的なインターフェースを心がけ、ユーザーが意識せずに使えるツールを目指しました。",
    technologies: {
      Backend: [
        tech("FastAPI", ICON_KEYS.FastAPI),
        tech("Python 3.12", ICON_KEYS.Python),
        tech("Pydantic", ICON_KEYS.Pydantic),
      ],
      Infrastructure: [
        tech("Google Cloud Tasks", ICON_KEYS.GoogleCloudTasks),
        tech("Slack SDK", ICON_KEYS.SlackSDK),
        tech("Notion API", ICON_KEYS.NotionAPI),
      ],
      "Development Tools": [tech("Ruff"), tech("uv")],
    },
    features: [
      "リアルタイム監視: Slack Events APIを活用し、社外メンバーからのメッセージをリアルタイムで検知。新規メッセージを受信後、3時間後に自動チェックを実行",
      "未返信判定: スレッド内のメッセージを分析し、社内メンバーからの返信有無を判定。未返信の場合、担当者にDMで通知を送信",
      "定期チェック（週次）: 毎週水曜日に自動実行。月曜・火曜に社内からのメッセージがないチャンネルを検出し、該当チャンネルの担当者にリマインドを送信",
      "Notion連携: クライアント情報（チャンネルID、担当者、ステータス）をNotionで管理。メンバー情報（Slack ID、名前）もNotionで一元管理。設定の変更がリアルタイムで反映",
    ],
    architecture: `Slack Event → FastAPI Endpoint
              ↓
         Cloud Tasks（3時間後実行）
              ↓
         未返信チェック ← Notion（設定取得）
              ↓
         DM送信 / ログ記録`,
    implementationPoints: [
      "非同期処理: `AsyncWebClient`や`httpx.AsyncClient`を活用し、複数のAPI呼び出しを効率的に処理",
      "エラーハンドリング: Slack API、Notion API、Cloud Tasksの各レイヤーで適切なエラーハンドリングとリトライ処理を実装",
      "型安全性: Pydanticモデルによる厳密な型定義とAPIレスポンスのバリデーション",
      "タイムゾーン対応: 日本時間（Asia/Tokyo）での日時処理。週の開始（月曜日）を考慮した日付計算",
    ],
    codeFeatures: [
      "モジュール分割: 機能ごとに明確に分離された構造",
      "依存性注入: 環境変数を`pydantic-settings`で管理",
      "テスタビリティ: クライアント生成を関数化し、テストしやすい設計",
      "可読性: 型ヒントとdocstringによる明確なインターフェース",
    ],
    futureImprovements: [
      "メトリクス収集（通知数、応答時間など）",
      "リマインド頻度のカスタマイズ機能",
      "Webダッシュボードの追加",
    ],
    learnings: [
      "Google Cloud Tasksを使った非同期タスク処理",
      "FastAPIによる本格的なWeb API設計",
      "複数の外部APIを統合するアーキテクチャ設計",
    ],
  },
];
