# Alembiqa Code Generation Prompts

**Last Updated:** 2025-05-24

This document contains a structured, step-by-step plan for developing Alembiqa, a local TypeScript code quality and test generation CLI tool. Each section builds incrementally on the previous, ensuring safe and progressive development.

---

## Phase 1: Project Setup & Infrastructure

### Prompt 1: Initialize Project Scaffold

```text
Create a new Node.js project for Alembiqa.

- Create the project directory.
- Initialize a Git repository (`git init`).
- Create a `.gitignore` file that excludes:
  - `node_modules`
  - `dist`
  - `.alembiqa`
  - `*.log`
- Create a `package.json` with:
  - `name: "alembiqa"`
  - `version: "0.1.0"`
  - `type: "module"`
  - A `bin` field mapping `alembiqa` to `src/cli.ts`
- Install dependencies:
  - `typescript`
  - `ts-node`
  - `commander`
- Create a `tsconfig.json` with:
  - `target: "ES2020"`
  - `module: "ESNext"`
  - `outDir: "dist"`
```

### Prompt 2: Implement CLI Entry Point

... (truncated for brevity, include full prompts here) ...

## Phase 2: Core Code Quality Analysis

... (include prompts 10–21) ...

## Phase 3: Test Generation

... (include prompts 22–29) ...

## Phase 4: Polish & Wrap-Up

... (include prompts 30–end) ...

---

## Manual QA Checklist

1. Run `alembiqa init` and verify config generation.
2. Stage files and run `alembiqa analyze`.
3. Run `alembiqa generate-tests`.
4. Review and apply suggestions interactively.
5. Verify database and logs in `.alembiqa`.
6. Check versioning and update check behavior.
7. Confirm summary reports are generated.

---

## Next Steps

- Prepare `README.md` and `CONTRIBUTING.md`.
- Refine prompts as needed based on developer feedback.

---

End of prompts.
