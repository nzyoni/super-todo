import { test, expect } from '@playwright/test'

test.describe('Super Todo App', () => {
  test('should load the homepage successfully', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check that the main title and subtitle are visible
    await expect(
      page.getByRole('heading', { name: 'Super Todo' }),
    ).toBeVisible()

    // Check that the navigation "Tasks" link is visible in header
    await expect(page.getByRole('link', { name: 'Tasks' })).toBeVisible()
    // Check that task counter is visible (should be "0 of 0 tasks completed")
    await expect(page.getByText(/\d+ of \d+ tasks completed/)).toBeVisible()
  })

  test('should display the main content', async ({ page }) => {
    await page.goto('/')

    // Wait for the app to load by checking for the app root element
    await expect(page.locator('#app')).toBeVisible()

    // Check that the page doesn't show any obvious error messages
    const hasErrorText = await page
      .locator('text=/error|404|not found/i')
      .count()
    expect(hasErrorText).toBe(0)
  })

  test('should be responsive', async ({ page }) => {
    await page.goto('/')

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('body')).toBeVisible()
  })

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = []

    // Listen for console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')

    // Wait a bit for the page to fully load
    await page.waitForTimeout(2000)

    // Check that there are no critical JavaScript errors
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes('favicon') && // Ignore favicon errors
        !error.includes('Extension'), // Ignore browser extension errors
    )

    expect(criticalErrors).toHaveLength(0)
  })
})
