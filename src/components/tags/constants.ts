/**
 * アイコンキーの定数定義
 * このオブジェクトのキーが利用可能なアイコンキーとなります
 */
export const ICON_KEYS = {
  Python: "Python",
  TypeScript: "TypeScript",
  Rust: "Rust",
  Clang: "Clang",
  Java: "Java",
  Golang: "Golang",
  CloudRun: "Cloud Run",
  React: "React",
  Nextjs: "Nextjs",
  Honojs: "Honojs",
  K6: "K6",
  FastAPI: "FastAPI",
  Pydantic: "Pydantic",
  SlackSDK: "SlackSDK",
  NotionAPI: "NotionAPI",
  GoogleCloudTasks: "GoogleCloudTasks",
} as const;

/**
 * アイコンキーの型
 */
export type IconKey = (typeof ICON_KEYS)[keyof typeof ICON_KEYS];

/**
 * アイコンキーからアイコンパスへのマッピング
 */
export const ICON_MAP: Record<IconKey, string> = {
  [ICON_KEYS.Python]: "/python-icon.svg",
  [ICON_KEYS.TypeScript]: "/typescript-icon.svg",
  [ICON_KEYS.Rust]: "/rust-icon.svg",
  [ICON_KEYS.Clang]: "/clang-icon.svg",
  [ICON_KEYS.Java]: "/java-icon.svg",
  [ICON_KEYS.Golang]: "/golang-icon.svg",
  [ICON_KEYS.CloudRun]: "/cloudrun-icon.svg",
  [ICON_KEYS.React]: "/react-icon.svg",
  [ICON_KEYS.Nextjs]: "/nextjs-icon.svg",
  [ICON_KEYS.Honojs]: "/honojs-icon.svg",
  [ICON_KEYS.K6]: "/k6-icon.svg",
  [ICON_KEYS.FastAPI]: "/fastapi-icon.svg", // FastAPIはPythonアイコンを使用
  [ICON_KEYS.Pydantic]: "/pydantic-icon.svg", // PydanticはPythonアイコンを使用
  [ICON_KEYS.SlackSDK]: "/slack-icon.svg",
  [ICON_KEYS.NotionAPI]: "/notion-icon.svg",
  [ICON_KEYS.GoogleCloudTasks]: "/cloudtasks-icon.svg", // Cloud Runアイコンを使用
};
