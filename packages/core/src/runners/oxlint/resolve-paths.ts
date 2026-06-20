import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { TSCONFIG_FILENAMES } from "../../constants.js";

const esmRequire = createRequire(import.meta.url);

export const resolveOxlintBinary = (): string => {
  const oxlintMainPath = esmRequire.resolve("oxlint");
  const oxlintPackageDirectory = path.resolve(path.dirname(oxlintMainPath), "..");
  return path.join(oxlintPackageDirectory, "bin", "oxlint");
};

// Oxlint loads JS plugins by file path (`await import(specifier)`). We resolve
// the `oxlint-plugin-react-doctor` engine's main entry — it ships a
// default-exported plugin module that oxlint accepts as-is.
//
// In dev (workspace symlink) and in any layout where the engine is an installed
// node_module, `require.resolve` finds it. The pinned standalone distribution
// can't install the engine that way: it lives under `packages/*`, and a `file:`
// dependency on a workspace member is resolved against the consuming project,
// not against this package, so it never links under `npx`/`pnpm dlx github:`.
// There the engine ships in-tree alongside the CLI bundle instead, so we fall
// back to resolving it by layout — this module is bundled into
// `packages/react-doctor/dist/cli.js`, two directories below the sibling
// `packages/oxlint-plugin-react-doctor/dist`. The engine's own runtime deps
// (`eslint-scope`, `eslint-visitor-keys`, `oxc-parser`) are declared as regular
// dependencies of the pinned root package so node resolves them from the
// install's `node_modules`.
export const resolvePluginPath = (): string => {
  try {
    return esmRequire.resolve("oxlint-plugin-react-doctor");
  } catch (error) {
    const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
    const inTreeEntry = path.resolve(
      moduleDirectory,
      "..",
      "..",
      "oxlint-plugin-react-doctor",
      "dist",
      "index.js",
    );
    if (fs.existsSync(inTreeEntry)) return inTreeEntry;
    throw error;
  }
};

export const resolveTsConfigRelativePath = (rootDirectory: string): string | null => {
  for (const filename of TSCONFIG_FILENAMES) {
    if (fs.existsSync(path.join(rootDirectory, filename))) {
      return `./${filename}`;
    }
  }
  return null;
};
