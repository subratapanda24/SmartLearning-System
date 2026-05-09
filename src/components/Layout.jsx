import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}