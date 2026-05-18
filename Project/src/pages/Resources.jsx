import { useState } from 'react';
import { HiOutlineDocumentArrowDown, HiOutlineDocumentText, HiOutlineFolderOpen } from 'react-icons/hi2';
import { courses } from '../data/courses';
import PageTransition from '../components/layout/PageTransition';

export default function Resources() {
  const [filterCourse, setFilterCourse] = useState('all');

  const allResources = courses.flatMap(c =>
    (c.resources || []).map(r => ({ ...r, courseName: c.title, courseId: c.id, courseColor: c.color, courseThumbnail: c.thumbnail }))
  );

  const filtered = filterCourse === 'all'
    ? allResources
    : allResources.filter(r => r.courseId === parseInt(filterCourse));

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'zip': return '📦';
      default: return '📁';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'pdf': return { bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' };
      case 'zip': return { bg: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' };
      default: return { bg: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6' };
    }
  };

  return (
    <PageTransition>
      <div className="page-header page-header-row">
        <div>
          <h1>Study Resources</h1>
          <p>{allResources.length} downloadable resources across all courses</p>
        </div>
      </div>

      <div className="filter-tabs" style={{ marginBottom: 24 }}>
        <button className={`filter-tab ${filterCourse === 'all' ? 'active' : ''}`} onClick={() => setFilterCourse('all')}>All Courses</button>
        {courses.map(c => (
          <button
            key={c.id}
            className={`filter-tab ${filterCourse === String(c.id) ? 'active' : ''}`}
            onClick={() => setFilterCourse(String(c.id))}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <img src={c.thumbnail} alt={c.title} style={{ width: 24, height: 18, objectFit: 'cover', borderRadius: '4px' }} />
            {c.title.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((resource, i) => {
          const typeStyle = getTypeColor(resource.type);
          

          let downloadUrl = '#';
          if (resource.title.includes('React Official')) downloadUrl = '/react_official.pdf';
          else if (resource.title.includes('Component Cheat Sheet')) downloadUrl = '/component_cheatsheet.pdf';
          else if (resource.title.includes('Hooks Reference')) downloadUrl = '/hooks_reference.pdf';
          else if (resource.type === 'pdf') downloadUrl = '/react_official.pdf'; // fallback

          return (
            <a 
              key={`${resource.courseId}-${resource.id}`} 
              href={downloadUrl} 
              download={downloadUrl !== '#' ? true : undefined}
              className="resource-item animate-in" 
              style={{ animationDelay: `${i * 0.05}s`, textDecoration: 'none', color: 'inherit' }}
            >
              <div className="resource-icon" style={{ background: typeStyle.bg, color: typeStyle.color }}>
                {getTypeIcon(resource.type)}
              </div>
              <div className="resource-info">
                <h4>{resource.title}</h4>
                <span>{resource.type.toUpperCase()} • {resource.size} • {resource.courseName}</span>
              </div>
              <div className="btn btn-secondary btn-sm">
                <HiOutlineDocumentArrowDown /> Download
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <h3>No resources found</h3>
          <p>No study materials available for this filter</p>
        </div>
      )}
    </PageTransition>
  );
}
