import { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    enrolledCourses: [1, 2],
    completedCourses: [],
    scores: {},
  })

  const [progress, setProgress] = useState({
    1: { courseName: 'Web Development Basics', percentage: 65, lessons: 8, completed: 5 },
    2: { courseName: 'JavaScript Fundamentals', percentage: 45, lessons: 10, completed: 4 },
  })

  const enrollCourse = (courseId) => {
    setUser(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId]
    }))
  }

  const completeCourse = (courseId) => {
    setUser(prev => ({
      ...prev,
      completedCourses: [...prev.completedCourses, courseId],
      enrolledCourses: prev.enrolledCourses.filter(id => id !== courseId)
    }))
  }

  const updateProgress = (courseId, percentage) => {
    setProgress(prev => ({
      ...prev,
      [courseId]: { ...prev[courseId], percentage }
    }))
  }

  const saveQuizScore = (quizId, score) => {
    setUser(prev => ({
      ...prev,
      scores: { ...prev.scores, [quizId]: score }
    }))
  }

  return (
    <AppContext.Provider value={{
      user,
      progress,
      enrollCourse,
      completeCourse,
      updateProgress,
      saveQuizScore,
      setUser
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
