import { Link } from '@tanstack/react-router'
import { CheckCircle, Circle, User, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Task } from '@/lib/types'
import { todoActions } from '@/lib/todo-store'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const handleToggleCompletion = () => {
    todoActions.toggleTaskCompletion(task.id)
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(task.createdAt)

  return (
    <Card
      className={cn('transition-all hover:shadow-md', {
        'opacity-75 bg-muted/50': task.completed,
      })}
      data-testid="task-card"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              data-testid="task-card-toggle-completion"
              onClick={handleToggleCompletion}
              className="p-0 h-6 w-6"
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
            <CardTitle
              data-testid="task-card-title"
              className={cn('text-lg', {
                'line-through text-muted-foreground': task.completed,
              })}
            >
              <Link
                to="/task/$taskId"
                params={{ taskId: task.id }}
                className="hover:underline"
              >
                {task.title}
              </Link>
            </CardTitle>
          </div>
          <Badge
            variant={task.completed ? 'secondary' : 'default'}
            data-testid="task-card-status"
          >
            {task.completed ? 'Completed' : 'Open'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {task.description && (
          <p
            className={cn('text-sm text-muted-foreground mb-3', {
              'line-through': task.completed,
            })}
          >
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{task.reporter}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
