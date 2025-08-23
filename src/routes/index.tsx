import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { CheckSquare } from 'lucide-react'
import { TaskCard } from '@/components/TaskCard'
import { CreateTaskForm } from '@/components/CreateTaskForm'
import { SearchBar } from '@/components/SearchBar'
import { todoStore } from '@/lib/todo-store'

export const Route = createFileRoute('/')({
  component: TodoHomepage,
})

function TodoHomepage() {
  const { tasks, searchQuery } = useStore(todoStore, (state) => ({
    tasks: state.tasks,
    searchQuery: state.searchQuery,
  }))

  // Filter tasks based on search query
  const filteredTasks = searchQuery.trim()
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tasks
  const sortedFilteredTasks = filteredTasks.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const completedCount = filteredTasks.filter((task) => task.completed).length
  const totalCount = filteredTasks.length

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <CheckSquare className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Super Todo</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Organize your tasks efficiently
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          {completedCount} of {totalCount} tasks completed
          {searchQuery && (
            <span className="ml-2 text-primary">
              • Showing results for "{searchQuery}"
            </span>
          )}
        </div>
      </div>

      {/* Search and Create */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SearchBar />
        </div>
        <div>
          <CreateTaskForm
            onTaskCreated={() => {
              // Optional: scroll to top or show success message
            }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery ? 'No tasks found' : 'No tasks yet'}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? `No tasks match your search for "${searchQuery}"`
                : 'Create your first task to get started!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedFilteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
