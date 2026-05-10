import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CoursePage from './pages/CoursePage'
import VideoPlayer from './pages/VideoPlayer'
import Quiz from './pages/Quiz'
import ProgressPage from './pages/Progress'
import Forum from './pages/Forum'
import Resources from './pages/Resources'
import Certificate from './pages/Certificate'
import Instructors from './pages/Instructors'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CoursePage />} />
        <Route path="courses/:id/video/:lessonId" element={<VideoPlayer />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="forum" element={<Forum />} />
        <Route path="resources" element={<Resources />} />
        <Route path="certificate/:courseId" element={<Certificate />} />
        <Route path="instructors" element={<Instructors />} />
      </Route>
    </Routes>
  )
}