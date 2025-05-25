# Alembiqa Code Generation Prompts

**Last Updated:** 2025-05-24

This document contains a structured, step-by-step plan for developing Alembiqa, a local TypeScript code quality and test generation CLI tool. Each section builds incrementally on the previous, ensuring safe and progressive development.

---

## Phase 1: Project Setup & Infrastructure

### Prompt 1: Initialize Project Scaffold

```text
Create a new Deno project for alembiqa.

```

### Prompt 2: Implement CLI Entry Point

```text
Create `src/cli.ts` with the following:

- Use deno standard CLI package to create a basic CLI with a single command `alembiqa`
- The command should accept a `--help` flag that shows usage info
- Print "Alembiqa CLI running" when the CLI is executed

```
### Prompt 3: Config File Detection & Init Command
```text
In `src/config.ts`:

- Write a function `findConfigFile()` that looks for `.alembiqa.yml` or `.alembiqa.json` in the project root
- If no config is found, `findConfigFile()` returns `undefined`

In `src/cli.ts`:

- Add an `init` command (`alembiqa init`) that creates a default `.alembiqa.yml` with sample rules
- The default config should include sections for:
  - codeStyle
  - linting
  - performance
  - codeLocality
  - codeCoupling
  - dependencies
  - security
  - SOLID principles
```
### Prompt 4: Config Loader Utility
```text
Extend `src/config.ts`:

- Implement a `loadConfig()` function that:
  - Loads `.alembiqa.yml` or `.alembiqa.json` from project root
  - Parses YAML or JSON into a typed `AlembiqaConfig` object
  - Validates the config against a TypeScript interface using `zod`
  - Throws errors if the config is invalid
```

## Phase 2: Core Code Quality Analysis

### Phase 2.1: Staged File Detection Module
```text
Create a `src/gitUtils.ts` module that:

- Exports a function `getStagedFiles()` that:
  - Runs `git diff --name-only --cached`
  - Filters for files ending with `.ts` or `.tsx`
  - Excludes files in `.gitignore` (using `ignore` npm package or similar)
  - Returns an array of staged file paths

Write a test file `src/gitUtils.test.ts` that:
- Mocks `child_process.execSync` for `git` commands
- Tests `getStagedFiles()` with different staged file outputs

```

### Phase 2.2: Analysis Engine Scaffold
```text
Create `src/analysisEngine.ts` that:

- Exports an `analyzeFile(filePath: string, config: AlembiqaConfig)` function
- Uses TypeScript Compiler API (`ts-morph` or `typescript`) to parse the file into an AST
- For now, stub analysis logic: always return an array with one dummy suggestion, e.g., "Consider splitting large function on line 12"
- Include the file path, suggestion, line number, and category (e.g., `codeCoupling`)

Write `src/analysisEngine.test.ts` that:
- Mocks a simple TypeScript file
- Verifies that `analyzeFile()` returns the dummy suggestion with correct structure
```

### Phase 2.3: Connect Config to Analysis
```text
Update `analyzeFile()` in `src/analysisEngine.ts`:

- Accept the loaded `config` object
- For now, pass the config into the analysis logic (even though it’s not used yet)
- Log a warning if no config is found

Update `src/cli.ts`:

- After loading the config, call `getStagedFiles()`
- For each staged file, call `analyzeFile()` and print the suggestion to the console

```

### Phase 2.4: Add Lint-Style Check (Code Style)
```text
Extend `analyzeFile()`:

- Implement a simple rule: flag lines longer than 120 characters as a `codeStyle` issue
- For each flagged line, return a suggestion: "Line exceeds 120 characters"
- Include line number and explanation

Update `analysisEngine.test.ts` to test this rule:
- Provide a mock TypeScript file with a long line
- Verify that the suggestion is returned
```

### Phase 2.5: Format Suggestions as Diff-Like Output
```text
Create `src/diffFormatter.ts`:

- Export a `formatSuggestionAsDiff(suggestion: Suggestion)` function that:
  - Formats the suggestion like a `git diff` hunk:
    - Includes file path, line number, and suggested change
    - Includes explanation as a comment
- For now, stub the "suggested change" as a comment: `// Suggested change: ...`

Update `cli.ts`:
- After analyzing staged files, print the formatted diff for each suggestion

```

## Phase 3: Test Generation

### Phase 3.1: Test Generator Scaffold
```text
Create `src/testGenerator.ts` that:

- Exports a `generateTestSuggestions(filePath: string, config: AlembiqaConfig)` function
- For now, return a dummy test suggestion: e.g., "Test that add(1, 2) returns 3"
- Structure test suggestions similarly to code analysis suggestions:
  - File path, test type (`unit`), line number, suggested test content, and explanation

Add `testGenerator.test.ts` to test the stubbed logic

```

### Phase 3.2: Detect Project Test Frameworks
```text
Create `src/testFrameworkDetector.ts`:

- Export a `detectTestFramework()` function that:
  - Looks for `vitest`, `jest`, or `playwright` in `package.json` dependencies
  - Returns detected framework(s) or defaults (`vitest` + `playwright`)

Update `testGenerator.ts`:
- Include the detected framework in test suggestions

Add `testFrameworkDetector.test.ts` to test detection logic with mock `package.json` files
```

### Phase 3.3: CLI Command for Test Generation
```text
Update `cli.ts`:

- Add `generate-tests` command:
  - Load config
  - Get staged files
  - Call `generateTestSuggestions()` for each file
  - Print formatted diffs for each test suggestion
```

## Phase 4: Review & Apply Flow

### Phase 4.1: Interactive Review CLI
```text
Create `src/review.ts` that:

- Exports a `reviewSuggestions(suggestions: Suggestion[])` function
- Uses `inquirer` to prompt:
  - Accept, reject, or skip each suggestion
- Returns user choices as an array of accepted suggestions

Update `cli.ts`:
- Add `review` command that:
  - Calls `reviewSuggestions()` after `analyze` or `generate-tests`
  - Prints accepted suggestions
```
### Phase 4.2: Apply Mode
```text
Update `cli.ts`:

- Add a global `--apply` flag:
  - If passed, skip interactive review
  - Apply all suggestions directly
- Stub file writing logic: for now, just log which files would be modified
```
## Phase 5: Data Handling & Metrics

### Phase 5.1: Add SQLite Setup
```text
Create `src/db.ts`:

- Use `better-sqlite3` to create and manage a local SQLite database.
- The database file should be `.alembiqa/analytics.db` (relative to the project root).
- On initialization, create a `suggestions` table with columns:
  - id (primary key)
  - filePath (text)
  - lineNumber (integer)
  - type (text: code quality, test)
  - category (text: e.g., codeStyle, security)
  - content (text: suggestion details)
  - explanation (text)
  - status (text: accepted, rejected, skipped)
  - timestamp (datetime)

Add a test `src/db.test.ts`:
- Verify that the database initializes and the `suggestions` table is created.
```
### Phase 5.2: Store Suggestions in Database
```text
Update `analyzeFile()` and `generateTestSuggestions()`:

- After creating a suggestion, insert a record into the `suggestions` table.
- Include all relevant fields (filePath, lineNumber, type, category, content, explanation, status as "pending", timestamp).

Update `db.ts`:
- Add a function `storeSuggestion(suggestion: Suggestion)` that inserts into the database.

Write tests in `db.test.ts` to verify that suggestions are inserted correctly.
```
### Phase 5.3: Track User Review Decisions
```text
Update `reviewSuggestions()` in `review.ts`:

- After each accept/reject/skip decision, update the corresponding record in the `suggestions` table:
  - Set `status` to accepted, rejected, or skipped.
  - Update `timestamp` to the current time.

Add a function `updateSuggestionStatus(id, status)` in `db.ts` to handle this.

Write tests for `updateSuggestionStatus()` in `db.test.ts`.
```

### Phase 5.4: Log Session Metadata
```text
Add a `sessions` table to the SQLite database with columns:
- id (primary key)
- timestamp (datetime)
- command (text)
- exitCode (integer)
- filesAnalyzed (integer)
- suggestionsGenerated (integer)

Update `cli.ts`:
- At the start of each command, create a new session record.
- After the command runs, update the session with exitCode, filesAnalyzed, and suggestionsGenerated.

Write tests in `db.test.ts` to verify session logging works.
```

### Phase 5.5: Add `.alembiqa` Directory Management
```text
In `src/fsUtils.ts`:

- Create a utility `ensureAlembiqaDir()` that:
  - Creates `.alembiqa` directory if it doesn't exist.
  - Ensures `analytics.db` is in place.

Update `db.ts`:
- Call `ensureAlembiqaDir()` before initializing the database.

Write tests for `ensureAlembiqaDir()`:
- Verify it creates the directory and the database file.
```

### Phase 5.6: Generate Summary Report
```text
Create `src/report.ts`:

- Export a `generateSummaryReport()` function that:
  - Queries the database for:
    - Total suggestions by status (accepted, rejected, skipped)
    - Suggestions by category
    - Session stats (e.g., files analyzed, exit codes)
  - Prints the summary in a CLI-friendly format
  - Writes the report to `.alembiqa/summary-<timestamp>.log`

Add `report.test.ts` to verify correct summary output.

Update `cli.ts`:
- After each command, call `generateSummaryReport()`.
```

### Phase 5.7: Implement Reset Command
```text
In `cli.ts`:

- Add a `reset` command that:
  - Deletes the `.alembiqa` directory (using `fs.rm` with `{ recursive: true }`).

Add confirmation prompt before deletion:
- "Are you sure you want to delete all Alembiqa data? (y/N)"

Test manually that running `alembiqa reset` deletes the directory and database.
```
