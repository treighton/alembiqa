# Alembiqa TODO Checklist

**Last Updated:** 2025-05-24

This is a thorough, step-by-step checklist for building Alembiqa. Mark each item as you complete it.

---

## Phase 1: Project Setup & Infrastructure

- [ ] Initialize Git repository
- [ ] Create `.gitignore` file with exclusions
- [ ] Create `package.json` with CLI bin entry
- [ ] Install dependencies: `typescript`, `ts-node`, `commander`
- [ ] Create `tsconfig.json` with ES2020 target and ESNext module
- [ ] Implement `src/cli.ts` with basic CLI using `commander`
- [ ] Add `alembiqa init` command to generate default `.alembiqa.yml`
- [ ] Create `src/config.ts` with `findConfigFile()` and `loadConfig()`
- [ ] Validate config file with `zod`
- [ ] Write config loading tests

---

## Phase 2: Core Code Quality Analysis

- [ ] Create `src/gitUtils.ts` for staged file detection (exclude `.gitignore`d files)
- [ ] Write `src/gitUtils.test.ts` for staged file detection
- [ ] Create `src/analysisEngine.ts` with `analyzeFile()` stubbed logic
- [ ] Add simple code style check (line > 120 chars)
- [ ] Create `src/analysisEngine.test.ts` for `analyzeFile()`
- [ ] Create `src/diffFormatter.ts` for diff-like output
- [ ] Update `cli.ts` to integrate analysis engine and print diffs

---

## Phase 3: Test Generation

- [ ] Create `src/testGenerator.ts` with `generateTestSuggestions()` stub
- [ ] Create `src/testGenerator.test.ts`
- [ ] Implement `detectTestFramework()` in `src/testFrameworkDetector.ts`
- [ ] Write `testFrameworkDetector.test.ts`
- [ ] Integrate test framework detection into `generateTestSuggestions()`
- [ ] Add `generate-tests` command in `cli.ts`

---

## Phase 4: Review & Apply Flow

- [ ] Create `src/review.ts` with interactive CLI flow
- [ ] Add `review` command to `cli.ts`
- [ ] Implement global `--apply` flag in `cli.ts`
- [ ] Create `src/applyChanges.ts` with stub `applySuggestions()`
- [ ] Add basic file writing logic to `applySuggestions()`

---

## Phase 5: Data Handling & Metrics

- [ ] Install `better-sqlite3` and set up `.alembiqa/analytics.db`
- [ ] Create `suggestions` table
- [ ] Implement `storeSuggestion()` and `updateSuggestionStatus()` in `db.ts`
- [ ] Update `analyzeFile()` and `generateTestSuggestions()` to store suggestions
- [ ] Add `src/report.ts` to generate CLI and file summary reports
- [ ] Add `reset` command in `cli.ts` to delete `.alembiqa`
- [ ] Track session metadata in the DB

---

## Phase 6: Final Polish

- [ ] Respect `.gitignore` in staged file detection
- [ ] Implement exit codes based on analysis results
- [ ] Add versioning support (config, DB, reports)
- [ ] Add update check mechanism in `src/updateCheck.ts`
- [ ] Implement real file modification logic in `applySuggestions()`
- [ ] Generate test scaffolding (setup, teardown) if missing
- [ ] Support mocking of external dependencies in test generation
- [ ] Generate property-based and fuzz test suggestions
- [ ] Final QA: Verify full CLI flow works as intended

---

## Final QA Checklist

- [ ] Run `alembiqa init` and verify config generation
- [ ] Stage files and run `alembiqa analyze`
- [ ] Run `alembiqa generate-tests`
- [ ] Review and apply suggestions interactively
- [ ] Verify database and logs in `.alembiqa`
- [ ] Check versioning and update check behavior
- [ ] Confirm summary reports are generated
- [ ] Document known issues and TODOs in `README.md`

---

End of Checklist.
