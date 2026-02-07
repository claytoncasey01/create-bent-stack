import { existsSync, statSync, mkdirSync, readdirSync, copyFileSync, writeFileSync, readFileSync } from "fs";
import { join, extname, relative } from "path";
import { BINARY_EXTENSIONS, TOKENS } from "./constants.js";

export function validateName(name: string): string | undefined {
  if (!name) return "Project name is required";
  if (!/^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/.test(name)) {
    return "Project name must be a valid npm package name (lowercase, no spaces)";
  }
  if (existsSync(name)) {
    return `Directory "${name}" already exists`;
  }
  return undefined;
}

export function isBinary(filePath: string): boolean {
  return BINARY_EXTENSIONS.includes(extname(filePath).toLowerCase());
}

export function toTitleCase(kebab: string): string {
  return kebab
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function replaceTokens(content: string, projectName: string): string {
  const scope = `@${projectName}`;
  const title = toTitleCase(projectName);

  return content
    .replaceAll(TOKENS.PROJECT_NAME, projectName)
    .replaceAll(TOKENS.PACKAGE_SCOPE, scope)
    .replaceAll(TOKENS.PROJECT_TITLE, title);
}

export function copyDir(
  srcDir: string,
  destDir: string,
  projectName: string,
): void {
  mkdirSync(destDir, { recursive: true });

  const entries = readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    let destName = entry.name;

    if (entry.isDirectory()) {
      copyDir(srcPath, join(destDir, destName), projectName);
      continue;
    }

    // Strip .hbs extension
    if (destName.endsWith(".hbs")) {
      destName = destName.slice(0, -4);
    }

    const destPath = join(destDir, destName);

    if (isBinary(srcPath)) {
      copyFileSync(srcPath, destPath);
    } else {
      const content = readFileSync(srcPath, "utf-8");
      writeFileSync(destPath, replaceTokens(content, projectName));
    }
  }
}
