import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight, HiOutlineDocumentArrowDown,
  HiOutlineTrophy, HiOutlineUserGroup, HiOutlineSparkles,
  HiOutlineRectangleStack, HiOutlineBolt, HiOutlineShare,
  HiOutlineChevronLeft, HiOutlineChevronRight
} from 'react-icons/hi2';

const navItems = [
  { section: 'Learn' },
  { to: '/app', icon: HiOutlineAcademicCap, label: 'Courses', exact: true },
  { to: '/app/progress', icon: HiOutlineChartBar, label: 'Progress' },
  { to: '/app/quizzes', icon: HiOutlineBolt, label: 'Quizzes' },
  { to: '/app/flashcards', icon: HiOutlineRectangleStack, label: 'Flashcards' },
  { section: 'AI Tools' },
  { to: '/app/quiz-generator', icon: HiOutlineSparkles, label: 'Quiz Generator' },
  { to: '/app/mindmap', icon: HiOutlineShare, label: 'Mind Map' },
  { section: 'Community' },
  { to: '/app/discussions', icon: HiOutlineChatBubbleLeftRight, label: 'Discussions' },
  { to: '/app/resources', icon: HiOutlineDocumentArrowDown, label: 'Resources' },
  { to: '/app/certificates', icon: HiOutlineTrophy, label: 'Certificates' },
  { to: '/app/teachers', icon: HiOutlineUserGroup, label: 'Instructors' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <Link to="/" className="sidebar-logo" style={{ textDecoration: 'none' }}>
        <div className="logo-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 10 10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 1 4 3 6 3s6-2 6-3v-5"/></svg></div>
        <span className="logo-text">SmartLearn</span>
      </Link>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return <div key={i} className="nav-section-title">{item.section}</div>;
          }
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === item.to || location.pathname === item.to + '/'
            : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon"><Icon /></span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-toggle">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
        </button>
      </div>
    </aside>
  );
}
