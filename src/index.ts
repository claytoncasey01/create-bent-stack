#!/usr/bin/env bun
import { Command } from "commander";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { VERSION } from "./constants.js";
import { validateName } from "./utils.js";
import { scaffold } from "./scaffold.js";

const program = new Command()
  .name("create-bent-stack")
  .description("Scaffold a full-stack BENT monorepo")
  .version(VERSION)
  .argument("[project-name]", "Name of the project to create")
  .option("--examples", "Include example code (todos CRUD, auth pages)")
  .parse(process.argv);

const opts = program.opts<{ examples?: boolean }>();
let projectName = program.args[0];

p.intro(pc.bgCyan(pc.black(" create-bent-stack ")));

if (!projectName) {
  const nameResult = await p.text({
    message: "What is your project named?",
    placeholder: "my-app",
    validate: validateName,
  });

  if (p.isCancel(nameResult)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  projectName = nameResult as string;
} else {
  const err = validateName(projectName);
  if (err) {
    p.cancel(err);
    process.exit(1);
  }
}

let includeExamples = opts.examples ?? false;

if (!opts.examples) {
  const examplesResult = await p.confirm({
    message: "Include example code? (todos CRUD, auth pages)",
    initialValue: false,
  });

  if (p.isCancel(examplesResult)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  includeExamples = examplesResult as boolean;
}

const s = p.spinner();
s.start("Scaffolding your BENT Stack project...");

try {
  scaffold(projectName, includeExamples);
  s.stop("Project scaffolded successfully!");
} catch (err) {
  s.stop("Failed to scaffold project.");
  p.cancel(err instanceof Error ? err.message : String(err));
  process.exit(1);
}

p.note(
  [
    `cd ${projectName}`,
    "bun install",
    "# Copy .env.example to .env in apps/api and packages/database",
    "# Update DATABASE_URL and BETTER_AUTH_SECRET",
    "bun run db:generate",
    "bun run db:push",
    "bun run dev",
  ].join("\n"),
  "Next steps",
);

p.outro(pc.green("Happy building!"));
