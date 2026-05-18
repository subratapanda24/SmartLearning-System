import { HiOutlineTrophy, HiOutlineArrowDownTray, HiOutlineCalendar } from 'react-icons/hi2';
import { courses } from '../data/courses';
import PageTransition from '../components/layout/PageTransition';

const earnedCertificates = [
  {
    id: 1,
    courseId: 1,
    courseName: "Introduction to React",
    completedDate: "2025-12-15",
    score: 92,
    credential: "SL-REACT-2025-001"
  }
];

const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);

export default function Certificates() {
  return (
    <PageTransition>
      <div className="page-header">
        <h1>Certificates</h1>
        <p>Your earned credentials and upcoming achievements</p>
      </div>

      <h2 style={{ fontSize: 18, marginBottom: 16 }}>🏆 Earned Certificates</h2>
      {earnedCertificates.length > 0 ? (
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {earnedCertificates.map((cert, i) => (
            <div key={cert.id} className="certificate-card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="certificate-badge">🏅</div>
              <h3>{cert.courseName}</h3>
              <p className="cert-date">
                <HiOutlineCalendar style={{ verticalAlign: 'middle', marginRight: 4 }} />
                {new Date(cert.completedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
                <span className="badge badge-success">Score: {cert.score}%</span>
                <span className="badge">{cert.credential}</span>
              </div>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => alert('Certificate downloaded! (Demo)')}>
                <HiOutlineArrowDownTray /> Download Certificate
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: 40, marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
          <h3>No certificates yet</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Complete a course to earn your first certificate!</p>
        </div>
      )}

      <h2 style={{ fontSize: 18, marginBottom: 16 }}>📈 In Progress</h2>
      <div className="grid-3">
        {inProgressCourses.map((course, i) => (
          <div key={course.id} className="card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img src={course.thumbnail} alt={course.title} style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
              <div>
                <h3 style={{ fontSize: 15 }}>{course.title}</h3>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{course.instructor}</span>
              </div>
            </div>
            <div className="progress-bar" style={{ marginBottom: 8, height: 8 }}>
              <div className="progress-fill" style={{ width: `${course.progress}%`, background: course.color }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-tertiary)' }}>
              <span>{course.progress}% complete</span>
              <span>{100 - course.progress}% remaining</span>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
