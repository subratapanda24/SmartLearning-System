import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiOutlinePlay, HiOutlinePause, HiOutlineCheck, HiOutlineArrowLeft, HiOutlineDocumentText } from 'react-icons/hi2';
import { courses } from '../data/courses';
import AIStudyBuddy from '../components/ai/AIStudyBuddy';
import PageTransition from '../components/layout/PageTransition';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const course = courses.find(c => c.id === parseInt(courseId));
  const [activeLessonIdx, setActiveLessonIdx] = useState(lessonId ? parseInt(lessonId) - 1 : 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const lesson = course?.lessons[activeLessonIdx];

  useEffect(() => {
    let interval;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => Math.min(p + 0.5, 100));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
  }, [activeLessonIdx]);

  if (!course) {
    return (
      <PageTransition>
        <div className="empty-state">
          <h3>Course not found</h3>
          <Link to={`/app`} className="btn btn-primary" style={{ marginTop: 16 }}>Back to Courses</Link>
        </div>
      </PageTransition>
    );
  }

  const formatTime = (pct) => {
    const totalSec = 900;
    const current = Math.floor((pct / 100) * totalSec);
    const mm = Math.floor(current / 60);
    const ss = current % 60;
    return `${mm}:${ss.toString().padStart(2, '0')}`;
  };

  return (
    <PageTransition>
      <div className="page-header" style={{ marginBottom: 20 }}>
        <Link to={`/app`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, marginBottom: 12 }}>
          <HiOutlineArrowLeft /> Back to Courses
        </Link>
        <h1>{course.title}</h1>
        <p>{course.instructor}</p>
      </div>

      <div className="lesson-layout">
        <div className="lesson-content">
          {lesson?.type === 'video' ? (
            <>
              <div className="video-player">
                {!isPlaying && progress === 0 ? (
                  <div className="video-player-overlay">
                    <button className="video-play-btn" onClick={() => setIsPlaying(true)}>
                      <HiOutlinePlay />
                    </button>
                    <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{lesson.title}</span>
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0e0e1a, #1a1a30)' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 64, marginBottom: 8 }}><img src={course.thumbnail} alt={course.title} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 'var(--radius-md)', opacity: 0.8 }} /></div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                        {isPlaying ? 'Playing' : 'Paused'} — {lesson.title}
                      </div>
                    </div>
                  </div>
                )}
                {(isPlaying || progress > 0) && (
                  <div className="video-controls">
                    <button
                      className="btn btn-ghost"
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{ color: 'white', padding: 4 }}
                    >
                      {isPlaying ? <HiOutlinePause size={20} /> : <HiOutlinePlay size={20} />}
                    </button>
                    <div className="video-progress" onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = ((e.clientX - rect.left) / rect.width) * 100;
                      setProgress(pct);
                    }}>
                      <div className="video-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="video-time">{formatTime(progress)} / 15:00</span>
                  </div>
                )}
              </div>

              <div className="card">
                <h2 style={{ fontSize: 18, marginBottom: 12 }}>{lesson.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>
                  {lesson.content}
                </p>
              </div>
            </>
          ) : lesson?.type === 'quiz' ? (
            <div className="card" style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}><HiOutlineDocumentText style={{ fontSize: 40, color: 'var(--text-tertiary)' }} /></div>
              <h2 style={{ marginBottom: 8 }}>Quiz: {course.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Test your knowledge!</p>
              <Link to={`/app/quizzes?course=${courseId}`} className="btn btn-primary btn-lg">Start Quiz</Link>
            </div>
          ) : null}

          <div className="card">
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>Lesson Progress</h3>
            <div className="lesson-list">
              {course.lessons.map((l, idx) => (
                <div
                  key={l.id}
                  className={`lesson-item ${idx === activeLessonIdx ? 'active' : ''} ${l.completed ? 'completed' : ''}`}
                  onClick={() => setActiveLessonIdx(idx)}
                >
                  <div className="lesson-check">
                    {l.completed ? <HiOutlineCheck size={14} /> : <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{idx + 1}</span>}
                  </div>
                  <div className="lesson-item-info">
                    <h4>{l.title}</h4>
                    <span>{l.duration} • {l.type === 'quiz' ? 'Quiz' : 'Video'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'sticky', top: 32, height: 'calc(100vh - 64px)' }}>
          <AIStudyBuddy lesson={lesson} courseName={course.title} />
        </div>
      </div>
    </PageTransition>
  );
}
