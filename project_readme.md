# QA Automation Assessment

This repository contains the full QA test suite submission. It integrates a manual test plan, active bug tracking, and an automated verification suite built using Node.js, Selenium WebDriver, and Jest.

## Setup Instructions

1. Ensure [Node.js](https://nodejs.org/) is installed.
2. Clone this repository.
3. Install dependencies:
   ```bash
   npm install
   ```
*(Note: Selenium WebDriver in modern versions natively handles browser binaries, so no separate driver installation is needed if Chrome is installed on your OS).*

## Execution Commands

**Run the entire suite (Headless UI + API):**
```bash
npm test
```

**Run only UI Tests (Headless):**
```bash
npm run test:ui
```

**Run only UI Tests (Headed - Visually watch the browser):**
```bash
npm run test:headed
```

**Run only API Tests:**
```bash
npm run test:api
```

## Project Contents
* `test-plan.md`: Covers 26 robust manual test cases encompassing boundaries and edge cases.
* `5-bug-reports.md`: Contains 5 distinct defects found on the target platform (also tracked via GitHub Issues and Kanban board).
* `tests/ui/`: Contains Selenium WebDriver E2E logic targeting 8 critical flows.
* `tests/api/`: Contains Axios API validation against `reqres.in`.
* `.github/workflows/`: Native CI pipeline configuration.