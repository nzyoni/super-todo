import type { Page, Locator } from '@playwright/test'
import { TaskTestIds } from '../../test-ids/task'

export class TaskCardComponent {
  readonly card: Locator
  readonly title: Locator
  readonly description: Locator
  readonly reporter: Locator
  readonly statusBadge: Locator
  readonly toggleButton: Locator

  constructor(page: Page, taskTitle: string) {
    // Find the card that contains the specific task title
    this.card = page.getByTestId(TaskTestIds.TASK_CARD).filter({
      has: page
        .getByTestId(TaskTestIds.TASK_TITLE)
        .filter({ hasText: taskTitle }),
    })

    this.title = this.card.getByTestId(TaskTestIds.TASK_TITLE)
    this.description = this.card.getByTestId(TaskTestIds.TASK_DESCRIPTION)
    this.reporter = this.card.getByTestId(TaskTestIds.TASK_REPORTER)
    this.statusBadge = this.card.getByTestId(TaskTestIds.TASK_STATUS_BADGE)
    this.toggleButton = this.card.getByTestId(TaskTestIds.TASK_TOGGLE_BUTTON)
  }

  async isVisible(): Promise<boolean> {
    return await this.card.isVisible()
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent()) || ''
  }

  async getDescription(): Promise<string | null> {
    if (await this.description.isVisible()) {
      return await this.description.textContent()
    }
    return null
  }

  async getReporter(): Promise<string> {
    return (await this.reporter.textContent()) || ''
  }

  async getStatus(): Promise<string> {
    return (await this.statusBadge.textContent()) || ''
  }

  async isCompleted(): Promise<boolean> {
    const status = await this.getStatus()
    return status === 'Completed'
  }

  async toggleCompletion(): Promise<void> {
    await this.toggleButton.click()
  }

  async clickTitle(): Promise<void> {
    await this.title.click()
  }
}

export class TaskListComponent {
  private page: Page

  readonly taskList: Locator
  readonly emptyState: Locator
  readonly taskCounter: Locator

  constructor(page: Page) {
    this.page = page
    this.taskList = page.getByTestId(TaskTestIds.TASK_LIST)
    this.emptyState = page.getByTestId(TaskTestIds.EMPTY_STATE)
    this.taskCounter = page.getByTestId(TaskTestIds.TASK_COUNTER)
  }

  async isEmptyStateVisible(): Promise<boolean> {
    return await this.emptyState.isVisible()
  }

  async isTaskListVisible(): Promise<boolean> {
    return await this.taskList.isVisible()
  }

  async getTaskCount(): Promise<{ completed: number; total: number }> {
    const counterText = (await this.taskCounter.textContent()) || ''
    const match = counterText.match(/(\d+) of (\d+) tasks completed/)

    if (match) {
      return {
        completed: parseInt(match[1]),
        total: parseInt(match[2]),
      }
    }

    return { completed: 0, total: 0 }
  }

  async getTaskByTitle(title: string): Promise<TaskCardComponent> {
    return new TaskCardComponent(this.page, title)
  }

  async getAllTaskTitles(): Promise<string[]> {
    const titleElements = await this.page
      .getByTestId(TaskTestIds.TASK_TITLE)
      .all()
    const titles: string[] = []

    for (const element of titleElements) {
      const text = await element.textContent()
      if (text) {
        titles.push(text)
      }
    }

    return titles
  }

  async getTaskCards(): Promise<TaskCardComponent[]> {
    const titles = await this.getAllTaskTitles()
    return titles.map((title) => new TaskCardComponent(this.page, title))
  }
}
