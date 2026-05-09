import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react'
import { Card, CardContent, Button, ProgressBar } from '../components/ui'
import { quizzes, courses } from '../data/mockData'

export default function Quiz() {
  const { id } = useParams()
  const quiz = quizzes.find(q => q.id === Number(id))
  const course = courses.find(c => c.id === quiz?.courseId)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [showResult, setShowResult] = useState(false)

  if (!quiz) return (
    <div className="text-center py-20">
      <p className="text-gray-400 text-sm">Quiz not found.</p>
      <Link to="/courses"><Button className="mt-4">Back to Courses</Button></Link>
    </div>
  )

  const question = quiz.questions[current]
  const totalQ = quiz.questions.length
  const score = answers.filter(a => a.correct).length
  const pct = Math.round((score / totalQ) * 100)

  const handleNext = () => {
    const newAnswers = [...answers, { selected, correct: selected === question.correct }]
    setAnswers(newAnswers)
    if (current === totalQ - 1) {
      setShowResult(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setSubmitted(false)
    }
  }

  const reset = () => {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setShowResult(false)
    setSubmitted(false)
  }

  if (showResult) {
    const grade = pct >= 80 ? 'Excellent Work' : pct >= 60 ? 'Good Job' : 'Keep Practicing'
    return (
      <div className="max-w-lg mx-auto space-y-5">
        <h1 className="text-xl font-bold text-black">Quiz Results</h1>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 rounded-full border-4 border-black flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-black">{pct}%</span>
            </div>
            <h2 className="text-lg font-bold text-black">{grade}</h2>
            <p className="text-sm text-gray-500 mt-1">{score} of {totalQ} questions correct</p>

            <div className="mt-5 space-y-2 text-left">
              {quiz.questions.map((q, idx) => {
                const ans = answers[idx]
                return (
                  <div key={q.id} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg">
                    {ans?.correct
                      ? <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    }
                    <div>
                      <p className="text-xs font-medium text-black line-clamp-2">{q.question}</p>
                      {!ans?.correct && (
                        <p className="text-xs text-green-700 mt-0.5">Correct: {q.options[q.correct]}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-2.5 mt-5">
              <Button variant="outline" onClick={reset} className="flex-1 gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />Try Again
              </Button>
              {course && (
                <Link to={`/courses/${course.id}`} className="flex-1">
                  <Button className="w-full gap-1.5">
                    <Award className="w-3.5 h-3.5" />Back to Course
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-black">{quiz.title}</h1>
        {course && <p className="text-sm text-gray-400 mt-0.5">{course.title}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Question {current + 1} of {totalQ}</span>
          <span className="font-medium text-black">{Math.round((current / totalQ) * 100)}%</span>
        </div>
        <ProgressBar value={(current / totalQ) * 100} />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-black leading-relaxed">{question.question}</h2>

          <div className="space-y-2">
            {question.options.map((option, idx) => {
              let cls = 'border-gray-200 bg-white text-black hover:border-gray-400'

              if (submitted) {
                if (idx === question.correct) {
                  cls = 'border-green-500 bg-green-50 text-green-900'
                } else if (idx === selected && idx !== question.correct) {
                  cls = 'border-red-400 bg-red-50 text-red-900'
                } else {
                  cls = 'border-gray-100 bg-gray-50 text-gray-400'
                }
              } else if (selected === idx) {
                cls = 'border-black bg-black text-white'
              }

              return (
                <button
                  key={idx}
                  onClick={() => !submitted && setSelected(idx)}
                  disabled={submitted}
                  className={`w-full text-left p-3 rounded-lg border-2 text-sm font-medium transition-all duration-150 disabled:cursor-default ${cls}`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full border text-xs font-bold flex-shrink-0 flex items-center justify-center ${
                        selected === idx && !submitted ? 'border-white text-white' : 'border-current'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="pt-1">
            {!submitted ? (
              <Button
                onClick={() => setSubmitted(true)}
                disabled={selected === null}
                className="w-full"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="w-full gap-1.5">
                {current === totalQ - 1 ? 'View Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}