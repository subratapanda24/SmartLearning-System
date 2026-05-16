import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineStar, HiOutlineClock, HiOutlineUsers, HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2';
import { courses, categories } from '../data/courses';
import PageTransition from '../components/layout/PageTransition';

export default function CourseCatalog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'All' || c.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <PageTransition>
      <div className="page-header page-header-row">
        <div>
          <h1>Course Catalog</h1>
          <p>Explore {courses.length} courses across multiple disciplines</p>
        </div>
        <div className="search-bar">
          <HiOutlineMagnifyingGlass className="search-icon" />
          <input
            className="input"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-tabs" style={{ marginBottom: 24 }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {filtered.map((course, i) => (
          <Link
            to={`/app/course/${course.id}`}
            key={course.id}
            className="course-card animate-in"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="course-card-thumb">
              <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="course-card-body">
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span className="badge">{course.level}</span>
                <span className="badge-accent badge">{course.category}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-card-meta">
                <span><HiOutlineStar style={{ color: '#f59e0b' }} /> {course.rating}</span>
                <span><HiOutlineUsers /> {course.students.toLocaleString()}</span>
                <span><HiOutlineClock /> {course.duration}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${course.progress}%` }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6 }}>
                {course.progress}% complete
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon"><HiOutlineDocumentMagnifyingGlass /></div>
          <h3>No courses found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </PageTransition>
  );
}
