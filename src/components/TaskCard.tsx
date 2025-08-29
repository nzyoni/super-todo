import { Link } from '@tanstack/react-router'
import { CheckCircle, Circle, User, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Task } from '@/lib/types'
import { todoActions } from '@/lib/todo-store'
import { TaskTestIds } from '../../test-ids/task'

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
      data-testid={TaskTestIds.TASK_CARD}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleCompletion}
              className="p-0 h-6 w-6"
              data-testid={TaskTestIds.TASK_TOGGLE_BUTTON}
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
            <CardTitle
              className={cn('text-lg', {
                'line-through text-muted-foreground': task.completed,
              })}
            >
              <Link
                to="/task/$taskId"
                params={{ taskId: task.id }}
                className="hover:underline"
                data-testid={TaskTestIds.TASK_TITLE}
              >
                {task.title}
              </Link>
            </CardTitle>
          </div>
          <Badge
            variant={task.completed ? 'secondary' : 'default'}
            data-testid={TaskTestIds.TASK_STATUS_BADGE}
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
            data-testid={TaskTestIds.TASK_DESCRIPTION}
          >
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span data-testid={TaskTestIds.TASK_REPORTER}>{task.reporter}</span>
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
