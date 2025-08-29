import type { Page, Locator } from '@playwright/test'
import { TaskTestIds } from '../../test-ids/task'

export class CreateTaskFormComponent {
  private page: Page

  // Locators
  readonly createButton: Locator
  readonly dialog: Locator
  readonly titleInput: Locator
  readonly descriptionInput: Locator
  readonly reporterInput: Locator
  readonly submitButton: Locator
  readonly cancelButton: Locator

  constructor(page: Page) {
    this.page = page
    this.createButton = page.getByTestId(TaskTestIds.CREATE_TASK_BUTTON)
    this.dialog = page.getByTestId(TaskTestIds.CREATE_TASK_DIALOG)
    this.titleInput = page.getByTestId(TaskTestIds.TASK_TITLE_INPUT)
    this.descriptionInput = page.getByTestId(TaskTestIds.TASK_DESCRIPTION_INPUT)
    this.reporterInput = page.getByTestId(TaskTestIds.TASK_REPORTER_INPUT)
    this.submitButton = page.getByTestId(TaskTestIds.SUBMIT_TASK_BUTTON)
    this.cancelButton = page.getByTestId(TaskTestIds.CANCEL_TASK_BUTTON)
  }

  async openDialog(): Promise<void> {
    await this.createButton.click()
    await this.dialog.waitFor({ state: 'visible' })
  }

  async closeDialogWithCancel(): Promise<void> {
    await this.cancelButton.click()
    await this.dialog.waitFor({ state: 'hidden' })
  }

  async closeDialogWithEscape(): Promise<void> {
    await this.page.keyboard.press('Escape')
    await this.dialog.waitFor({ state: 'hidden' })
  }

  async fillTaskForm(data: {
    title: string
    description?: string
    reporter: string
  }): Promise<void> {
    await this.titleInput.fill(data.title)
    if (data.description) {
      await this.descriptionInput.fill(data.description)
    }
    await this.reporterInput.fill(data.reporter)
  }

  async submitTask(): Promise<void> {
    await this.submitButton.click()
    await this.dialog.waitFor({ state: 'hidden' })
  }

  async createTask(data: {
    title: string
    description?: string
    reporter: string
  }): Promise<void> {
    await this.openDialog()
    await this.fillTaskForm(data)
    await this.submitButton.click()
    await this.dialog.waitFor({ state: 'hidden' })
  }

  async isDialogVisible(): Promise<boolean> {
    return await this.dialog.isVisible()
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.submitButton.isEnabled()
  }

  async getFormValues(): Promise<{
    title: string
    description: string
    reporter: string
  }> {
    return {
      title: await this.titleInput.inputValue(),
      description: await this.descriptionInput.inputValue(),
      reporter: await this.reporterInput.inputValue(),
    }
  }
}
