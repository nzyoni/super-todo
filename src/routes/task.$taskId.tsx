import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, Edit, Save, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@tanstack/react-store'
import { todoStore, todoActions } from '@/lib/todo-store'
import type { TaskFormData } from '@/lib/types'

export const Route = createFileRoute('/task/$taskId')({
  component: TaskDetails,
})

function TaskDetails() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const task = useStore(todoStore, (state) =>
    state.tasks.find((t) => t.id === taskId),
  )

  const [editForm, setEditForm] = useState<TaskFormData>({
    title: task?.title || '',
    description: task?.description || '',
    reporter: task?.reporter || '',
  })

  if (!task) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Task Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The task you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate({ to: '/' })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Button>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    if (!editForm.title.trim() || !editForm.reporter.trim()) {
      return
    }

    todoActions.updateTask(task.id, {
      title: editForm.title.trim(),
      description: editForm.description?.trim() || undefined,
      reporter: editForm.reporter.trim(),
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      title: task.title,
      description: task.description || '',
      reporter: task.reporter,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      todoActions.deleteTask(task.id)
      navigate({ to: '/' })
    }
  }

  const handleToggleCompletion = () => {
    todoActions.toggleTaskCompletion(task.id)
  }

  const formattedCreatedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(task.createdAt)

  const formattedUpdatedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(task.updatedAt)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title *</Label>
                  <Input
                    id="edit-title"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="text-lg font-semibold"
                  />
                </div>
              ) : (
                <CardTitle className="text-2xl">{task.title}</CardTitle>
              )}
              <div className="flex items-center gap-2">
                <Badge variant={task.completed ? 'secondary' : 'default'}>
                  {task.completed ? 'Completed' : 'Open'}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleCompletion}
                >
                  {task.completed ? 'Mark as Open' : 'Mark as Completed'}
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={
                      !editForm.title.trim() || !editForm.reporter.trim()
                    }
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              DESCRIPTION
            </Label>
            {isEditing ? (
              <Textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter task description..."
                rows={4}
                className="mt-2"
              />
            ) : (
              <p className="mt-2 text-sm leading-relaxed">
                {task.description || 'No description provided.'}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              REPORTER
            </Label>
            {isEditing ? (
              <Input
                value={editForm.reporter}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, reporter: e.target.value }))
                }
                className="mt-2"
              />
            ) : (
              <p className="mt-2 text-sm font-medium">{task.reporter}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                CREATED
              </Label>
              <p className="mt-1 text-sm">{formattedCreatedDate}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                LAST UPDATED
              </Label>
              <p className="mt-1 text-sm">{formattedUpdatedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
