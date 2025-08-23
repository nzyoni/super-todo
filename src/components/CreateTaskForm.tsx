import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { todoActions } from '@/lib/todo-store'
import type { TaskFormData } from '@/lib/types'

interface CreateTaskFormProps {
  onTaskCreated?: () => void
}

export function CreateTaskForm({ onTaskCreated }: CreateTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    reporter: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.reporter.trim()) {
      return
    }

    todoActions.createTask({
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined,
      reporter: formData.reporter.trim(),
    })

    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      reporter: '',
    })

    setIsOpen(false)
    onTaskCreated?.()
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      reporter: '',
    })
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Reset form when dialog closes
      setFormData({
        title: '',
        description: '',
        reporter: '',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Create New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your todo list. Fill in the required fields below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter task title..."
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter task description (optional)..."
                className="col-span-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reporter" className="text-right">
                Reporter *
              </Label>
              <Input
                id="reporter"
                value={formData.reporter}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, reporter: e.target.value }))
                }
                placeholder="Enter reporter name..."
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.title.trim() || !formData.reporter.trim()}
            >
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
