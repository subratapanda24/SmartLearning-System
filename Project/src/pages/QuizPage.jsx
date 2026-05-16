import { useState, useMemo } from 'react';
import { HiOutlineCheck, HiOutlineXMark, HiOutlineArrowRight, HiOutlineTrophy, HiOutlineHandThumbUp, HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineArrowLeft } from 'react-icons/hi2';
import { courses } from '../data/courses';
import { quizzes } from '../data/quizzes';
import PageTransition from '../components/layout/PageTransition';

export default function QuizPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const quiz = useMemo(() => {
    if (!selectedCourse) return null;
    return quizzes.find(q => q.courseId === selectedCourse);
  }, [selectedCourse]);

  const handleSelect = (idx) => {
    if (submitted) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setAnswers(prev => [...prev, selected]);
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedCourse(null);
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setAnswers([]);
    setSubmitted(false);
  };

  const score = useMemo(() => {
    if (!quiz) return 0;
    return answers.reduce((acc, ans, i) => {
      return acc + (ans === quiz.questions[i]?.correct ? 1 : 0);
    }, 0);
  }, [answers, quiz]);

  if (!selectedCourse) {
    return (
      <PageTransition>
        <div className="page-header">
          <h1>Interactive Quizzes</h1>
          <p>Test your knowledge with course-specific quizzes</p>
        </div>
        <div className="grid-3">
          {quizzes.map((q, i) => {
            const course = courses.find(c => c.id === q.courseId);
            return (
              <div
                key={q.id}
                className="card animate-in"
                style={{ cursor: 'pointer', animationDelay: `${i * 0.08}s` }}
                onClick={() => setSelectedCourse(q.courseId)}
              >
                <img src={course?.thumbnail} alt={course?.title} style={{ width: 56, height: 42, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <h3 style={{  fontSize: 16, marginBottom: 6 }}>{q.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                  {q.questions.length} questions • {course?.level}
                </p>
                <button className="btn btn-primary" style={{ width: '100%' }}>Start Quiz</button>
              </div>
            );
          })}
        </div>
      </PageTransition>
    );
  }

  if (showResult) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    return (
      <PageTransition>
        <div className="quiz-container">
          <div className="quiz-question-card quiz-result">
            <div className="score-circle" style={{
              borderColor: pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--warning)' : 'var(--error)'
            }}>
              <span className="score-value">{pct}%</span>
              <span className="score-label">Score</span>
            </div>
            <h2 style={{ marginBottom: 8 }}>
              {pct >= 70 ? <><HiOutlineTrophy style={{ fontSize: 20 }} /> Excellent!</> : pct >= 40 ? <><HiOutlineHandThumbUp style={{ fontSize: 20 }} /> Good effort!</> : <><HiOutlineAcademicCap style={{ fontSize: 20 }} /> Keep practicing!</>}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
              You got {score} out of {quiz.questions.length} questions correct
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={resetQuiz}>Back to Quizzes</button>
              <button className="btn btn-primary" onClick={() => {
                setShowResult(false);
                setCurrentQ(0);
                setSelected(null);
                setSubmitted(false);
                setAnswers([]);
              }}>Retry Quiz</button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  const question = quiz.questions[currentQ];

  return (
    <PageTransition>
      <div className="quiz-container">
        <div className="quiz-progress-header">
          <button className="btn btn-ghost" onClick={resetQuiz}><HiOutlineArrowLeft style={{ fontSize: 14 }} /> Back</button>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Question {currentQ + 1} of {quiz.questions.length}
          </span>
          <span className="badge badge-accent">
            <HiOutlineTrophy style={{ marginRight: 4 }} /> {score}/{currentQ}
          </span>
        </div>

        <div className="progress-bar" style={{ marginBottom: 24 }}>
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }} />
        </div>

        <div className="quiz-question-card">
          <h3>{question.question}</h3>
          <div className="quiz-options">
            {question.options.map((opt, idx) => {
              let className = 'quiz-option';
              if (submitted) {
                if (idx === question.correct) className += ' correct';
                else if (idx === selected) className += ' incorrect';
              } else if (idx === selected) {
                className += ' selected';
              }
              return (
                <div key={idx} className={className} onClick={() => handleSelect(idx)}>
                  <div className="quiz-option-marker">
                    {submitted && idx === question.correct ? <HiOutlineCheck /> :
                     submitted && idx === selected && idx !== question.correct ? <HiOutlineXMark /> :
                     String.fromCharCode(65 + idx)}
                  </div>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>

          {submitted && (
            <div className="quiz-explanation">
              <HiOutlineLightBulb style={{ fontSize: 16 }} /> {question.explanation}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          {!submitted ? (
            <button className="btn btn-primary" onClick={handleSubmit} disabled={selected === null}>
              Submit Answer
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleNext}>
              {currentQ < quiz.questions.length - 1 ? (
                <>Next <HiOutlineArrowRight /></>
              ) : (
                'See Results'
              )}
            </button>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
