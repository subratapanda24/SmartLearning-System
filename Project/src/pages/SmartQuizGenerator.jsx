import { useState, useRef } from 'react';
import {
  HiOutlineSparkles, HiOutlineArrowRight, HiOutlineCheck, HiOutlineXMark,
  HiOutlineDocumentArrowUp, HiOutlineDocumentText, HiOutlineLightBulb,
  HiOutlineBolt, HiOutlineArrowPath, HiOutlinePlusCircle,
  HiOutlineTrophy, HiOutlineHandThumbUp, HiOutlineAcademicCap,
  HiOutlineCheckCircle, HiOutlineXCircle
} from 'react-icons/hi2';
import PageTransition from '../components/layout/PageTransition';

export default function SmartQuizGenerator() {
  const [notes, setNotes] = useState('');
  const [stage, setStage] = useState('input');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('Mixed');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = () => setFileData(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  };


  const generateFromText = (text, count) => {
    const sentences = text
      .split(/[.!?\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 25 && /[a-zA-Z]/.test(s));

    if (sentences.length === 0) return [];

  
    const allWords = text.split(/\s+/).filter(w => w.length > 3);
    const keyTerms = [...new Set(
      allWords.filter(w => /^[A-Z]/.test(w) || w.length > 6)
    )].slice(0, 20);


    const generators = [

      (sentence) => {
        const match = sentence.match(/^(.+?)\s+(?:is|are|was|were)\s+(.+)$/i);
        if (!match) return null;
        const subject = match[1].trim();
        const definition = match[2].trim();
        if (subject.length < 3 || definition.length < 10) return null;
        return {
          q: `What is ${subject}?`,
          correct: definition.charAt(0).toUpperCase() + definition.slice(1),
          subject,
        };
      },
      // Type 2: "Which of the following is true?" — tests factual recall
      (sentence) => {
        if (sentence.length < 30) return null;
        return {
          q: `Which of the following statements is correct?`,
          correct: sentence,
          subject: sentence.split(/\s+/).slice(0, 3).join(' '),
        };
      },

      (sentence) => {
        const match = sentence.match(/(.+?)\s+(?:allows?|enables?|handles?|provides?|supports?|creates?|uses?)\s+(.+)/i);
        if (!match) return null;
        const subject = match[1].trim();
        const action = match[2].trim();
        return {
          q: `What does ${subject} do?`,
          correct: `It ${match[0].match(/(?:allows?|enables?|handles?|provides?|supports?|creates?|uses?)\s+(.+)/i)?.[0] || action}`,
          subject,
        };
      },

      (sentence) => {
        const match = sentence.match(/(.+?)\s+(?:is used for|is used to|is designed to|helps to|is responsible for)\s+(.+)/i);
        if (!match) return null;
        return {
          q: `${match[1].trim()} is used for what purpose?`,
          correct: match[2].trim().charAt(0).toUpperCase() + match[2].trim().slice(1),
          subject: match[1].trim(),
        };
      },
 
      (sentence) => {
        const words = sentence.split(/\s+/);
        if (words.length < 6) return null;
        const keyWord = words.find(w => w.length > 5 && /^[A-Za-z]/.test(w)) || words[1];
        return {
          q: `According to the material, what is true about ${keyWord}?`,
          correct: sentence,
          subject: keyWord,
        };
      },
    ];

 
    const makeDistractors = (correctAnswer, subject) => {
      const otherSentences = sentences
        .filter(s => s !== correctAnswer && !s.includes(subject))
        .sort(() => Math.random() - 0.5);

      const distractorPool = [
        ...otherSentences.slice(0, 2).map(s =>
          s.length > 100 ? s.slice(0, 97) + '...' : s
        ),
        `${subject || 'This'} is primarily a server-side rendering technique`,
        `It replaces all existing functionality with a new API`,
        `This concept is deprecated and no longer recommended`,
        `${subject || 'This'} is only applicable to backend systems`,
        `It requires manual memory management and pointer arithmetic`,
        `This approach was introduced to replace object-oriented patterns`,
      ];

      return distractorPool
        .filter(d => d !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    };

    const questions = [];
    const usedSentences = new Set();
    const num = Math.min(count, sentences.length);

    for (let attempt = 0; questions.length < num && attempt < sentences.length * 3; attempt++) {
      const sentIdx = attempt % sentences.length;
      if (usedSentences.has(sentIdx) && attempt > sentences.length) continue;

      const sentence = sentences[sentIdx];
      const genIdx = attempt % generators.length;
      const result = generators[genIdx](sentence);

      if (!result) continue;
      usedSentences.add(sentIdx);

      const correct = result.correct.length > 120
        ? result.correct.slice(0, 117) + '...'
        : result.correct;

      const distractors = makeDistractors(correct, result.subject);
      const allOpts = [correct, ...distractors].sort(() => Math.random() - 0.5);

      questions.push({
        q: result.q,
        opts: allOpts,
        ans: allOpts.indexOf(correct),
        explanation: `This comes from your notes: "${sentence.slice(0, 100)}${sentence.length > 100 ? '...' : ''}"`,
      });
    }

    return questions;
  };

  const handleGenerate = async () => {
    if (!notes.trim() && !fileData) return;
    setStage('generating');
    setProgress(0);
    const interval = setInterval(() => setProgress((p) => (p < 85 ? p + 7 : p)), 150);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `${notes}\n\nGenerate exactly ${numQuestions} multiple-choice questions at ${difficulty} difficulty.\nEach must have 4 options. Respond ONLY with JSON: [{"q":"question","opts":["A","B","C","D"],"ans":0,"explanation":"why"},...]`,
          }],
        }),
      });
      clearInterval(interval);
      setProgress(100);
      const data = await response.json();
      const text = data.content?.[0]?.text || '[]';
      const qs = JSON.parse(text.replace(/```json|```/g, '').trim());
      if (qs.length > 0) {
        setQuestions(qs); setCurrent(0); setSelected(null); setSubmitted(false); setAnswers([]);
        setTimeout(() => setStage('quiz'), 400);
        return;
      }
      throw new Error('Empty response');
    } catch {

      clearInterval(interval);
      setProgress(100);
      const localQs = notes.trim() ? generateFromText(notes, numQuestions) : [];
      if (localQs.length > 0) {
        setQuestions(localQs); setCurrent(0); setSelected(null); setSubmitted(false); setAnswers([]);
      }
      setTimeout(() => setStage(localQs.length > 0 ? 'quiz' : 'input'), 400);
    }
  };

  const handleNext = () => {
    const newAnswer = { selected, correct: selected === questions[current].ans, explanation: questions[current].explanation };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (current === questions.length - 1) {
      setStage('result');
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setSubmitted(false);
    }
  };

  const reset = () => {
    setStage('input');
    setNotes('');
    setQuestions([]);
    setCurrent(0);
    setAnswers([]);
    setUploadedFile(null);
    setFileData(null);
  };

  const score = answers.filter((a) => a.correct).length;
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

 
  if (stage === 'input') {
    return (
      <PageTransition>
        <div className="page-header">
          <div className="page-header-row">
            <div>
              <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HiOutlineBolt style={{ color: 'var(--accent)' }} />
                Quiz Generator
              </h1>
              <p>Upload notes or paste text to generate AI-powered quizzes</p>
            </div>
          </div>
        </div>

        <div className="quiz-container">
          <div className="card-accent" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HiOutlineSparkles style={{ fontSize: 20, color: 'var(--accent)' }} />
                <h3 style={{ fontSize: 16 }}>Your Study Material</h3>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <HiOutlineDocumentArrowUp style={{ fontSize: 16 }} /> Upload PDF
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />

            {uploadedFile ? (
              <div style={{
                padding: 24,
                border: '2px dashed var(--border-accent)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                background: 'var(--accent-subtle)',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--bg-elevated)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <HiOutlineDocumentText style={{ fontSize: 24, color: 'var(--accent)' }} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                  {uploadedFile.name}
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>
                  PDF ready for analysis
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => { setUploadedFile(null); setFileData(null); }}
                >
                  <HiOutlineXMark style={{ fontSize: 14 }} /> Remove
                </button>
              </div>
            ) : (
              <textarea
                className="textarea"
                style={{ minHeight: 200 }}
                placeholder={`Paste your study notes here (minimum 50 characters)...\n\nExample:\nReact is a JavaScript library for building user interfaces. It uses a virtual DOM to efficiently update the real DOM. Components are the building blocks of React apps.`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            )}

            {/* Settings */}
            <div style={{ display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
                  Number of Questions
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[3, 5, 8, 10].map((n) => (
                    <button
                      key={n}
                      className={`btn btn-sm ${numQuestions === n ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setNumQuestions(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
                  Difficulty
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Easy', 'Mixed', 'Hard'].map((d) => (
                    <button
                      key={d}
                      className={`btn btn-sm ${difficulty === d ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setDifficulty(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Character count + Generate */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
              {!uploadedFile && (
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                  {notes.length} characters {notes.length < 50 && !fileData ? '(min 50)' : ''}
                  {notes.length >= 50 && <HiOutlineCheck style={{ fontSize: 12, color: 'var(--success)', marginLeft: 4 }} />}
                </span>
              )}
              {uploadedFile && <span />}
              <button
                className="btn btn-primary"
                onClick={handleGenerate}
                disabled={!notes.trim() && !fileData}
                style={{ opacity: (!notes.trim() && !fileData) ? 0.4 : 1 }}
              >
                <HiOutlineSparkles /> Generate Quiz
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }


  if (stage === 'generating') {
    return (
      <PageTransition>
        <div className="quiz-container" style={{ paddingTop: 40 }}>
          <div className="card" style={{ padding: 48, textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--accent-subtle)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <HiOutlineBolt style={{ fontSize: 28, color: 'var(--accent)' }} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              Generating Quiz
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
              Claude is creating {numQuestions} {difficulty.toLowerCase()} questions...
            </p>
            <div className="progress-bar" style={{ maxWidth: 400, margin: '0 auto 16px' }}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
              {progress}% complete
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }


  if (stage === 'quiz' && questions.length > 0) {
    const q = questions[current];
    const isLastQuestion = current === questions.length - 1;

    return (
      <PageTransition>
        <div className="quiz-container">
          <div className="quiz-progress-header">
            <button className="btn btn-ghost" onClick={reset}>
              <HiOutlineArrowPath style={{ fontSize: 14 }} /> Start Over
            </button>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              Question {current + 1} of {questions.length}
            </span>
            <span className="badge badge-accent">AI Generated</span>
          </div>

          <div className="progress-bar" style={{ marginBottom: 24 }}>
            <div className="progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>

          <div className="quiz-question-card">
            {/* Question label */}
            <div style={{
              fontSize: 11, fontWeight: 600, color: 'var(--accent)',
              textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12,
            }}>
              Question {current + 1}
            </div>
            <h3>{q.q}</h3>

            <div className="quiz-options">
              {q.opts.map((opt, idx) => {
                let className = 'quiz-option';
                if (submitted) {
                  if (idx === q.ans) className += ' correct';
                  else if (idx === selected && idx !== q.ans) className += ' incorrect';
                } else if (selected === idx) {
                  className += ' selected';
                }
                return (
                  <div key={idx} className={className} onClick={() => !submitted && setSelected(idx)}>
                    <div className="quiz-option-marker">
                      {submitted && idx === q.ans ? <HiOutlineCheck /> :
                       submitted && idx === selected && idx !== q.ans ? <HiOutlineXMark /> :
                       String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ fontSize: 13 }}>{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {submitted && q.explanation && (
              <div className="quiz-explanation" style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <HiOutlineLightBulb style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }} />
                <span>{q.explanation}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {!submitted ? (
              <button
                className="btn btn-primary"
                onClick={() => setSubmitted(true)}
                disabled={selected === null}
                style={{ opacity: selected === null ? 0.4 : 1 }}
              >
                Submit Answer
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                {isLastQuestion ? 'View Results' : <>Next <HiOutlineArrowRight /></>}
              </button>
            )}
          </div>
        </div>
      </PageTransition>
    );
  }


  if (stage === 'result') {
    const borderColor = pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--error)';
    const ResultIcon = pct >= 80 ? HiOutlineTrophy : pct >= 60 ? HiOutlineHandThumbUp : HiOutlineAcademicCap;

    return (
      <PageTransition>
        <div className="quiz-container">
          <div className="quiz-question-card quiz-result">
            <div className="score-circle" style={{ borderColor }}>
              <span className="score-value">{pct}%</span>
              <span className="score-label">Score</span>
            </div>

            <h2 style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <ResultIcon style={{ fontSize: 24 }} />
              {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : 'Keep Practicing'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
              {score} out of {questions.length} correct
            </p>


            <div style={{
              textAlign: 'left', marginBottom: 24,
              background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)',
              padding: 16,
            }}>
              {questions.map((q, idx) => {
                const a = answers[idx];
                return (
                  <div
                    key={idx}
                    style={{
                      padding: 12,
                      borderRadius: 'var(--radius-sm)',
                      background: a?.correct ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                      border: `1px solid ${a?.correct ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
                      marginBottom: idx < questions.length - 1 ? 10 : 0,
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}
                  >
                    {a?.correct
                      ? <HiOutlineCheckCircle style={{ fontSize: 18, color: 'var(--success)', flexShrink: 0, marginTop: 2 }} />
                      : <HiOutlineXCircle style={{ fontSize: 18, color: 'var(--error)', flexShrink: 0, marginTop: 2 }} />
                    }
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{q.q}</p>
                      {!a?.correct && (
                        <p style={{ fontSize: 12, color: 'var(--success)' }}>
                          Correct: {q.opts[q.ans]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setStage('quiz');
                  setCurrent(0);
                  setSelected(null);
                  setSubmitted(false);
                  setAnswers([]);
                }}
              >
                <HiOutlineArrowPath style={{ fontSize: 14 }} /> Retake
              </button>
              <button className="btn btn-primary" onClick={reset}>
                <HiOutlinePlusCircle style={{ fontSize: 14 }} /> New Quiz
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return null;
}
