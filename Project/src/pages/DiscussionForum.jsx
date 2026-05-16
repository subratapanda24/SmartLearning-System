import { useState } from 'react';
import { HiOutlineHeart, HiOutlineChatBubbleLeft, HiOutlinePlusCircle, HiOutlineArrowLeft } from 'react-icons/hi2';
import { discussions } from '../data/discussions';
import { courses } from '../data/courses';
import PageTransition from '../components/layout/PageTransition';

export default function DiscussionForum() {
  const [threads, setThreads] = useState(discussions);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '', courseId: 1 });
  const [newReply, setNewReply] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');

  const filtered = filterCourse === 'all'
    ? threads
    : threads.filter(t => t.courseId === parseInt(filterCourse));

  const handleCreateThread = () => {
    if (!newThread.title.trim() || !newThread.content.trim()) return;
    const thread = {
      id: Date.now(),
      courseId: newThread.courseId,
      title: newThread.title,
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=You&backgroundColor=e0e0e0',
      timestamp: 'Just now',
      content: newThread.content,
      upvotes: 0,
      replies: []
    };
    setThreads(prev => [thread, ...prev]);
    setNewThread({ title: '', content: '', courseId: 1 });
    setShowCreateModal(false);
  };

  const handleReply = () => {
    if (!newReply.trim() || !selectedThread) return;
    const reply = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=You&backgroundColor=e0e0e0',
      isInstructor: false,
      timestamp: 'Just now',
      content: newReply,
      upvotes: 0
    };
    setThreads(prev => prev.map(t =>
      t.id === selectedThread.id ?
      { ...t, replies: [...t.replies, reply] } : t
    ));
    setSelectedThread(prev => ({ ...prev, replies: [...prev.replies, reply] }));
    setNewReply('');
  };

  if (selectedThread) {
    return (
      <PageTransition>
        <div className="page-header">
          <button className="btn btn-ghost" onClick={() => setSelectedThread(null)} style={{ marginBottom: 8 }}>
            <HiOutlineArrowLeft style={{ fontSize: 14 }} /> Back to Discussions
          </button>
          <h1 style={{ fontSize: 22 }}>{selectedThread.title}</h1>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="thread-header">
            <img src={selectedThread.avatar} alt={selectedThread.author} className="thread-avatar" style={{ width: 36, height: 36, borderRadius: '50%' }} />
            <div className="thread-meta">
              <h4>{selectedThread.author}</h4>
              <span>{selectedThread.timestamp}</span>
            </div>
            <span className="badge">{courses.find(c => c.id === selectedThread.courseId)?.title.split(' ').slice(0, 2).join(' ')}</span>
          </div>
          <p className="thread-content">{selectedThread.content}</p>
          <div className="thread-footer">
            <span><HiOutlineHeart /> {selectedThread.upvotes}</span>
            <span><HiOutlineChatBubbleLeft /> {selectedThread.replies.length} replies</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {selectedThread.replies.map(reply => (
            <div key={reply.id} className={`reply-card ${reply.isInstructor ? 'instructor' : ''}`}>
              <div className="thread-header">
                <img src={reply.avatar} alt={reply.author} className="thread-avatar" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                <div className="thread-meta">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {reply.author}
                    {reply.isInstructor && <span className="badge badge-accent" style={{ fontSize: 10 }}>Instructor</span>}
                  </h4>
                  <span>{reply.timestamp}</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{reply.content}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontSize: 15, marginBottom: 12 }}>Write a Reply</h3>
          <textarea
            className="textarea"
            placeholder="Share your thoughts..."
            value={newReply}
            onChange={e => setNewReply(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
            <button className="btn btn-primary" onClick={handleReply}>Post Reply</button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="page-header page-header-row">
        <div>
          <h1>Discussion Forum</h1>
          <p>Connect with fellow students and instructors</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <HiOutlinePlusCircle /> New Thread
        </button>
      </div>

      <div className="filter-tabs" style={{ marginBottom: 24 }}>
        <button className={`filter-tab ${filterCourse === 'all' ? 'active' : ''}`} onClick={() => setFilterCourse('all')}>All</button>
        {courses.map(c => (
          <button
            key={c.id}
            className={`filter-tab ${filterCourse === String(c.id) ? 'active' : ''}`}
            onClick={() => setFilterCourse(String(c.id))}
          >
            {c.title.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((thread, i) => (
          <div
            key={thread.id}
            className="thread-card animate-in"
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => setSelectedThread(thread)}
          >
            <div className="thread-header">
              <img src={thread.avatar} alt={thread.author} className="thread-avatar" style={{ width: 36, height: 36, borderRadius: '50%' }} />
              <div className="thread-meta">
                <h4>{thread.author}</h4>
                <span>{thread.timestamp}</span>
              </div>
              <span className="badge">{courses.find(c => c.id === thread.courseId)?.title.split(' ').slice(0, 2).join(' ')}</span>
            </div>
            <h3 className="thread-title">{thread.title}</h3>
            <p className="thread-content" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {thread.content}
            </p>
            <div className="thread-footer">
              <span><HiOutlineHeart /> {thread.upvotes}</span>
              <span><HiOutlineChatBubbleLeft /> {thread.replies.length} replies</span>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>New Discussion Thread</h2>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Course</label>
              <select
                className="input"
                value={newThread.courseId}
                onChange={e => setNewThread(prev => ({ ...prev, courseId: parseInt(e.target.value) }))}
              >
                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Title</label>
              <input className="input" placeholder="Thread title..." value={newThread.title} onChange={e => setNewThread(prev => ({ ...prev, title: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Content</label>
              <textarea className="textarea" placeholder="What's on your mind?" value={newThread.content} onChange={e => setNewThread(prev => ({ ...prev, content: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateThread}>Create Thread</button>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
