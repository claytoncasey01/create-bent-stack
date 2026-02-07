import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { copyDir } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getTemplatesDir(): string {
  // In development, templates are sibling to src/
  const devPath = join(__dirname, "..", "templates");
  if (existsSync(devPath)) return devPath;
  // Fallback for built version
  return join(__dirname, "templates");
}

export function scaffold(projectName: string, includeExamples: boolean, includeClaude: boolean): void {
  const templatesDir = getTemplatesDir();
  const targetDir = join(process.cwd(), projectName);

  mkdirSync(targetDir, { recursive: true });

  // Copy base templates
  const baseDir = join(templatesDir, "base");

  // Copy root files
  copyDir(join(baseDir, "root"), targetDir, projectName);

  // Copy packages
  const packagesDir = join(baseDir, "packages");
  const packagesEntries = ["eslint-config", "typescript-config", "database", "shared"];
  for (const pkg of packagesEntries) {
    const src = join(packagesDir, pkg);
    if (existsSync(src)) {
      copyDir(src, join(targetDir, "packages", pkg), projectName);
    }
  }

  // Copy apps
  const appsDir = join(baseDir, "apps");
  const appsEntries = ["web", "api"];
  for (const app of appsEntries) {
    const src = join(appsDir, app);
    if (existsSync(src)) {
      copyDir(src, join(targetDir, "apps", app), projectName);
    }
  }

  // Copy examples (overwrites overlapping files)
  if (includeExamples) {
    const examplesDir = join(templatesDir, "examples");

    const exAppsDir = join(examplesDir, "apps");
    for (const app of appsEntries) {
      const src = join(exAppsDir, app);
      if (existsSync(src)) {
        copyDir(src, join(targetDir, "apps", app), projectName);
      }
    }

    const exPkgDir = join(examplesDir, "packages");
    for (const pkg of packagesEntries) {
      const src = join(exPkgDir, pkg);
      if (existsSync(src)) {
        copyDir(src, join(targetDir, "packages", pkg), projectName);
      }
    }
  }

  // Copy Claude Code config files
  if (includeClaude) {
    const claudeDir = join(templatesDir, "claude");

    // Copy root CLAUDE.md and AGENTS.md
    const claudeRoot = join(claudeDir, "root");
    if (existsSync(claudeRoot)) {
      copyDir(claudeRoot, targetDir, projectName);
    }

    // Copy app-level AGENTS.md files
    const claudeAppsDir = join(claudeDir, "apps");
    for (const app of appsEntries) {
      const src = join(claudeAppsDir, app);
      if (existsSync(src)) {
        copyDir(src, join(targetDir, "apps", app), projectName);
      }
    }
  }

  // Initialize git
  try {
    execSync("git init", { cwd: targetDir, stdio: "ignore" });
  } catch {
    // git init is non-critical
  }
}
