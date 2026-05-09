import { Link } from 'react-router-dom'
import { BookOpen, Clock, Award, Flame, ChevronRight, Play, Star } from 'lucide-react'
import { Card, CardContent, Badge, ProgressBar, Button } from '../components/ui'
import { courses, progressData } from '../data/mockData'

const upcomingExams = [
  { id: 1, title: 'Math Final Exam', month: 'FEB', day: '12', time: '10:00 AM' },
  { id: 2, title: 'Science Quiz', month: 'FEB', day: '15', time: '02:00 PM' },
  { id: 3, title: 'ML Assessment', month: 'FEB', day: '20', time: '11:00 AM' },
]

export default function Dashboard() {
  const { stats } = progressData
  const ongoingCourses = courses.filter(c => c.progress > 0 && !c.completed)
  const recommended = courses.filter(c => c.progress === 0).slice(0, 3)

  const statCards = [
    { label: 'Enrolled', value: stats.totalEnrolled, icon: BookOpen, sub: 'Active courses' },
    { label: 'Completed', value: stats.completed, icon: Award, sub: 'Certificates earned' },
    { label: 'Hours Learned', value: `${stats.hoursLearned}h`, icon: Clock, sub: 'Total study time' },
    { label: 'Day Streak', value: stats.streak, icon: Flame, sub: 'Days in a row' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-black">Welcome back, Alex</h1>
        <p className="text-gray-500 text-sm mt-0.5">You have 2 assignments due this week. Stay focused.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map(({ label, value, icon: Icon, sub }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="text-2xl font-bold text-black mt-0.5">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-black">Ongoing Courses</h2>
              <Link to="/courses" className="text-xs text-gray-500 hover:text-black font-medium flex items-center gap-0.5">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {ongoingCourses.map(course => (
                <Card key={course.id} className="overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-xs text-black line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{course.instructor}</p>
                    <div className="mt-2.5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Progress</span>
                        <span className="font-semibold text-black">{course.progress}%</span>
                      </div>
                      <ProgressBar value={course.progress} />
                    </div>
                    {course.dueIn && (
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />Due in {course.dueIn}
                      </p>
                    )}
                    <Link to={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm" className="w-full mt-3 gap-1.5 text-xs">
                        <Play className="w-3 h-3" />Continue
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-black">Recommended for You</h2>
              <Link to="/courses" className="text-xs text-gray-500 hover:text-black font-medium flex items-center gap-0.5">
                Explore <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {recommended.map(course => (
                <Card key={course.id}>
                  <CardContent className="p-3.5">
                    <div className="flex gap-3">
                      <img src={course.thumbnail} alt={course.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-xs text-black line-clamp-1">{course.title}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">{course.instructor}</p>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">{course.level}</Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs text-gray-400 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-black text-black" />{course.rating}
                          </span>
                          <span className="text-xs text-gray-400">{course.duration}</span>
                          <Link to={`/courses/${course.id}`} className="ml-auto">
                            <Button size="sm" className="text-xs h-6 px-2.5">Enroll</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-sm font-semibold text-black mb-3">Upcoming Exams</h2>
              <div className="space-y-2.5">
                {upcomingExams.map(exam => (
                  <div key={exam.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-400 leading-none font-medium">{exam.month}</span>
                      <span className="text-sm font-bold text-black leading-none">{exam.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-black">{exam.title}</p>
                      <p className="text-xs text-gray-400">{exam.time}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-sm font-semibold text-black mb-3">Quick Access</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { to: '/quiz/1', label: 'Take Quiz' },
                  { to: '/resources', label: 'Resources' },
                  { to: '/certificate/4', label: 'Certificate' },
                  { to: '/forum', label: 'Forum' },
                ].map(({ to, label }) => (
                  <Link key={to} to={to}>
                    <Button variant="outline" size="sm" className="w-full text-xs">{label}</Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-sm font-semibold text-black mb-2">Scholarship Status</h2>
              <div className="space-y-2.5">
                {[
                  { name: 'Future Fund', amount: '$2,500', status: 'In Progress', due: 'Mar 15, 2024' },
                  { name: 'STEM Grant', amount: '$5,000', status: 'Applied', due: 'Mar 25, 2024' },
                ].map(s => (
                  <div key={s.name} className="p-2.5 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-black">{s.name}</span>
                      <span className="text-xs font-bold text-black">{s.amount}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant={s.status === 'Applied' ? 'success' : 'secondary'} className="text-xs">{s.status}</Badge>
                      <span className="text-xs text-gray-400">Due {s.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}