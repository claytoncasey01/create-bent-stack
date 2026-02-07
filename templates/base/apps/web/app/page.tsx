import Link from "next/link";
import { Button } from "@/components/ui/button";

const stack = [
  {
    letter: "B",
    name: "Bun",
    description:
      "Fast all-in-one JavaScript runtime, bundler, and package manager.",
    href: "https://bun.sh",
  },
  {
    letter: "E",
    name: "Elysia",
    description: "Ergonomic, type-safe web framework built for Bun.",
    href: "https://elysiajs.com",
  },
  {
    letter: "N",
    name: "Next.js",
    description:
      "The React framework for production-grade web applications.",
    href: "https://nextjs.org",
  },
  {
    letter: "T",
    name: "Turbo",
    description:
      "High-performance build system for monorepo orchestration.",
    href: "https://turbo.build",
  },
];

const extras = [
  "Prisma",
  "Better Auth",
  "Eden Treaty",
  "shadcn/ui",
  "Tailwind CSS",
  "React Query",
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/50 via-background to-background" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-16">
        {/* Hero */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="mb-2 inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Full-stack TypeScript monorepo
          </div>
          <h1 className="text-6xl font-extrabold tracking-tighter sm:text-8xl">
            BENT
            <span className="ml-3 text-3xl font-medium tracking-normal text-muted-foreground sm:text-4xl">
              Stack
            </span>
          </h1>
          <p className="max-w-md text-base text-muted-foreground sm:text-lg">
            Type-safe from database to frontend. Built for speed, designed for
            scale.
          </p>
        </div>

        {/* Stack Cards */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {stack.map((tech) => (
            <a
              key={tech.letter}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-foreground/25 hover:bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  {tech.letter}
                </span>
                <h2 className="font-semibold">{tech.name}</h2>
                <span className="ml-auto text-muted-foreground transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {tech.description}
              </p>
            </a>
          ))}
        </div>

        {/* Auth CTA */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Your app is ready. Sign in to get started.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Extras */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/60">Also included:</span>
          {extras.map((name, i) => (
            <span key={name} className="flex items-center gap-4">
              {name}
              {i < extras.length - 1 && (
                <span className="text-border">&middot;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
