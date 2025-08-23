import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useStore } from '@tanstack/react-store'
import { todoStore, todoActions } from '@/lib/todo-store'

export function SearchBar() {
  const searchQuery = useStore(todoStore, (state) => state.searchQuery)

  const handleClear = () => {
    todoActions.setSearchQuery('')
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        value={searchQuery}
        onChange={(e) => todoActions.setSearchQuery(e.target.value)}
        placeholder="Search tasks by title..."
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
