import { Link } from '@tanstack/react-router'
import { CheckSquare } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <CheckSquare className="h-6 w-6 text-primary" />
            Super Todo
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors"
              activeProps={{ className: 'text-primary' }}
            >
              Tasks
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
