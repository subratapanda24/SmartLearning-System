import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function Button({ className, variant = 'default', size = 'default', children, ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none'
  const variants = {
    default: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
    outline: 'border border-gray-300 bg-white text-black hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100',
    ghost: 'bg-transparent text-black hover:bg-gray-100 active:bg-gray-200',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200 active:bg-gray-300',
  }
  const sizes = {
    default: 'px-4 py-2 text-sm h-9',
    sm: 'px-3 py-1.5 text-xs h-7',
    lg: 'px-6 py-3 text-base h-11',
    icon: 'p-2 h-9 w-9',
  }
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

export function Card({ className, children, ...props }) {
  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('p-5 pb-3', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-sm font-semibold text-black', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('p-5 pt-0', className)} {...props}>
      {children}
    </div>
  )
}

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-black text-white',
    secondary: 'bg-gray-100 text-gray-700',
    outline: 'border border-gray-300 text-gray-600 bg-white',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function ProgressBar({ value = 0, className, ...props }) {
  return (
    <div className={cn('h-1.5 w-full rounded-full bg-gray-100', className)} {...props}>
      <div
        className="h-full rounded-full bg-black transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'flex h-9 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors',
        className
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors resize-none',
        className
      )}
      {...props}
    />
  )
}