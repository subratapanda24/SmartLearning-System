import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import LampToggle from '../components/ui/LampToggle';

import { HiOutlineCpuChip, HiOutlineRectangleStack, HiOutlineSparkles, HiOutlineMap } from 'react-icons/hi2';

export default function LandingPage() {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isHovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax calculations
  const parallaxX = (mousePos.x - window.innerWidth / 2) * 0.05;
  const parallaxY = (mousePos.y - window.innerHeight / 2) * 0.05;

  // Floating objects logic
  const floatingObjects = [
    { type: 'AI', size: 80, xOffset: 200, yOffset: -150, delay: 0, speed: 1.2 },
    { type: 'Flashcards', size: 100, xOffset: -250, yOffset: 120, delay: 0.5, speed: 0.8 },
    { type: 'Quiz', size: 70, xOffset: 300, yOffset: 180, delay: 1.2, speed: 1.5 },
    { type: 'Map', size: 90, xOffset: -200, yOffset: -200, delay: 0.3, speed: 1 },
  ];

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Background Grid that moves with mouse */}
      <div style={{
        position: 'absolute',
        inset: -100,
        backgroundSize: '40px 40px',
        backgroundImage: 'linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)',
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        transition: 'transform 0.1s ease-out',
        opacity: 0.5,
        zIndex: 0
      }} />

      {/* Lamp toggle at top right */}
      <div style={{ position: 'absolute', top: 0, right: 60, zIndex: 50 }}>
        <LampToggle />
        <div style={{ position: 'absolute', bottom: -50, right: -40, whiteSpace: 'nowrap', color: 'var(--text-tertiary)', fontSize: 12, opacity: 0.5, pointerEvents: 'none' }}>
          ↑ Pull cord to toggle theme
        </div>
      </div>

      {/* Floating Interactive Objects */}
      {floatingObjects.map((obj, i) => (
        <motion.div
          key={i}
          animate={{
            x: parallaxX * obj.speed + obj.xOffset,
            y: parallaxY * obj.speed + obj.yOffset + Math.sin(Date.now() / 1000 + obj.delay) * 20,
            rotate: parallaxX * 0.1
          }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
          style={{
            position: 'absolute',
            width: obj.size,
            height: obj.size,
            borderRadius: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 1,
            cursor: 'default',
            userSelect: 'none'
          }}
        >
          {obj.type === 'AI' && <HiOutlineCpuChip style={{ fontSize: 28 }} />}
          {obj.type === 'Flashcards' && <HiOutlineRectangleStack style={{ fontSize: 28 }} />}
          {obj.type === 'Quiz' && <HiOutlineSparkles style={{ fontSize: 28 }} />}
          {obj.type === 'Map' && <HiOutlineMap style={{ fontSize: 28 }} />}
        </motion.div>
      ))}

      {/* Center Hero Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: 700,
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32
      }}>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-medium)',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
          Interactive Learning Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(48px, 6vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            color: 'var(--text-primary)',
            margin: 0
          }}
        >
          Learn Smarter,<br />
          <span style={{ color: 'var(--text-tertiary)' }}>Not Harder.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 18,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 500
          }}
        >
          Transform your study material into interactive learning experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{ position: 'relative' }}
        >
          <Link
            to="/app"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--accent)',
              color: 'var(--text-inverse)',
              padding: '16px 40px',
              borderRadius: '100px',
              fontSize: 18,
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: isHovering 
                ? '0 0 40px rgba(0,0,0,0.5)' 
                : '0 10px 25px rgba(0,0,0,0.2)',
              transform: isHovering ? 'translateY(-2px) scale(1.02)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Enter Platform
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          
          {/* Subtle glow effect behind button */}
          <div style={{
            position: 'absolute',
            inset: -10,
            background: 'var(--accent)',
            filter: 'blur(20px)',
            opacity: isHovering ? 0.4 : 0,
            zIndex: -1,
            transition: 'opacity 0.3s ease',
            borderRadius: '100px'
          }} />
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div style={{ position: 'absolute', bottom: 32, left: 32, fontSize: 13, color: 'var(--text-tertiary)', fontWeight: 500 }}>
        © SmartLearn
      </div>
      <div style={{ position: 'absolute', bottom: 32, right: 32, fontSize: 13, color: 'var(--text-tertiary)', fontWeight: 500, display: 'flex', gap: 16 }}>
        <span>AI Buddy</span>
        <span>Flashcards</span>
        <span>Mind Maps</span>
      </div>
    </div>
  );
}
