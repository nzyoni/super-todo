export interface Task {
  id: string
  title: string
  description?: string
  reporter: string
  createdAt: Date
  updatedAt: Date
  completed: boolean
}

export interface TaskFormData {
  title: string
  description?: string
  reporter: string
}
