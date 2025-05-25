import { findConfigFile } from "./config.ts";

const defaultConfig = `# Alembiqa Configuration
codeStyle:
  maxLineLength: 120
linting:
  enabled: true
performance:
  enabled: true
codeLocality:
  enabled: true
codeCoupling:
  enabled: true
dependencies:
  allowed: []
security:
  enabled: true
SOLID:
  enabled: true
`;

function printHelp() {
  console.log(`
Alembiqa CLI - TypeScript code quality and test generation tool

Usage:
  deno run -A src/cli.ts [command]

Commands:
  init        Create a default .alembiqa.yml config file
  --help      Show this help message
`);
}

async function main(args: string[]) {
  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  if (args[0] === "init") {
    const configPath = `${Deno.cwd()}/.alembiqa.yml`;
    try {
      await Deno.writeTextFile(configPath, defaultConfig, { create: true });
      console.log("Created .alembiqa.yml with default rules.");
    } catch (err) {
      console.error("Failed to create config file:", err);
    }
    return;
  }

  console.log("Alembiqa CLI running");
}

if (import.meta.main) {
  await main(Deno.args);
}