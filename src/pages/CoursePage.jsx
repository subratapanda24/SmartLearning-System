import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Clock, Users, Play, CheckCircle, Circle, ChevronLeft, FileText, Award } from 'lucide-react'
import { Card, CardContent, Badge, Button, ProgressBar } from '../components/ui'
import { courses, instructors, quizzes } from '../data/mockData'

const TABS = ['Overview', 'Lessons', 'Quizzes', 'Resources']

export default function CoursePage() {
  const { id } = useParams()
  const [tab, setTab] = useState('Overview')
  const course = courses.find(c => c.id === Number(id))
  const instructor = instructors.find(i => i.id === course?.instructorId)
  const courseQuizzes = quizzes.filter(q => q.courseId === Number(id))

  if (!course) return (
    <div className="text-center py-20">
      <p className="text-gray-400 text-sm">Course not found.</p>
      <Link to="/app/courses"><Button className="mt-4">Back to Courses</Button></Link>
    </div>
  )

  const completedCount = course.lessons.filter(l => l.completed).length

  return (
    <div className="space-y-5">
      <Link to="/app/courses" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black font-medium">
        <ChevronLeft className="w-4 h-4" />Back to Courses
      </Link>

      <Card className="overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-52 object-cover" />
        <CardContent className="p-5">
          <div className="flex flex-wrap items-start gap-4 justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1.5 mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                {course.completed && <Badge className="bg-green-600 text-white">Completed</Badge>}
              </div>
              <h1 className="text-lg font-bold text-black">{course.title}</h1>
              <p className="text-gray-500 text-sm mt-0.5">{course.instructor}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-black text-black" />{course.rating}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.enrolled.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-36">
              {course.progress > 0 && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="font-semibold text-black">{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} />
                  <p className="text-xs text-gray-400">{completedCount}/{course.lessons.length} lessons</p>
                </div>
              )}
              <Link to={`/app/courses/${course.id}/video/1`}>
                <Button className="w-full gap-1.5 text-sm">
                  <Play className="w-3.5 h-3.5" />
                  {course.progress > 0 ? 'Continue' : 'Start Learning'}
                </Button>
              </Link>
              {course.completed && (
                <Link to={`/app/certificate/${course.id}`}>
                  <Button variant="outline" className="w-full gap-1.5 text-sm">
                    <Award className="w-3.5 h-3.5" />View Certificate
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border-b border-gray-200">
        <div className="flex">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'Overview' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-5">
                <h2 className="font-semibold text-black mb-2">About This Course</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {course.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h2 className="font-semibold text-black mb-3">Course Overview</h2>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Lessons', value: course.lessons.length },
                    { label: 'Duration', value: course.duration },
                    { label: 'Level', value: course.level },
                    { label: 'Students', value: course.enrolled.toLocaleString() },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-base font-bold text-black">{value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {instructor && (
            <Card>
              <CardContent className="p-5">
                <h2 className="font-semibold text-black mb-3">Your Instructor</h2>
                <div className="text-center">
                  <img src={instructor.photo} alt={instructor.name} className="w-14 h-14 rounded-full object-cover mx-auto mb-2.5 border-2 border-gray-200" />
                  <h3 className="font-semibold text-sm text-black">{instructor.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{instructor.title}</p>
                  <div className="flex justify-center gap-4 mt-3 text-xs">
                    <div><span className="font-bold text-black block">{instructor.rating}</span><span className="text-gray-400">Rating</span></div>
                    <div><span className="font-bold text-black block">{instructor.students.toLocaleString()}</span><span className="text-gray-400">Students</span></div>
                    <div><span className="font-bold text-black block">{instructor.courses}</span><span className="text-gray-400">Courses</span></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-left leading-relaxed">{instructor.bio.slice(0, 120)}...</p>
                  <Link to="/app/instructors">
                    <Button variant="outline" size="sm" className="w-full mt-3">View Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {tab === 'Lessons' && (
        <div className="space-y-2">
          {course.lessons.map((lesson, idx) => (
            <Card key={lesson.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {lesson.completed
                    ? <CheckCircle className="w-4 h-4 text-black flex-shrink-0" />
                    : <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black">Lesson {idx + 1}: {lesson.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" />{lesson.duration}</p>
                  </div>
                  <Link to={`/app/courses/${course.id}/video/${lesson.id}`}>
                    <Button size="sm" variant={lesson.completed ? 'ghost' : 'outline'} className="gap-1">
                      <Play className="w-3 h-3" />{lesson.completed ? 'Replay' : 'Watch'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === 'Quizzes' && (
        <div className="space-y-3">
          {courseQuizzes.length > 0 ? courseQuizzes.map(quiz => (
            <Card key={quiz.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-black">{quiz.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{quiz.questions.length} questions</p>
                </div>
                <Link to={`/app/quiz/${quiz.id}`}><Button size="sm">Start Quiz</Button></Link>
              </CardContent>
            </Card>
          )) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-400 text-sm">No quizzes available for this course yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {tab === 'Resources' && (
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-gray-500 text-sm">Browse all downloadable resources.</p>
            <Link to="/app/resources"><Button className="mt-3">Go to Resources</Button></Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}