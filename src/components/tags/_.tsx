"use client";

import clsx from "clsx";
import Image from "next/image";

// タグ名からアイコンパスへのマッピング
const iconMap: Record<string, string> = {
  Python: "/python-icon.svg",
  TypeScript: "/typescript-icon.svg",
  Rust: "/rust-icon.svg",
  Clang: "/clang-icon.svg",
  Java: "/java-icon.svg",
  Golang: "/golang-icon.svg",
  CloudRun: "/cloudrun-icon.svg",
  React: "/react-icon.svg",
  Nextjs: "/nextjs-icon.svg",
  Honojs: "/honojs-icon.svg",
  K6: "/k6-icon.svg",
  // 必要に応じて他のタグも追加可能
};

interface TagProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Tag = ({ name, size = "sm", className }: TagProps) => {
  const iconPath = iconMap[name];
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
          alt={name}
          width={styles.iconSize}
          height={styles.iconSize}
          className={styles.icon}
          unoptimized
        />
      )}
      {name}
    </span>
  );
};
