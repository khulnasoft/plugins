const EXTENSION_ID_PATTERN = /^[a-z0-9\-]+$/;

/**
 * Exceptions to the rule of extension IDs starting in `khulnasoft-`.
 *
 * Only to be edited by Khulnasoft staff.
 */
const EXTENSION_ID_STARTS_WITH_EXCEPTIONS = ["khulnasoft-legacy-themes"];

/**
 * Exceptions to the rule of extension IDs ending in `-khulnasoft`.
 *
 * Only to be edited by Khulnasoft staff.
 */
const EXTENSION_ID_ENDS_WITH_EXCEPTIONS = ["xy-khulnasoft"];

/**
 * @param {Record<string, any>} pluginsToml
 */
export function validateExtensionsToml(pluginsToml) {
  for (const [extensionId, _extensionInfo] of Object.entries(pluginsToml)) {
    if (!EXTENSION_ID_PATTERN.test(extensionId)) {
      throw new Error(
        `Extension IDs must only consist of lowercase letters, numbers, and hyphens ('-'): "${extensionId}".`,
      );
    }

    if (
      extensionId.startsWith("khulnasoft-") &&
      !EXTENSION_ID_STARTS_WITH_EXCEPTIONS.includes(extensionId)
    ) {
      throw new Error(
        `Extension IDs should not start with "khulnasoft-", as they are all Khulnasoft plugins: "${extensionId}".`,
      );
    }

    if (
      extensionId.endsWith("-khulnasoft") &&
      !EXTENSION_ID_ENDS_WITH_EXCEPTIONS.includes(extensionId)
    ) {
      throw new Error(
        `Extension IDs should not end with "-khulnasoft", as they are all Khulnasoft plugins: "${extensionId}".`,
      );
    }
  }
}

/**
 * @param {Record<string, any>} manifest
 */
export function validateManifest(manifest) {
  if (
    manifest["name"].startsWith("Khulnasoft ") &&
    manifest["name"] !== "Khulnasoft Legacy Themes"
  ) {
    throw new Error(
      `Extension names should not start with "Khulnasoft ", as they are all Khulnasoft plugins: "${manifest["name"]}".`,
    );
  }

  if (manifest["name"].endsWith(" Khulnasoft")) {
    throw new Error(
      `Extension names should not end with " Khulnasoft", as they are all Khulnasoft plugins: "${manifest["name"]}".`,
    );
  }
}

/**
 * @param {import('git-submodule-js').Submodule} gitmodules
 */
export function validateGitmodules(gitmodules) {
  for (const [name, entry] of Object.entries(gitmodules)) {
    const url = entry["url"];
    if (!url) {
      throw new Error(`Missing URL for "${name}".`);
    }

    if (!url.startsWith("https://")) {
      throw new Error(`Submodules must use "https://" scheme.`);
    }
  }
}
