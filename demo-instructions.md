## Naive test generation

Generate a Playwright test for Super-Todo:

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

Rules for Super-Todo tests:

- Use ONLY data-testid locators
- Keep spec tiny: scenario + expect() only
- move actions to Page/Components as needed

Refactor the previous test to follow the rules:

- Use data-testid locators
- Keep spec tiny (only assertions + high-level calls)
- Extract actions into a TodosPage (tests/pages/TodosPage.ts)
- Save files and run the new spec


















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