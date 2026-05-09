import { Bell, Menu, X } from 'lucide-react'
import { Input } from './ui'

export default function Navbar({ onMenuToggle, isOpen }) {
  return (
    <header className="h-13 border-b border-gray-200 bg-white flex items-center px-4 gap-3 sticky top-0 z-10 shrink-0" style={{ height: '52px' }}>
      <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors" onClick={onMenuToggle}>
        {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
      </button>

      <div className="flex-1 max-w-sm">
        <Input
          placeholder="Search courses, materials..."
          className="h-8 text-xs border-gray-200 bg-gray-50 focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-black leading-none">Alex Johnson</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-none">Premium Student</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
            alt="Alex Johnson"
            className="w-7 h-7 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>
    </header>
  )
}