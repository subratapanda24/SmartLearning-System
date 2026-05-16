import { useState } from 'react';
import { HiOutlineStar, HiOutlineAcademicCap, HiOutlineUsers, HiOutlineArrowLeft } from 'react-icons/hi2';
import { teachers } from '../data/teachers';
import { courses } from '../data/courses';
import PageTransition from '../components/layout/PageTransition';

export default function TeacherProfiles() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  if (selectedTeacher) {
    const t = selectedTeacher;
    const teacherCourses = courses.filter(c => c.instructorId === t.id);
    return (
      <PageTransition>
        <div className="page-header">
          <button className="btn btn-ghost" onClick={() => setSelectedTeacher(null)} style={{ marginBottom: 8 }}>
            <HiOutlineArrowLeft style={{ fontSize: 14 }} /> Back to Instructors
          </button>
        </div>

        <div className="grid-2">
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="teacher-avatar" style={{ width: 100, height: 100, fontSize: 0, overflow: 'hidden' }}>
              <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 style={{ fontSize: 22, marginBottom: 4 }}>{t.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>{t.title}</p>

            <div className="teacher-stats" style={{ marginBottom: 20 }}>
              <div className="ts-item">
                <span className="ts-value" style={{ color: 'var(--warning)' }}>{t.rating}</span>
                <span className="ts-label">Rating</span>
              </div>
              <div className="ts-item">
                <span className="ts-value">{t.students.toLocaleString()}</span>
                <span className="ts-label">Students</span>
              </div>
              <div className="ts-item">
                <span className="ts-value">{t.courses}</span>
                <span className="ts-label">Courses</span>
              </div>
              <div className="ts-item">
                <span className="ts-value">{t.experience}</span>
                <span className="ts-label">Experience</span>
              </div>
            </div>

            <div className="teacher-expertise" style={{ marginBottom: 20 }}>
              {t.expertise.map(skill => (
                <span key={skill} className="badge badge-accent">{skill}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, marginBottom: 12 }}>About</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{t.bio}</p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: 16, marginBottom: 16 }}>Courses ({teacherCourses.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {teacherCourses.map(c => (
                  <div key={c.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                    background: 'var(--bg-input)', borderRadius: 'var(--radius-md)'
                  }}>
                    <img src={c.thumbnail} alt={c.title} style={{ width: 40, height: 30, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 500 }}>{c.title}</h4>
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{c.students.toLocaleString()} students • {c.level}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--warning)', fontSize: 13 }}>
                      <HiOutlineStar /> {c.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="page-header">
        <h1>Instructors</h1>
        <p>Learn from industry experts and experienced educators</p>
      </div>

      <div className="grid-4">
        {teachers.map((teacher, i) => (
          <div
            key={teacher.id}
            className="teacher-card animate-in"
            style={{ cursor: 'pointer', animationDelay: `${i * 0.08}s` }}
            onClick={() => setSelectedTeacher(teacher)}
          >
            <div className="teacher-avatar" style={{ overflow: 'hidden' }}><img src={teacher.avatar} alt={teacher.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <h3>{teacher.name}</h3>
            <p className="teacher-title">{teacher.title}</p>
            <div className="teacher-stats">
              <div className="ts-item">
                <span className="ts-value" style={{ color: 'var(--warning)' }}>{teacher.rating}</span>
                <span className="ts-label">Rating</span>
              </div>
              <div className="ts-item">
                <span className="ts-value">{teacher.students.toLocaleString()}</span>
                <span className="ts-label">Students</span>
              </div>
            </div>
            <div className="teacher-expertise">
              {teacher.expertise.slice(0, 3).map(skill => (
                <span key={skill} className="badge" style={{ fontSize: 11 }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
