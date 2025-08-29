import type { Page } from '@playwright/test'
import { CreateTaskFormComponent } from '../components/create-task-form'
import { TaskListComponent } from '../components/task-card'

export class HomePage {
  private page: Page

  readonly taskCreationForm: CreateTaskFormComponent
  readonly taskList: TaskListComponent

  constructor(page: Page) {
    this.page = page
    this.taskCreationForm = new CreateTaskFormComponent(page)
    this.taskList = new TaskListComponent(page)
  }

  async goto(): Promise<void> {
    await this.page.goto('/')
  }

  async waitForLoad(): Promise<void> {
    // Wait for either the task list or empty state to be visible
    await Promise.race([
      this.taskList.taskList.waitFor({ state: 'visible' }),
      this.taskList.emptyState.waitFor({ state: 'visible' }),
    ])
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title()
  }

  async isHeaderVisible(): Promise<boolean> {
    const header = this.page.getByRole('heading', { name: 'Super Todo' })
    return await header.isVisible()
  }
}
