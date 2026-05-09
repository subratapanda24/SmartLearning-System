import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, BarChart2, MessageSquare,
  Download, Users, Settings, HelpCircle, LogOut,
} from 'lucide-react'
import { cn } from '../lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/progress', icon: BarChart2, label: 'Progress' },
  { to: '/forum', icon: MessageSquare, label: 'Discussion' },
  { to: '/resources', icon: Download, label: 'Resources' },
  { to: '/instructors', icon: Users, label: 'Instructors' },
]

const bottomItems = [
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/help', icon: HelpCircle, label: 'Help Center' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-52 bg-white border-r border-gray-200 z-30 flex flex-col transition-transform duration-200',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-100">
          <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-black text-sm tracking-tight">SmartLearn</span>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                )
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-4 pt-3 border-t border-gray-100 space-y-0.5">
          {bottomItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-black transition-colors w-full text-left">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}