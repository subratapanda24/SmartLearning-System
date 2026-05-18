import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { courses } from '../data/courses';
import { mindmapData } from '../data/mindmap';
import PageTransition from '../components/layout/PageTransition';
import {
  HiOutlineShare, HiOutlineSparkles, HiOutlineArrowLeft,
  HiOutlineChartBar, HiOutlineBookOpen, HiOutlineAcademicCap,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

const CATEGORIES = [
  { id: 'Web Development', color: 'var(--accent)' },
  { id: 'Data Science', color: 'var(--success)' },
  { id: 'Design', color: 'var(--warning)' },
  { id: 'Cloud & DevOps', color: 'var(--info)' },
];

export default function MindMap() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewMode, setViewMode] = useState('map'); 
  const [expanded, setExpanded] = useState(new Set());
  const [selectedCat, setSelectedCat] = useState(null);
  const [aiInsight, setAiInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  const availableCourses = courses.filter(c => mindmapData[c.id]);


  const categorized = {};
  courses.forEach((c) => {
    if (!categorized[c.category]) categorized[c.category] = [];
    categorized[c.category].push(c);
  });

  const toggle = (cat) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(cat) ? n.delete(cat) : n.add(cat);
      return n;
    });
    setSelectedCat(cat);
    getAIInsight(cat);
  };

  const getAIInsight = async (cat) => {
    const list = categorized[cat] || [];
    const avg = Math.round(list.reduce((s, c) => s + c.progress, 0) / (list.length || 1));
    setLoadingInsight(true);


    const localInsights = {
      'Web Development': `Focus on building real projects to solidify your ${avg > 50 ? 'advanced' : 'foundational'} skills. Practice component architecture, state management patterns, and responsive design. ${avg < 30 ? 'Start with the basics and build incrementally.' : 'Consider contributing to open-source projects to gain practical experience.'}`,
      'Data Science': `Strengthen your understanding of data pipelines and statistical analysis. ${avg > 50 ? 'Dive into advanced topics like feature engineering and model evaluation.' : 'Focus on mastering Pandas fundamentals and basic visualization.'} Work with real-world datasets to build practical intuition.`,
      'Design': `${avg < 20 ? 'Begin by studying design principles and UI patterns from successful apps.' : 'Refine your portfolio with case studies that show your design process.'} Practice creating design systems and focus on user research methodology. Consistent critique sessions will accelerate your growth.`,
      'Cloud & DevOps': `${avg > 40 ? 'Move toward hands-on labs with infrastructure-as-code and CI/CD pipelines.' : 'Start with core cloud concepts and basic service configurations.'} Practice deploying real applications and monitoring their performance. Security best practices should be integrated from the start.`,
    };

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [{
            role: 'user',
            content: `A student is studying ${cat}. They have ${list.length} course(s) with ${avg}% average progress. Give 2-3 actionable learning tips in one paragraph. Be direct, no intro phrases.`,
          }],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text;
      setAiInsight(text || localInsights[cat] || 'Continue building strong foundations in this subject.');
    } catch {
      setAiInsight(localInsights[cat] || 'Focus on consistent practice and review key concepts regularly. Build projects that challenge your current skill level.');
    }
    setLoadingInsight(false);
  };


  if (selectedCourse) {
    return (
      <PageTransition>
        <MindMapView courseId={selectedCourse} onBack={() => setSelectedCourse(null)} />
      </PageTransition>
    );
  }


  return (
    <PageTransition>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <HiOutlineShare style={{ color: 'var(--accent)' }} />
              Learning Mind Map
            </h1>
            <p>Explore your courses by subject area with AI insights</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className={`btn btn-sm ${viewMode === 'map' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('map')}
            >
              <HiOutlineShare style={{ fontSize: 14 }} /> Concept Maps
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'categories' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('categories')}
            >
              <HiOutlineChartBar style={{ fontSize: 14 }} /> Categories
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'map' ? (

        <div className="grid-3">
          {availableCourses.map((course, i) => (
            <div
              key={course.id}
              className="card animate-in"
              style={{ cursor: 'pointer', animationDelay: `${i * 0.08}s` }}
              onClick={() => setSelectedCourse(course.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <img src={course.thumbnail} alt={course.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                <div>
                  <h3 style={{ fontSize: 16 }}>{course.title}</h3>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {mindmapData[course.id].nodes.length} concepts
                  </span>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }}>Explore Map</button>
            </div>
          ))}
        </div>
      ) : (

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <HiOutlineBookOpen style={{ fontSize: 18 }} /> Course Categories
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CATEGORIES.map((cat) => {
                const isExp = expanded.has(cat.id);
                const courseList = categorized[cat.id] || [];
                const avg = Math.round(courseList.reduce((s, c) => s + c.progress, 0) / (courseList.length || 1));

                return (
                  <div key={cat.id}>
                    <button
                      onClick={() => toggle(cat.id)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: isExp ? 'var(--accent-subtle)' : 'var(--bg-elevated)',
                        border: `1px solid ${isExp ? 'var(--border-accent)' : 'transparent'}`,
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all var(--transition-fast)',
                        fontFamily: "'Inter', sans-serif",
                        color: 'var(--text-primary)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                        <div style={{
                          width: 10, height: 10, borderRadius: '50%',
                          background: cat.color, flexShrink: 0,
                        }} />
                        <div style={{ textAlign: 'left' }}>
                          <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{cat.id}</p>
                          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: 0, marginTop: 2 }}>
                            {courseList.length} courses &bull; {avg}% avg
                          </p>
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)', transition: 'transform var(--transition-fast)', transform: isExp ? 'rotate(90deg)' : 'none' }}>
                        ▸
                      </span>
                    </button>


                    {isExp && (
                      <div style={{
                        display: 'flex', flexDirection: 'column', gap: 6,
                        marginLeft: 24, marginTop: 8, marginBottom: 8,
                      }}>
                        {courseList.length === 0 ? (
                          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', padding: '8px 0' }}>
                            No courses in this category yet
                          </p>
                        ) : courseList.map((course) => (
                          <div
                            key={course.id}
                            style={{
                              padding: '10px 14px',
                              background: 'var(--bg-input)',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-subtle)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                              <img src={course.thumbnail} alt={course.title} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
                              <p style={{
                                fontSize: 13, fontWeight: 600, margin: 0,
                                flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              }}>
                                {course.title}
                              </p>
                              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>
                                {course.progress}%
                              </span>
                            </div>
                            <div className="progress-bar" style={{ height: 4 }}>
                              <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

     
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {selectedCat && (
              <div className="card-accent" style={{ padding: 20 }}>
                <p style={{
                  fontSize: 11, fontWeight: 600, color: 'var(--accent)',
                  textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <HiOutlineSparkles style={{ fontSize: 14 }} /> AI Insight
                </p>
                {loadingInsight ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                    <div style={{
                      width: 16, height: 16, border: '2px solid var(--border-subtle)',
                      borderTopColor: 'var(--accent)', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Analyzing...</span>
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                    {aiInsight}
                  </p>
                )}
              </div>
            )}


            <div className="card" style={{ padding: 20 }}>
              <p style={{
                fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)',
                textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <HiOutlineChartBar style={{ fontSize: 14 }} /> Overall Stats
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Total Courses', value: courses.length, icon: HiOutlineBookOpen },
                  { label: 'In Progress', value: courses.filter((c) => c.progress > 0 && c.progress < 100).length, icon: HiOutlineAcademicCap },
                  { label: 'Completed', value: courses.filter((c) => c.progress >= 100).length, icon: HiOutlineCheckCircle },
                  { label: 'Avg Progress', value: `${Math.round(courses.reduce((s, c) => s + c.progress, 0) / (courses.length || 1))}%`, icon: HiOutlineChartBar },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      paddingBottom: 12,
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    <Icon style={{ fontSize: 16, color: 'var(--text-tertiary)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}

function MindMapView({ courseId, onBack }) {
  const mapData = mindmapData[courseId];
  const course = courses.find(c => c.id === courseId);
  const [nodes, setNodes, onNodesChange] = useNodesState(mapData?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(mapData?.edges || []);

  const onNodeClick = useCallback((e, node) => {

  }, []);

  if (!mapData) return null;

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 8 }}>
          <HiOutlineArrowLeft style={{ fontSize: 14 }} /> Back to Mind Maps
        </button>
        <h1 style={{ fontSize: 22 }}>{course?.title} — Concept Map</h1>
        <p style={{ fontSize: 13 }}>Drag, zoom, and explore the concept relationships</p>
      </div>

      <div className="mindmap-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          attributionPosition="bottom-left"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <Background color="var(--border-subtle)" gap={20} />
          <Controls />
          <MiniMap
            nodeColor={(n) => n.style?.background || 'var(--bg-elevated)'}
            style={{ background: 'var(--bg-secondary)', borderRadius: 8 }}
            maskColor="rgba(0,0,0,0.5)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
