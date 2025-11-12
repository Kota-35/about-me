import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <h1 className="mb-4 font-sans text-4xl font-light text-foreground md:text-5xl">
        Work Not Found
      </h1>
      <p className="mb-8 text-center text-foreground/60 md:text-lg">
        お探しのプロジェクトは見つかりませんでした。
      </p>
      <Link
        href="/"
        className="font-mono text-sm text-foreground/60 transition-colors hover:text-foreground md:text-base"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
