"use client";

import clsx from "clsx";
import Image from "next/image";
import type { IconKey } from "./constants";
import { ICON_MAP } from "./constants";

interface TagProps {
  displayName: string; // 表示名
  iconKey?: IconKey; // アイコンマッピング用のキー（省略可能）
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Tag = ({
  displayName,
  iconKey,
  size = "sm",
  className,
}: TagProps) => {
  // iconKeyが指定されている場合はそれを使用
  const iconPath = iconKey ? ICON_MAP[iconKey] : undefined;
  const hasIcon = !!iconPath;

  // サイズに応じたスタイル
  const sizeStyles = {
    sm: {
      container: "px-2.5 py-1 text-xs",
      icon: "h-3.5 w-3.5",
      iconSize: 14,
    },
    md: {
      container: "px-3 py-1.5 text-sm",
      icon: "h-4 w-4",
      iconSize: 16,
    },
    lg: {
      container: "px-4 py-2 text-base",
      icon: "h-5 w-5",
      iconSize: 20,
    },
  };

  const styles = sizeStyles[size];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-foreground/10 font-mono text-foreground/90 backdrop-blur-md",
        styles.container,
        className,
      )}
    >
      {hasIcon && (
        <Image
          src={iconPath}
          alt={displayName}
          width={styles.iconSize}
          height={styles.iconSize}
          className={styles.icon}
          unoptimized
        />
      )}
      {displayName}
    </span>
  );
};
