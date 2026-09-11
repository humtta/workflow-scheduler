import { parse } from "@std/yaml";

export type Config = {
  jobs: Job[];
};

export type Job = {
  repo: string;
  ref: string;
  workflow: string;
  cron: string;
  inputs?: Record<string, string>;
};

export function loadConfig(path: string): Config {
  let content: string;
  try {
    content = Deno.readTextFileSync(path);
  } catch (err) {
    throw new Error(`Unable to read config file '${path}'`, { cause: err });
  }

  let config: unknown;
  try {
    config = parse(content);
  } catch (err) {
    throw new Error(`Unable to parse config file '${path}'`, { cause: err });
  }

  try {
    validateConfig(config);
  } catch (err) {
    throw new Error(`Invalid config file '${path}'`, { cause: err });
  }

  return config;
}

function validateConfig(value: unknown): asserts value is Config {}

function validateJob(value: unknown): asserts value is Job {}

/**
 * Checks if the given value is a plain object.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
