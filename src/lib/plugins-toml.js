import toml from "@iarna/toml";
import fs from "node:fs/promises";
import { readTomlFile } from "./fs.js";

/** @param {string} path */
export async function sortExtensionsToml(path) {
  const pluginsToml = await readTomlFile(path);

  const extensionNames = Object.keys(pluginsToml);
  extensionNames.sort();

  /** @type {Record<string, any>} */
  const sortedExtensionsToml = {};

  for (const name of extensionNames) {
    const entry = pluginsToml[name];
    sortedExtensionsToml[name] = entry;
  }

  await fs.writeFile(
    path,
    toml.stringify(sortedExtensionsToml).trimEnd() + "\n",
    "utf-8",
  );
}
