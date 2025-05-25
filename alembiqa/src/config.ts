import { parse as parseYaml } from "https://deno.land/std@0.224.0/yaml/mod.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

/** Looks for .alembiqa.yml or .alembiqa.json in the project root. Returns the path if found, else undefined. */
export function findConfigFile(): string | undefined {
  const cwd = Deno.cwd();
  const ymlPath = `${cwd}/.alembiqa.yml`;
  const jsonPath = `${cwd}/.alembiqa.json`;
  try {
    if (Deno.statSync(ymlPath).isFile) return ymlPath;
  } catch { /* not found */ }
  try {
    if (Deno.statSync(jsonPath).isFile) return jsonPath;
  } catch { /* not found */ }
  return undefined;
}

// AlembiqaConfig type and schema
export const AlembiqaConfigSchema = z.object({
  codeStyle: z.object({
    maxLineLength: z.number().optional(),
  }),
  linting: z.object({
    enabled: z.boolean(),
  }),
  performance: z.object({
    enabled: z.boolean(),
  }),
  codeLocality: z.object({
    enabled: z.boolean(),
  }),
  codeCoupling: z.object({
    enabled: z.boolean(),
  }),
  dependencies: z.object({
    allowed: z.array(z.string()),
  }),
  security: z.object({
    enabled: z.boolean(),
  }),
  SOLID: z.object({
    enabled: z.boolean(),
  }),
});

export type AlembiqaConfig = z.infer<typeof AlembiqaConfigSchema>;

/**
 * Loads and validates the Alembiqa config from .alembiqa.yml or .alembiqa.json.
 * Throws if not found or invalid.
 */
export async function loadConfig(): Promise<AlembiqaConfig> {
  const configPath = findConfigFile();
  if (!configPath) {
    throw new Error("No Alembiqa config file found (.alembiqa.yml or .alembiqa.json)");
  }
  const raw = await Deno.readTextFile(configPath);
  let parsed: unknown;
  if (configPath.endsWith(".yml") || configPath.endsWith(".yaml")) {
    parsed = parseYaml(raw);
  } else if (configPath.endsWith(".json")) {
    parsed = JSON.parse(raw);
  } else {
    throw new Error("Unsupported config file format");
  }
  const result = AlembiqaConfigSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error("Invalid Alembiqa config: " + result.error.toString());
  }
  return result.data;
}