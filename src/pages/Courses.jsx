import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, Users } from 'lucide-react'
import { Card, CardContent, Badge, Button, Input, ProgressBar } from '../components/ui'
import { courses } from '../data/mockData'

const categories = ['All', 'Mathematics', 'Computer Science', 'Economics', 'Science', 'History']
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

export default function Courses() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [level, setLevel] = useState('All Levels')

  const filtered = courses.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
    const matchCat = category === 'All' || c.category === category
    const matchLevel = level === 'All Levels' || c.level === level
    return matchSearch && matchCat && matchLevel
  })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-black">Course Catalog</h1>
        <p className="text-gray-500 text-sm mt-0.5">Explore our expert-led courses</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search courses or instructors..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select
          className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-700"
          value={level}
          onChange={e => setLevel(e.target.value)}
        >
          {levels.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${category === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400">{filtered.length} courses found</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(course => (
          <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
              <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                <Badge variant={course.level === 'Advanced' ? 'default' : 'secondary'}>{course.level}</Badge>
              </div>
              {course.completed && (
                <div className="absolute top-2.5 right-2.5">
                  <Badge className="bg-green-600 text-white">Completed</Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{course.category}</span>
              <h3 className="font-semibold text-black mt-1 line-clamp-2 text-sm leading-snug">{course.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{course.instructor}</p>
              <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-black text-black" />{course.rating}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.enrolled.toLocaleString()}</span>
              </div>
              {course.progress > 0 && (
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="font-medium text-black">{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} />
                </div>
              )}
              <Link to={`/courses/${course.id}`}>
                <Button variant={course.progress > 0 ? 'default' : 'outline'} size="sm" className="w-full mt-3">
                  {course.completed ? 'Review Course' : course.progress > 0 ? 'Continue' : 'View Course'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}