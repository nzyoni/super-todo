import { Store } from '@tanstack/store'
import type { Task, TaskFormData } from './types'

interface TodoState {
  tasks: Task[]
  searchQuery: string
}

const initialState: TodoState = {
  tasks: [
    {
      id: '1',
      title: 'Set up the super todo app',
      description:
        'Configure the application structure and basic functionality',
      reporter: 'Infra',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
      completed: true,
    },
    {
      id: '2',
      title: 'Add task management features',
      description: 'Implement create, edit, and search functionality',
      reporter: 'Developer',
      createdAt: new Date('2025-05-01'),
      updatedAt: new Date('2025-05-01'),
      completed: true,
    },
    {
      id: '3',
      title: 'Test the application',
      reporter: 'QA Team',
      createdAt: new Date('2025-07-03'),
      updatedAt: new Date('2025-07-03'),
      completed: false,
    },
  ],
  searchQuery: '',
}

export const todoStore = new Store(initialState)

// Helper functions for managing tasks
export const todoActions = {
  createTask: (taskData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      reporter: taskData.reporter,
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
    }

    todoStore.setState((state) => ({
      ...state,
      tasks: [...state.tasks, newTask],
    }))

    return newTask
  },

  updateTask: (
    id: string,
    updates: Partial<Omit<Task, 'id' | 'createdAt'>>,
  ) => {
    todoStore.setState((state) => ({
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task,
      ),
    }))
  },

  deleteTask: (id: string) => {
    todoStore.setState((state) => ({
      ...state,
      tasks: state.tasks.filter((task) => task.id !== id),
    }))
  },

  toggleTaskCompletion: (id: string) => {
    todoStore.setState((state) => ({
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task,
      ),
    }))
  },

  setSearchQuery: (query: string) => {
    todoStore.setState((state) => ({
      ...state,
      searchQuery: query,
    }))
  },

  getTaskById: (id: string) => {
    return todoStore.state.tasks.find((task) => task.id === id)
  },
}
