import { sortExtensionsToml } from "./lib/plugins-toml.js";
import { sortGitmodules } from "./lib/git.js";

await sortExtensionsToml("plugins.toml");
await sortGitmodules(".gitmodules");
