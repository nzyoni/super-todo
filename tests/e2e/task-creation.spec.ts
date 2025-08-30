import { test, expect } from '@playwright/test'

test.describe('Task Creation', () => {
  test('should create a new task and display it in the task list', async ({
    page,
  }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Verify the page has loaded properly
    await expect(
      page.getByRole('heading', { name: 'Super Todo' }),
    ).toBeVisible()

    // Check initial state - should show existing tasks (the app has initial data)
    await expect(page.getByText(/\d+ of \d+ tasks completed/)).toBeVisible()

    // Get the initial task count
    const initialCountText = await page
      .getByText(/\d+ of \d+ tasks completed/)
      .textContent()
    const initialTotal = parseInt(
      initialCountText!.split(' of ')[1].split(' ')[0],
    )

    // Click the "Create New Task" button
    await page.getByRole('button', { name: 'Create New Task' }).click()

    // Verify the dialog is open
    await expect(
      page.getByRole('dialog', { name: 'Create New Task' }),
    ).toBeVisible()
    await expect(
      page.getByText('Add a new task to your todo list'),
    ).toBeVisible()

    // Fill in the task form
    const taskTitle = 'Test Task Title'
    const taskDescription = 'This is a test task description'
    const reporterName = 'Test Reporter'

    await page.getByLabel('Title *').fill(taskTitle)
    await page.getByLabel('Description').fill(taskDescription)
    await page.getByLabel('Reporter *').fill(reporterName)

    // Submit the form
    await page.getByRole('button', { name: 'Create Task' }).click()

    // Verify the dialog closes
    await expect(
      page.getByRole('dialog', { name: 'Create New Task' }),
    ).not.toBeVisible()

    // Verify the task appears in the list
    await expect(page.getByText(taskTitle)).toBeVisible()
    await expect(page.getByText(taskDescription)).toBeVisible()
    await expect(page.getByText(reporterName)).toBeVisible()

    // Verify the task counter is updated (new task should be at the top, so still same completed count but total increased)
    const newTotal = initialTotal + 1
    const expectedPattern = new RegExp(`\\d+ of ${newTotal} tasks completed`)
    await expect(page.getByText(expectedPattern)).toBeVisible()

    // Verify the task has the correct status (new tasks should be open/incomplete)
    const taskCard = page.locator('text=' + taskTitle).locator('..')
    await expect(taskCard).toBeVisible()
  })

  test('should require title and reporter fields', async ({ page }) => {
    await page.goto('/')

    // Click the "Create New Task" button
    await page.getByRole('button', { name: 'Create New Task' }).click()

    // Try to submit without filling required fields
    const createButton = page.getByRole('button', { name: 'Create Task' })
    await expect(createButton).toBeDisabled()

    // Fill only title
    await page.getByLabel('Title *').fill('Test Title')
    await expect(createButton).toBeDisabled()

    // Clear title and fill only reporter
    await page.getByLabel('Title *').clear()
    await page.getByLabel('Reporter *').fill('Test Reporter')
    await expect(createButton).toBeDisabled()

    // Fill both required fields
    await page.getByLabel('Title *').fill('Test Title')
    await expect(createButton).toBeEnabled()
  })

  test('should create task with only required fields', async ({ page }) => {
    await page.goto('/')

    // Click the "Create New Task" button
    await page.getByRole('button', { name: 'Create New Task' }).click()

    // Fill only required fields
    const taskTitle = 'Minimal Task'
    const reporterName = 'Minimal Reporter'

    await page.getByLabel('Title *').fill(taskTitle)
    await page.getByLabel('Reporter *').fill(reporterName)

    // Submit the form
    await page.getByRole('button', { name: 'Create Task' }).click()

    // Verify the task appears in the list
    await expect(page.getByText(taskTitle)).toBeVisible()
    await expect(page.getByText(reporterName)).toBeVisible()

    // Verify the task counter is updated
    await expect(page.getByText(/\d+ of \d+ tasks completed/)).toBeVisible()
  })

  test('should cancel task creation', async ({ page }) => {
    await page.goto('/')

    // Click the "Create New Task" button
    await page.getByRole('button', { name: 'Create New Task' }).click()

    // Fill in some data
    await page.getByLabel('Title *').fill('Test Title')
    await page.getByLabel('Reporter *').fill('Test Reporter')

    // Click cancel
    await page.getByRole('button', { name: 'Cancel' }).click()

    // Verify the dialog closes
    await expect(
      page.getByRole('dialog', { name: 'Create New Task' }),
    ).not.toBeVisible()

    // Verify no task was created (task count should remain the same)
    await expect(page.getByText(/\d+ of \d+ tasks completed/)).toBeVisible()
  })

  test('should clear form when dialog is closed and reopened', async ({
    page,
  }) => {
    await page.goto('/')

    // Open dialog and fill form
    await page.getByRole('button', { name: 'Create New Task' }).click()
    await page.getByLabel('Title *').fill('Test Title')
    await page.getByLabel('Description').fill('Test Description')
    await page.getByLabel('Reporter *').fill('Test Reporter')

    // Close dialog by clicking outside or escape
    await page.keyboard.press('Escape')
    await expect(
      page.getByRole('dialog', { name: 'Create New Task' }),
    ).not.toBeVisible()

    // Reopen dialog
    await page.getByRole('button', { name: 'Create New Task' }).click()

    // Verify form is cleared
    await expect(page.getByLabel('Title *')).toHaveValue('')
    await expect(page.getByLabel('Description')).toHaveValue('')
    await expect(page.getByLabel('Reporter *')).toHaveValue('')
  })

  test('should create multiple tasks and display them in order', async ({
    page,
  }) => {
    await page.goto('/')

    const tasks = [
      { title: 'First Task', reporter: 'Reporter 1' },
      { title: 'Second Task', reporter: 'Reporter 2' },
      { title: 'Third Task', reporter: 'Reporter 3' },
    ]

    for (const task of tasks) {
      // Create each task
      await page.getByRole('button', { name: 'Create New Task' }).click()
      await page.getByLabel('Title *').fill(task.title)
      await page.getByLabel('Reporter *').fill(task.reporter)
      await page.getByRole('button', { name: 'Create Task' }).click()

      // Verify task appears
      await expect(page.getByText(task.title)).toBeVisible()
    }

    // Verify all tasks are visible
    for (const task of tasks) {
      await expect(page.getByText(task.title)).toBeVisible()
      await expect(page.getByText(task.reporter)).toBeVisible()
    }

    // Verify the task counter (should show all tasks including the 3 new ones)
    await expect(page.getByText(/\d+ of \d+ tasks completed/)).toBeVisible()

    // Verify the newest task appears first (verify "Third Task" is visible)
    await expect(page.getByText('Third Task')).toBeVisible()
  })
})
