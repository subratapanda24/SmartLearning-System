import { useState, useCallback } from 'react';
import { courses } from '../data/courses';
import { flashcardsData } from '../data/flashcards';
import { HiOutlineArrowLeft, HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineFaceFrown, HiOutlineFaceSmile } from 'react-icons/hi2';
import PageTransition from '../components/layout/PageTransition';

export default function Flashcards() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [cardSets, setCardSets] = useState(flashcardsData);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const currentSet = cardSets.find(s => s.courseId === selectedCourse);
  const cards = currentSet?.cards || [];
  const currentCard = cards[currentIdx];

  const handleDifficulty = useCallback((difficulty) => {
    if (!currentSet) return;

    const intervals = { easy: 7, medium: 3, hard: 1 };
    const newInterval = intervals[difficulty];
    const now = new Date();
    const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

    setCardSets(prev => prev.map(set => {
      if (set.courseId !== selectedCourse) return set;
      return {
        ...set,
        cards: set.cards.map((c, i) =>
          i === currentIdx
            ? { ...c, difficulty, interval: newInterval, nextReview: nextReview.toISOString() }
            : c
        )
      };
    }));

    setFlipped(false);
    if (currentIdx < cards.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
      setReviewMode(true);
    }
  }, [selectedCourse, currentIdx, cards.length, currentSet]);

  const resetDeck = () => {
    setCurrentIdx(0);
    setFlipped(false);
    setReviewMode(false);
  };

  if (!selectedCourse) {
    return (
      <PageTransition>
        <div className="page-header">
          <h1>Spaced Repetition Flashcards</h1>
          <p>Smart flashcards with intelligent scheduling to optimize your learning</p>
        </div>
        <div className="grid-3">
          {flashcardsData.map((set, i) => {
            const course = courses.find(c => c.id === set.courseId);
            if (!course) return null;
            const dueCards = set.cards.filter(c => !c.nextReview || new Date(c.nextReview) <= new Date());
            return (
              <div
                key={set.id}
                className="card animate-in"
                style={{ cursor: 'pointer', animationDelay: `${i * 0.08}s` }}
                onClick={() => { setSelectedCourse(set.courseId); resetDeck(); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={course.thumbnail} alt={course.title} style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  <div>
                    <h3 style={{ fontSize: 16 }}>{course.title}</h3>
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{set.cards.length} cards</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span className="badge badge-accent">{dueCards.length} due</span>
                  <span className="badge badge-success">{set.cards.length - dueCards.length} reviewed</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }}>Study Now</button>
              </div>
            );
          })}
        </div>
      </PageTransition>
    );
  }

  const course = courses.find(c => c.id === selectedCourse);

  if (reviewMode) {
    return (
      <PageTransition>
        <div className="quiz-container" style={{ textAlign: 'center' }}>
          <div className="quiz-question-card quiz-result">
            <div className="score-circle" style={{ borderColor: 'var(--success)' }}>
              <span className="score-value">✓</span>
              <span className="score-label">Done!</span>
            </div>
            <h2 style={{ marginBottom: 8 }}><HiOutlineCheckCircle style={{ fontSize: 20, color: 'var(--success)' }} /> Deck Complete!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
              You've reviewed all {cards.length} cards in {course?.title}.
              Cards will reappear based on your difficulty ratings.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedCourse(null)}>Back to Decks</button>
              <button className="btn btn-primary" onClick={resetDeck}>Study Again</button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="page-header" style={{ marginBottom: 16 }}>
         <button className="btn btn-ghost" onClick={() => setSelectedCourse(null)} style={{ marginBottom: 8 }}>
          <HiOutlineArrowLeft style={{ fontSize: 14 }} /> Back to Decks
        </button>
        <h1 style={{ fontSize: 22 }}>{course?.title} Flashcards</h1>
      </div>

      <div className="flashcard-scene">
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
          <div className="flashcard-face flashcard-front">
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Question</div>
            <h3>{currentCard?.front}</h3>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 16 }}>Click to flip</div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Answer</div>
            <p>{currentCard?.back}</p>
          </div>
        </div>
      </div>

      <div className="flashcard-counter">
        Card {currentIdx + 1} of {cards.length}
      </div>

      {flipped && (
        <div className="flashcard-actions" style={{ marginTop: 20 }}>
          <button
            className="btn"
            style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
            onClick={() => handleDifficulty('hard')}
          >
            <HiOutlineExclamationTriangle style={{ fontSize: 14 }} /> Hard
          </button>
          <button
            className="btn"
            style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}
            onClick={() => handleDifficulty('medium')}
          >
            <HiOutlineFaceFrown style={{ fontSize: 14 }} /> Medium
          </button>
          <button
            className="btn"
            style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }}
            onClick={() => handleDifficulty('easy')}
          >
            <HiOutlineFaceSmile style={{ fontSize: 14 }} /> Easy
          </button>
        </div>
      )}

      <div className="progress-bar" style={{ maxWidth: 500, margin: '20px auto', height: 4 }}>
        <div className="progress-fill" style={{ width: `${((currentIdx + 1) / cards.length) * 100}%` }} />
      </div>
    </PageTransition>
  );
}
