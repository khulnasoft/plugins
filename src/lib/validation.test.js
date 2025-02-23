import { describe, expect, it } from "vitest";
import {
  validateExtensionsToml,
  validateGitmodules,
  validateManifest,
} from "./validation.js";

describe("validateManifest", () => {
  describe("given a valid manifest", () => {
    it("does not throw", () => {
      const validManifest = {
        name: "My Valid Extension",
        version: "1.0.0",
        authors: ["Me <me@example.com>"],
        description: "This extension is very cool",
        repository: "https://github.com/khulnasoft-plugins/my-extension",
      };

      expect(() => validateManifest(validManifest)).not.toThrow();
    });
  });

  describe('when the name starts with "Khulnasoft"', () => {
    it("throws a validation error", () => {
      expect(() =>
        validateManifest({ name: "Khulnasoft Something" }),
      ).toThrowErrorMatchingInlineSnapshot(
        `[Error: Extension names should not start with "Khulnasoft ", as they are all Khulnasoft plugins: "Khulnasoft Something".]`,
      );
    });
  });
});

describe("validateExtensionsToml", () => {
  describe("when `plugins.toml` only contains plugins with valid IDs", () => {
    it.each(["my-cool-extension", "base16"])(
      'does not throw for "%s"',
      (extensionId) => {
        const pluginsToml = {
          [extensionId]: {},
        };

        expect(() => validateExtensionsToml(pluginsToml)).not.toThrow();
      },
    );
  });

  describe("when `plugins.toml` contains an extension ID with invalid characters", () => {
    it.each(["BadExtension", "bad_extension"])(
      'throws a validation error for "%s"',
      (extensionId) => {
        const pluginsToml = {
          [extensionId]: {},
        };

        expect(() => validateExtensionsToml(pluginsToml)).toThrowError(
          `Extension IDs must only consist of lowercase letters, numbers, and hyphens ('-'): "${extensionId}".`,
        );
      },
    );
  });
});

describe("validateGitmodules", () => {
  describe("when an entry contains a non-HTTPS URL", () => {
    it("throws a validation error", () => {
      const gitmodules = {
        "plugins/my-extension": {
          path: "plugins/my-extension",
          url: "git@github.com:me/my-extension.git",
        },
      };

      expect(() =>
        validateGitmodules(gitmodules),
      ).toThrowErrorMatchingInlineSnapshot(
        `[Error: Submodules must use "https://" scheme.]`,
      );
    });
  });
});
