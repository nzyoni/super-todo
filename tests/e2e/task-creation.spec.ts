import { test, expect } from '../fixtures'

test.describe('Task Creation', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto()
    await homePage.waitForLoad()
  })

  test('should create a new task and display it in the task list', async ({
    homePage,
  }) => {
    expect(await homePage.isHeaderVisible()).toBe(true)

    const initialCount = await homePage.taskList.getTaskCount()

    const taskData = {
      title: 'Test Task Title',
      description: 'This is a test task description',
      reporter: 'Test Reporter',
    }

    await homePage.taskCreationForm.createTask(taskData)

    const newTask = await homePage.taskList.getTaskByTitle(taskData.title)
    expect(await newTask.isVisible()).toBe(true)
    expect(await newTask.getTitle()).toBe(taskData.title)
    expect(await newTask.getDescription()).toBe(taskData.description)
    expect(await newTask.getReporter()).toBe(taskData.reporter)
    expect(await newTask.getStatus()).toBe('Open')

    const updatedCount = await homePage.taskList.getTaskCount()
    expect(updatedCount.total).toBe(initialCount.total + 1)
  })

  test('should require title and reporter fields', async ({ homePage }) => {
    await homePage.taskCreationForm.openDialog()

    expect(await homePage.taskCreationForm.isSubmitButtonEnabled()).toBe(false)

    await homePage.taskCreationForm.fillTaskForm({
      title: 'Test Title',
      reporter: '',
    })
    expect(await homePage.taskCreationForm.isSubmitButtonEnabled()).toBe(false)

    await homePage.taskCreationForm.fillTaskForm({
      title: '',
      reporter: 'Test Reporter',
    })
    expect(await homePage.taskCreationForm.isSubmitButtonEnabled()).toBe(false)

    await homePage.taskCreationForm.fillTaskForm({
      title: 'Test Title',
      reporter: 'Test Reporter',
    })
    expect(await homePage.taskCreationForm.isSubmitButtonEnabled()).toBe(true)
  })

  test('should create task with only required fields', async ({ homePage }) => {
    const taskData = {
      title: 'Minimal Task',
      reporter: 'Minimal Reporter',
    }

    await homePage.taskCreationForm.createTask(taskData)

    const newTask = await homePage.taskList.getTaskByTitle(taskData.title)
    expect(await newTask.isVisible()).toBe(true)
    expect(await newTask.getTitle()).toBe(taskData.title)
    expect(await newTask.getReporter()).toBe(taskData.reporter)
  })

  test('should cancel task creation', async ({ homePage }) => {
    await homePage.taskCreationForm.openDialog()
    await homePage.taskCreationForm.fillTaskForm({
      title: 'Test Title',
      reporter: 'Test Reporter',
    })

    await homePage.taskCreationForm.closeDialogWithCancel()

    expect(await homePage.taskCreationForm.isDialogVisible()).toBe(false)
  })

  test('should clear form when dialog is closed and reopened', async ({
    homePage,
  }) => {
    await homePage.taskCreationForm.openDialog()
    await homePage.taskCreationForm.fillTaskForm({
      title: 'Test Title',
      description: 'Test Description',
      reporter: 'Test Reporter',
    })

    await homePage.taskCreationForm.closeDialogWithEscape()

    await homePage.taskCreationForm.openDialog()
    const formValues = await homePage.taskCreationForm.getFormValues()
    expect(formValues.title).toBe('')
    expect(formValues.description).toBe('')
    expect(formValues.reporter).toBe('')
  })

  test('should create multiple tasks and display them', async ({
    homePage,
  }) => {
    const tasks = [
      { title: 'First Task', reporter: 'Reporter 1' },
      { title: 'Second Task', reporter: 'Reporter 2' },
      { title: 'Third Task', reporter: 'Reporter 3' },
    ]

    for (const taskData of tasks) {
      await homePage.taskCreationForm.createTask(taskData)
    }

    for (const taskData of tasks) {
      const task = await homePage.taskList.getTaskByTitle(taskData.title)
      expect(await task.isVisible()).toBe(true)
      expect(await task.getReporter()).toBe(taskData.reporter)
    }

    const titles = await homePage.taskList.getAllTaskTitles()
    expect(titles).toContain('Third Task')
  })
})
