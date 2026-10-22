/**
 * Adds shadcn/ui components and keeps them on our own `cn` helper.
 * The new-york-v4 registry imports `cn` from the "cn" package; this rewrites it to "@/lib/utils".
 *
 * Usage: bun run ui:add <component...> [shadcn flags, e.g. --overwrite]
 */
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const UI_DIR = "src/components/ui";

/** Runs a command with inherited stdio and exits on failure. */
function run(command: string, args: string[]) {
  const { status } = spawnSync(command, args, { stdio: "inherit", shell: true });
  if (status !== 0) process.exit(status ?? 1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: bun run ui:add <component...>");
  process.exit(1);
}

run("bunx", ["shadcn@latest", "add", ...args]);

// Rewrite `from "cn"` and report next-themes usage (not allowed, see CLAUDE.md).
for (const name of readdirSync(UI_DIR, { recursive: true, encoding: "utf8" })) {
  if (!/\.tsx?$/.test(name)) continue;
  const file = join(UI_DIR, name);
  const source = readFileSync(file, "utf8");
  const fixed = source.replace(/from (["'])cn\1/g, 'from "@/lib/utils"');

  if (fixed !== source) {
    writeFileSync(file, fixed);
    console.log(`Rewrote cn import: ${file}`);
  }
  if (/from (["'])next-themes\1/.test(fixed)) {
    console.warn(`Warning: ${file} imports next-themes — replace it with our ThemeProvider.`);
  }
}

// The CLI installs the "cn" package along with the component; we do not use it.
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
if (pkg.dependencies?.cn || pkg.devDependencies?.cn) run("bun", ["remove", "cn"]);
