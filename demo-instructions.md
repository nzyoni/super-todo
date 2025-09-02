







## Simple MCP usage

- Open http://localhost:3000, then use the search input to look for tasks containing the word 'test'

- Navigate to localhost:3000 and add a new task using playwright mcp




















## Naive test generation

Generate a Playwright test for Super-Todo.
Before creating the test, use Playwright MCP to analyze and understand the actual application behavior.
Then, use the Playwright MCP response as context for generating the test.

Steps:

1. Open the app
2. Add a todo "Buy milk"
3. Verify it's in the list
4. Toggle it done
5. Verify it shows as completed

Keep it simple and save to: tests/e2e/add-and-complete.spec.ts
Then run just this test and show the result.

---

Manual run

npx playwright test e2e/add-and-complete.spec.ts --headed

---






















## Implement Best practices

### 1 Test Ids and Page Objects

Follow these rules for Super-Todo tests:

- Use ONLY data-testid locators
- Keep spec tiny: scenario + expect() only
- Move actions into a TodosPage Page Object (tests/pages/TodosPage.ts)

Tasks:

1. Crawl http://localhost:3000 and list all data-testid values with short notes.
2. Propose a minimal TodosPage API for add/toggle/delete actions.
3. Generate tests/pages/TodosPage.ts using only getByTestId selectors.
4. Refactor the previous Super-Todo test so it uses only TodosPage + expect() assertions.
5. Verify rule compliance: all selectors use getByTestId, assertions only in the spec, no low-level actions in the spec.
6. Run the new spec and report pass/fail. If it fails, suggest the minimal fix in TodosPage (not in the spec).


























### 2 Assertions and Test Structure

Please use expect() ONLY at spec files.

Refactor the spec to follow these rules:

- Keep spec very short: scenario + expect() only.
- Assertions only in the spec (none in pages/components).
- Pages/components should return data or throw errors.
- For transient UI (e.g., loader), use expect.soft().
- Use page.waitForNavigation() only when reload is expected.

























### 3 Centralized Test IDs

Refactor the Super-Todo test to use contextual Test-ID enums.

- Create a shared place to store test-ids enums
- Use the same enum over e2e and the app
- Enum members for example:
  ADD_INPUT = 'add-todo-input'
  ADD_BUTTON = 'add-todo-button'
  CARD = 'todo-card'
  TOGGLE_DONE = 'toggle-done'
- Replace all hardcoded strings with these enums in pages/components/specs.
- Never use raw strings for test IDs.
- Create new test ids if needed








### Playwright UI Mode

npx playwright test --ui
