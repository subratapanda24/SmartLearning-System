import { useState } from 'react'
import { Download, FileText, FileSpreadsheet, Archive, Search } from 'lucide-react'
import { Card, CardContent, Badge, Button, Input } from '../components/ui'
import { resources } from '../data/mockData'

const typeIcon = { PDF: FileText, XLSX: FileSpreadsheet, ZIP: Archive }
const typeColor = { PDF: 'text-red-500', XLSX: 'text-green-600', ZIP: 'text-yellow-600' }

export default function Resources() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = resources.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = r.title.toLowerCase().includes(q) || r.course.toLowerCase().includes(q)
    const matchType = filter === 'All' || r.type === filter
    return matchSearch && matchType
  })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-black">Study Resources</h1>
        <p className="text-gray-500 text-sm mt-0.5">Download course materials, guides, and reference sheets</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Files', value: resources.length },
          { label: 'Courses', value: new Set(resources.map(r => r.courseId)).size },
          { label: 'File Types', value: new Set(resources.map(r => r.type)).size },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-black">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search resources..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['All', 'PDF', 'XLSX', 'ZIP'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === t ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(resource => {
          const Icon = typeIcon[resource.type] || FileText
          return (
            <Card key={resource.id} className="hover:border-gray-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-4 h-4 ${typeColor[resource.type] || 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-black">{resource.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{resource.course} — {resource.date}</p>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <Badge variant="outline">{resource.type}</Badge>
                    <span className="text-xs text-gray-400 hidden sm:block">{resource.size}</span>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => alert(`Downloading: ${resource.title}`)}>
                      <Download className="w-3 h-3" />Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
