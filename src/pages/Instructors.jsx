import { useState } from 'react'
import { Star, Users, BookOpen, X, GraduationCap } from 'lucide-react'
import { Card, CardContent, Button, Badge } from '../components/ui'
import { instructors, courses } from '../data/mockData'
import { Link } from 'react-router-dom'

export default function Instructors() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-black">Instructors</h1>
        <p className="text-gray-500 text-sm mt-0.5">Meet our expert educators</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {instructors.map(inst => {
          const instCourses = courses.filter(c => c.instructorId === inst.id)
          return (
            <Card key={inst.id} className="hover:border-gray-300 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start gap-3.5">
                  <img src={inst.photo} alt={inst.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-black text-sm">{inst.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{inst.title}</p>
                    <p className="text-xs text-gray-400">{inst.department}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-black text-black" />{inst.rating}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{inst.students.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{inst.courses} courses</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {inst.expertise.slice(0, 3).map(e => <Badge key={e} variant="secondary">{e}</Badge>)}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">{inst.bio}</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1.5">Teaching</p>
                  {instCourses.slice(0, 2).map(c => (
                    <div key={c.id} className="flex items-center gap-1.5 mb-1">
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-xs text-gray-600 line-clamp-1">{c.title}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => setSelected(inst)}>
                  View Full Profile
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <Card className="max-w-md w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-black">Instructor Profile</h2>
                <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
              </div>
              <div className="text-center mb-4">
                <img src={selected.photo} alt={selected.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 mx-auto" />
                <h3 className="text-base font-bold text-black mt-2.5">{selected.name}</h3>
                <p className="text-gray-500 text-xs">{selected.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{selected.department}</p>
              </div>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {[
                  { label: 'Rating', value: selected.rating, icon: Star },
                  { label: 'Students', value: selected.students.toLocaleString(), icon: Users },
                  { label: 'Courses', value: selected.courses, icon: BookOpen },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="text-center p-2.5 bg-gray-50 rounded-xl">
                    <Icon className="w-3.5 h-3.5 mx-auto text-gray-500 mb-1" />
                    <p className="font-bold text-black text-sm">{value}</p>
                    <p className="text-xs text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3.5">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">About</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.bio}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Education</p>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{selected.education}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Expertise</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.expertise.map(e => <Badge key={e} variant="secondary">{e}</Badge>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Courses</p>
                  <div className="space-y-2">
                    {courses.filter(c => c.instructorId === selected.id).map(c => (
                      <Link key={c.id} to={`/app/courses/${c.id}`} onClick={() => setSelected(null)}>
                        <div className="flex items-center gap-2.5 p-2.5 border border-gray-100 rounded-lg hover:border-gray-300 transition-colors">
                          <img src={c.thumbnail} alt={c.title} className="w-9 h-7 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-black line-clamp-1">{c.title}</p>
                            <p className="text-xs text-gray-400">{c.enrolled.toLocaleString()} students</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => setSelected(null)}>Close</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}