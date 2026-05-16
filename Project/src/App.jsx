import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/layout/Sidebar';
import LampToggle from './components/ui/LampToggle';
import LandingPage from './pages/LandingPage';
import CourseCatalog from './pages/CourseCatalog';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import ProgressDashboard from './pages/ProgressDashboard';
import DiscussionForum from './pages/DiscussionForum';
import Resources from './pages/Resources';
import Certificates from './pages/Certificates';
import TeacherProfiles from './pages/TeacherProfiles';
import Flashcards from './pages/Flashcards';
import SmartQuizGenerator from './pages/SmartQuizGenerator';
import MindMap from './pages/MindMap';
import './App.css';

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="app-lamp-container">
          <LampToggle />
        </div>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<CourseCatalog />} />
            <Route path="/course/:courseId" element={<LessonPage />} />
            <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/quizzes" element={<QuizPage />} />
            <Route path="/progress" element={<ProgressDashboard />} />
            <Route path="/discussions" element={<DiscussionForum />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/teachers" element={<TeacherProfiles />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quiz-generator" element={<SmartQuizGenerator />} />
            <Route path="/mindmap" element={<MindMap />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app/*" element={<AppLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
