import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Play, Pause, Volume2, Maximize, CheckCircle, Circle, Clock, ChevronLeft, SkipBack, SkipForward } from 'lucide-react'
import { Card, CardContent, Button, Badge } from '../components/ui'
import { courses } from '../data/mockData'

export default function VideoPlayer() {
  const { id, lessonId } = useParams()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  const course = courses.find(c => c.id === Number(id))
  const lesson = course?.lessons.find(l => l.id === Number(lessonId))
  const lessonIdx = course?.lessons.findIndex(l => l.id === Number(lessonId))

  if (!course || !lesson) return (
    <div className="text-center py-20">
      <p className="text-gray-400 text-sm">Lesson not found.</p>
      <Link to="/courses"><Button className="mt-4">Back to Courses</Button></Link>
    </div>
  )

  const prevLesson = lessonIdx > 0 ? course.lessons[lessonIdx - 1] : null
  const nextLesson = lessonIdx < course.lessons.length - 1 ? course.lessons[lessonIdx + 1] : null

  return (
    <div className="space-y-4">
      <Link to={`/courses/${id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black font-medium">
        <ChevronLeft className="w-4 h-4" />Back to {course.title}
      </Link>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <div className="relative w-full h-full">
              <img
                src={course.thumbnail}
                alt={lesson.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-40' : 'opacity-100'}`}
              />
              {!playing && (
                <button className="absolute inset-0 flex items-center justify-center" onClick={() => setPlaying(true)}>
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 text-black ml-0.5" />
                  </div>
                </button>
              )}
              {playing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">{lesson.title}</p>
                    <p className="text-gray-300 text-xs mt-1">Now Playing</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div
                  className="h-1 bg-white/30 rounded-full mb-3 cursor-pointer group"
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100))
                  }}
                >
                  <div className="h-full bg-white rounded-full relative" style={{ width: `${progress}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button onClick={() => setPlaying(!playing)} className="text-white hover:text-gray-300">
                    {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  {prevLesson && (
                    <Link to={`/courses/${id}/video/${prevLesson.id}`}>
                      <SkipBack className="w-4 h-4 text-white hover:text-gray-300" />
                    </Link>
                  )}
                  {nextLesson && (
                    <Link to={`/courses/${id}/video/${nextLesson.id}`}>
                      <SkipForward className="w-4 h-4 text-white hover:text-gray-300" />
                    </Link>
                  )}
                  <span className="text-white text-xs ml-1">{progress}%</span>
                  <div className="ml-auto flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-white" />
                    <Maximize className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-bold text-black text-sm">{lesson.title}</h1>
                  <p className="text-xs text-gray-400 mt-0.5">{course.title} — Lesson {lessonIdx + 1} of {course.lessons.length}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400">{lesson.duration}</span>
                    {lesson.completed && <Badge className="bg-green-600 text-white">Completed</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {prevLesson && (
                    <Link to={`/courses/${id}/video/${prevLesson.id}`}>
                      <Button variant="outline" size="sm" className="gap-1"><SkipBack className="w-3 h-3" />Prev</Button>
                    </Link>
                  )}
                  {nextLesson && (
                    <Link to={`/courses/${id}/video/${nextLesson.id}`}>
                      <Button size="sm" className="gap-1">Next<SkipForward className="w-3 h-3" /></Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardContent className="p-4">
            <h2 className="font-semibold text-black text-sm mb-3">Course Content</h2>
            <div className="space-y-0.5">
              {course.lessons.map((l, idx) => (
                <Link
                  key={l.id}
                  to={`/courses/${id}/video/${l.id}`}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg transition-colors ${l.id === Number(lessonId) ? 'bg-black' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex-shrink-0">
                    {l.completed
                      ? <CheckCircle className={`w-3.5 h-3.5 ${l.id === Number(lessonId) ? 'text-white' : 'text-black'}`} />
                      : <Circle className={`w-3.5 h-3.5 ${l.id === Number(lessonId) ? 'text-white/40' : 'text-gray-300'}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium line-clamp-1 ${l.id === Number(lessonId) ? 'text-white' : 'text-black'}`}>
                      {idx + 1}. {l.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${l.id === Number(lessonId) ? 'text-white/60' : 'text-gray-400'}`}>{l.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}