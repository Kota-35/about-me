import type { IconKey } from "./constants";

/**
 * 技術スタックの定義を簡単にするヘルパー関数
 * @param displayName 表示名
 * @param iconKey アイコンキー（省略可能）
 * @returns 技術スタックオブジェクト
 *
 * @example
 * tech("Python 3.12", ICON_KEYS.Python)
 * tech("FastAPI", ICON_KEYS.FastAPI)
 * tech("Ruff") // アイコンなし
 */
export function tech(
  displayName: string,
  iconKey?: IconKey,
): { displayName: string; iconKey?: IconKey } {
  return { displayName, iconKey };
}
