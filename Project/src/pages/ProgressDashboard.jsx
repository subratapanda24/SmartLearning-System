import { HiOutlineAcademicCap, HiOutlineClock, HiOutlineFire, HiOutlineTrophy } from 'react-icons/hi2';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { courses } from '../data/courses';
import PageTransition from '../components/layout/PageTransition';

const weeklyData = [
  { day: 'Mon', hours: 2.5 }, { day: 'Tue', hours: 3.2 }, { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.0 }, { day: 'Fri', hours: 2.1 }, { day: 'Sat', hours: 5.5 },
  { day: 'Sun', hours: 3.8 },
];

const quizScores = [
  { quiz: 'React', score: 85 }, { quiz: 'Python', score: 92 },
  { quiz: 'UI/UX', score: 78 }, { quiz: 'ML', score: 70 },
  { quiz: 'JS Adv', score: 88 },
];

const courseProgress = courses.map(c => ({ name: c.title.split(' ').slice(0, 2).join(' '), progress: c.progress }));

const COLORS = ['#8b5cf6', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1e1e30', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, padding: '10px 14px', fontSize: 13
      }}>
        <p style={{ color: '#f0f0f5', fontWeight: 500, marginBottom: 4 }}>{label}</p>
        <p style={{ color: '#8b5cf6' }}>{payload[0].value} {payload[0].name === 'hours' ? 'hours' : '%'}</p>
      </div>
    );
  }
  return null;
};

export default function ProgressDashboard() {
  const totalHours = weeklyData.reduce((a, b) => a + b.hours, 0).toFixed(1);
  const avgScore = Math.round(quizScores.reduce((a, b) => a + b.score, 0) / quizScores.length);
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const streak = 12;

  return (
    <PageTransition>
      <div className="page-header">
        <h1>Progress Dashboard</h1>
        <p>Track your learning journey and achievements</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { icon: <HiOutlineClock />, value: `${totalHours}h`, label: 'This Week', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
          { icon: <HiOutlineTrophy />, value: `${avgScore}%`, label: 'Avg Quiz Score', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
          { icon: <HiOutlineFire />, value: `${streak}`, label: 'Day Streak', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
          { icon: <HiOutlineAcademicCap />, value: `${completedCourses}/${courses.length}`, label: 'Courses Done', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
        ].map((stat, i) => (
          <div key={i} className="stat-card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 20 }}>Weekly Study Hours</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#636980" fontSize={12} />
              <YAxis stroke="#636980" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="hours" stroke="#8b5cf6" fill="url(#colorHours)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16, marginBottom: 20 }}>Quiz Scores</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={quizScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="quiz" stroke="#636980" fontSize={12} />
              <YAxis stroke="#636980" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {quizScores.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, marginBottom: 20 }}>Course Progress</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {courses.map((course, i) => (
            <div key={course.id} className="animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={course.thumbnail} alt={course.title} style={{ width: 32, height: 24, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} /> {course.title}
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{course.progress}%</span>
              </div>
              <div className="progress-bar" style={{ height: 8 }}>
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%`, background: course.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
