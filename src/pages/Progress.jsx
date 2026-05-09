
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BookOpen, Clock, Award, Flame, TrendingUp, CheckCircle } from 'lucide-react'
import { Card, CardContent, Badge, ProgressBar } from '../components/ui'
import { courses, progressData } from '../data/mockData'

export default function ProgressPage() {
  const { stats, weeklyHours, monthlyProgress } = progressData

  const statCards = [
    { label: 'Enrolled', value: stats.totalEnrolled, icon: BookOpen, sub: 'courses' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, sub: 'finished' },
    { label: 'Hours', value: `${stats.hoursLearned}h`, icon: Clock, sub: 'total time' },
    { label: 'Streak', value: stats.streak, icon: Flame, sub: 'days' },
    { label: 'Avg Score', value: `${stats.avgScore}%`, icon: TrendingUp, sub: 'quiz avg' },
    { label: 'Certs', value: stats.certificates, icon: Award, sub: 'earned' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-black">Learning Progress</h1>
        <p className="text-gray-500 text-sm mt-0.5">Track your learning journey and achievements</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {statCards.map(({ label, value, icon: Icon, sub }) => (
          <Card key={label}>
            <CardContent className="p-3.5 text-center">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-1.5">
                <Icon className="w-3.5 h-3.5 text-black" />
              </div>
              <p className="text-lg font-bold text-black">{value}</p>
              <p className="text-xs font-medium text-black leading-none">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <h2 className="font-semibold text-black mb-4 text-sm">Weekly Study Hours</h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyHours} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: 'none', fontSize: 12 }}
                  formatter={v => [`${v}h`, 'Hours']}
                />
                <Bar dataKey="hours" fill="#000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="font-semibold text-black mb-4 text-sm">Monthly Lessons Completed</h2>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyProgress} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: 'none', fontSize: 12 }}
                  formatter={v => [v, 'Lessons']}
                />
                <Line type="monotone" dataKey="lessons" stroke="#000" strokeWidth={2} dot={{ fill: '#000', r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="font-semibold text-black mb-4 text-sm">Course Progress</h2>
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course.id} className="flex items-center gap-3">
                <img src={course.thumbnail} alt={course.title} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-black line-clamp-1">{course.title}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-black">{course.progress}%</span>
                      {course.completed && <Badge className="bg-green-600 text-white">Done</Badge>}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{course.instructor}</p>
                  <ProgressBar value={course.progress} className="mt-1.5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

