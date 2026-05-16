import { useState, useRef, useEffect } from 'react';
import { courses } from '../../data/courses';
import {
  HiOutlineSparkles, HiOutlinePaperAirplane, HiOutlineDocumentArrowUp,
  HiOutlineXMark, HiOutlineCpuChip, HiOutlineUser, HiOutlineDocumentText,
  HiOutlineRectangleStack, HiOutlineChatBubbleLeftRight,
  HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineEye, HiOutlineEyeSlash,
  HiOutlineQuestionMarkCircle, HiOutlineCheckCircle, HiOutlineAcademicCap
} from 'react-icons/hi2';

export default function AIStudyBuddy({ lesson, courseName }) {
  const [tab, setTab] = useState('chat');
  const [selectedCourse, setSelectedCourse] = useState(
    courses.find(c => c.title === courseName) || courses[0]
  );
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: `Hi! I'm your AI Study Buddy for "${courseName}". I can help you understand concepts, answer questions, generate flashcards, and create study schedules. What would you like to explore today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Local AI response fallback
  const generateLocalResponse = (userText, lessonData) => {
    const text = userText.toLowerCase();
    const context = lessonData?.content || lessonData?.aiContext || '';
    
    if (text.includes('explain') || text.includes('what is') || text.includes('tell me about')) {
      return context 
        ? `Great question! Here's what I can share based on the current lesson:\n\n${context}\n\nWould you like me to elaborate on any specific part?`
        : `That's a great topic to explore! In ${selectedCourse?.title || 'this course'}, this concept is fundamental. I'd recommend reviewing the lesson materials and practicing with examples. What specific aspect would you like to focus on?`;
    }
    if (text.includes('quiz') || text.includes('test') || text.includes('practice')) {
      return `I'd be happy to help you practice! Try checking out the Quiz Generator in the sidebar — you can paste your notes and it will create custom questions. For now, here's a quick challenge:\n\nBased on "${lessonData?.title || 'the current lesson'}", can you explain the key concepts in your own words? This self-testing technique is one of the most effective study strategies!`;
    }
    if (text.includes('help') || text.includes('stuck') || text.includes('confused')) {
      return `Don't worry — every great developer started exactly where you are! Here are some tips for ${lessonData?.title || 'this topic'}:\n\n1. Break the concept into smaller pieces\n2. Try writing a simple example\n3. Re-read the lesson content above\n4. Practice by explaining it to someone else\n\nWhat specific part is giving you trouble?`;
    }
    if (text.includes('summary') || text.includes('summarize')) {
      return context
        ? `Here's a summary of the current lesson:\n\n${context.slice(0, 300)}${context.length > 300 ? '...' : ''}\n\nThe key takeaways are the core concepts mentioned. Would you like me to help with any specific area?`
        : `I'd recommend reviewing the lesson content for a comprehensive summary. Focus on understanding the "why" behind each concept, not just the "what". Want me to help with anything specific?`;
    }
    
    // Default contextual response
    return context
      ? `Based on the lesson "${lessonData?.title || 'current topic'}":\n\n${context.slice(0, 250)}${context.length > 250 ? '...' : ''}\n\nThis is a fundamental concept in ${selectedCourse?.title || 'this course'}. Feel free to ask me to explain any part in more detail, generate practice questions, or help you understand related concepts!`
      : `Thanks for your question! I'm here to help you with ${selectedCourse?.title || 'your studies'}. I can help you:\n\n• Understand concepts from the lesson\n• Create practice questions\n• Summarize key points\n• Provide study tips\n\nWhat would you like to explore?`;
  };

  const sendMessage = async () => {
    if ((!input.trim() && !fileData) || loading) return;

    const userText = input.trim() || 'Please analyze this document.';
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userText, file: uploadedFile?.name }]);
    const capturedFileData = fileData;
    setFileData(null);
    setUploadedFile(null);
    setLoading(true);

    try {
      const systemPrompt = `You are an expert AI Study Buddy. The student is studying: ${selectedCourse?.title || 'General Topics'}. 
Current lesson: ${lesson?.title || 'N/A'}.
Lesson context: ${lesson?.aiContext || lesson?.content || 'No specific context available.'}
Give clear, concise explanations with examples. Be encouraging and supportive.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...messages.slice(-8).map(m => ({
              role: m.type === 'ai' ? 'assistant' : 'user',
              content: m.text,
            })),
            { role: 'user', content: userText },
          ],
        }),
      });

      const data = await response.json();
      const aiText = data.content?.[0]?.text;
      if (aiText) {
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: aiText }]);
      } else {
        throw new Error('No response');
      }
    } catch {
      // Fallback: generate local contextual response
      const localResponse = generateLocalResponse(userText, lesson);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: localResponse }]);
    }
    setLoading(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = () => setFileData(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  };

  // Local flashcard generation from course data
  const generateLocalFlashcards = () => {
    const course = selectedCourse;
    if (!course?.lessons) return [];
    return course.lessons
      .filter(l => l.content && l.type !== 'quiz')
      .slice(0, 6)
      .map(l => ({
        q: `What are the key concepts covered in "${l.title}"?`,
        a: l.content.length > 200 ? l.content.slice(0, 200) + '...' : l.content,
      }));
  };

  const generateFlashcards = async () => {
    setFlashcards([]);
    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Generate 6 flashcards for: "${selectedCourse?.title || 'General Topics'}". 
Respond ONLY with JSON array: [{"q":"question","a":"answer"},...]`,
          }],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || '[]';
      const cards = JSON.parse(text.replace(/```json|```/g, '').trim());
      if (cards.length > 0) {
        setFlashcards(cards);
        setCardIdx(0);
        setFlipped(false);
        setLoading(false);
        return;
      }
      throw new Error('Empty');
    } catch {
      // Fallback: generate from course lesson data
      const localCards = generateLocalFlashcards();
      setFlashcards(localCards.length > 0 ? localCards : [
        { q: `What is ${selectedCourse?.title || 'this course'} about?`, a: selectedCourse?.description || 'A comprehensive learning topic.' },
      ]);
      setCardIdx(0);
      setFlipped(false);
    }
    setLoading(false);
  };

  // ─── Flashcard Tab ────────────────────────────────────────────
  if (tab === 'flashcards') {
    return (
      <div className="chat-container" style={{ height: '100%', minHeight: 400 }}>
        {/* Tab Header */}
        <div className="chat-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <HiOutlineRectangleStack style={{ color: 'var(--accent)', fontSize: 18 }} />
            <span>AI Flashcards</span>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--text-tertiary)', fontSize: 12, borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)' }}
              onClick={() => setTab('chat')}
            >
              <HiOutlineChatBubbleLeftRight style={{ fontSize: 14 }} /> Chat
            </button>
            <button
              className="btn btn-sm"
              style={{
                background: 'var(--accent-subtle)', color: 'var(--accent)',
                fontSize: 12, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                border: '1px solid var(--border-accent)',
              }}
            >
              <HiOutlineRectangleStack style={{ fontSize: 14 }} /> Cards
            </button>
          </div>
        </div>

        <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {flashcards.length === 0 && !loading ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--accent-subtle)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <HiOutlineRectangleStack style={{ fontSize: 24, color: 'var(--accent)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Generate AI Flashcards</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: 280 }}>
                  Claude will create flashcards for <strong>{selectedCourse?.title || 'your course'}</strong>
                </p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={generateFlashcards}>
                <HiOutlineSparkles /> Generate Cards
              </button>
            </div>
          ) : loading && flashcards.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{
                width: 28, height: 28, border: '3px solid var(--border-subtle)',
                borderTopColor: 'var(--accent)', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Generating flashcards...</p>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Progress */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                  Card {cardIdx + 1} of {flashcards.length}
                </span>
                <button className="btn btn-ghost btn-sm" onClick={generateFlashcards} style={{ fontSize: 11 }}>
                  <HiOutlineSparkles style={{ fontSize: 12 }} /> Regenerate
                </button>
              </div>

              <div className="progress-bar" style={{ height: 4, marginBottom: 16 }}>
                <div className="progress-fill" style={{ width: `${((cardIdx + 1) / flashcards.length) * 100}%` }} />
              </div>

              {/* Flashcard */}
              <div className="flashcard-scene" style={{ height: 220, maxWidth: '100%', margin: '0 auto 16px' }}>
                <div
                  className={`flashcard ${flipped ? 'flipped' : ''}`}
                  onClick={() => setFlipped(!flipped)}
                  style={{ height: '100%' }}
                >
                  <div className="flashcard-face flashcard-front">
                    <div style={{
                      fontSize: 11, color: 'var(--text-tertiary)',
                      textTransform: 'uppercase', letterSpacing: 1,
                      marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <HiOutlineQuestionMarkCircle style={{ fontSize: 14 }} /> Question
                    </div>
                    <h3 style={{ fontSize: 16 }}>{flashcards[cardIdx]?.q}</h3>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 12 }}>Click to reveal</div>
                  </div>
                  <div className="flashcard-face flashcard-back">
                    <div style={{
                      fontSize: 11, color: 'var(--accent)',
                      textTransform: 'uppercase', letterSpacing: 1,
                      marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <HiOutlineCheckCircle style={{ fontSize: 14 }} /> Answer
                    </div>
                    <p style={{ fontSize: 14 }}>{flashcards[cardIdx]?.a}</p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 'auto' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => { e.stopPropagation(); setCardIdx(Math.max(0, cardIdx - 1)); setFlipped(false); }}
                  disabled={cardIdx === 0}
                  style={{ opacity: cardIdx === 0 ? 0.4 : 1 }}
                >
                  <HiOutlineChevronLeft style={{ fontSize: 14 }} /> Prev
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-icon"
                  onClick={(e) => { e.stopPropagation(); setFlipped(!flipped); }}
                  title={flipped ? 'Hide' : 'Show'}
                >
                  {flipped ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => { e.stopPropagation(); setCardIdx(Math.min(flashcards.length - 1, cardIdx + 1)); setFlipped(false); }}
                  disabled={cardIdx === flashcards.length - 1}
                  style={{ opacity: cardIdx === flashcards.length - 1 ? 0.4 : 1 }}
                >
                  Next <HiOutlineChevronRight style={{ fontSize: 14 }} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Chat Tab (default) ───────────────────────────────────────
  return (
    <div className="chat-container" style={{ height: '100%', minHeight: 400 }}>
      {/* Header */}
      <div className="chat-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <HiOutlineSparkles style={{ color: 'var(--accent)', fontSize: 18 }} />
          <span>AI Study Buddy</span>
          <div className="ai-dot" />
        </div>
        <div style={{ display: 'flex', gap: 0 }}>
          <button
            className="btn btn-sm"
            style={{
              background: 'var(--accent-subtle)', color: 'var(--accent)',
              fontSize: 12, borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
              border: '1px solid var(--border-accent)',
            }}
          >
            <HiOutlineChatBubbleLeftRight style={{ fontSize: 14 }} /> Chat
          </button>
          <button
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--text-tertiary)', fontSize: 12, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}
            onClick={() => setTab('flashcards')}
          >
            <HiOutlineRectangleStack style={{ fontSize: 14 }} /> Cards
          </button>
        </div>
      </div>

      {/* Course Context Indicator */}
      {selectedCourse && (
        <div style={{
          padding: '8px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: 'var(--text-tertiary)',
        }}>
          <HiOutlineAcademicCap style={{ fontSize: 14 }} />
          <span>Context: <strong style={{ color: 'var(--text-secondary)' }}>{selectedCourse.title}</strong></span>
          {lesson && (
            <span style={{ marginLeft: 'auto' }} className="badge" >
              {lesson.title}
            </span>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.type}`}>
            <div className="chat-avatar">
              {msg.type === 'ai'
                ? <HiOutlineCpuChip style={{ fontSize: 16 }} />
                : <HiOutlineUser style={{ fontSize: 16 }} />
              }
            </div>
            <div className="chat-bubble" style={{ whiteSpace: 'pre-line' }}>
              {msg.file && (
                <div style={{
                  fontSize: 11, opacity: 0.7, marginBottom: 6,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <HiOutlineDocumentText style={{ fontSize: 12 }} /> {msg.file}
                </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message ai">
            <div className="chat-avatar">
              <HiOutlineCpuChip style={{ fontSize: 16 }} />
            </div>
            <div className="chat-bubble">
              <div className="typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* File Upload Indicator */}
      {uploadedFile && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', background: 'var(--accent-subtle)',
          fontSize: 12, color: 'var(--accent)', fontWeight: 500,
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <HiOutlineDocumentText style={{ fontSize: 14, flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {uploadedFile.name}
          </span>
          <button
            onClick={() => { setUploadedFile(null); setFileData(null); }}
            style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              cursor: 'pointer', color: 'var(--accent)',
              display: 'flex', alignItems: 'center', padding: 2,
            }}
          >
            <HiOutlineXMark style={{ fontSize: 14 }} />
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="chat-input-area">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          className="btn btn-ghost btn-icon"
          onClick={() => fileInputRef.current?.click()}
          title="Upload PDF"
          style={{ flexShrink: 0, width: 36, height: 36 }}
        >
          <HiOutlineDocumentArrowUp style={{ fontSize: 18 }} />
        </button>
        <input
          className="input"
          placeholder="Ask about this lesson..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="btn btn-primary btn-icon"
          onClick={sendMessage}
          disabled={(!input.trim() && !fileData) || loading}
          style={{
            flexShrink: 0,
            opacity: (!input.trim() && !fileData) || loading ? 0.4 : 1,
            cursor: (!input.trim() && !fileData) || loading ? 'not-allowed' : 'pointer',
          }}
        >
          <HiOutlinePaperAirplane />
        </button>
      </div>
    </div>
  );
}
