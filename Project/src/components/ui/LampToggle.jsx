import { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function LampToggle() {
  const { theme, toggleTheme } = useTheme();
  const [pulling, setPulling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const cordRef = useRef(null);

  const handlePull = () => {
    setPulling(true);
    setPullY(30);

    setTimeout(() => {
      setPullY(0);
      toggleTheme();
    }, 200);

    setTimeout(() => {
      setPulling(false);
    }, 500);
  };

  const isDark = theme === 'dark';

  return (
    <div className="lamp-toggle" onClick={handlePull}>
      {/* Cord line from top */}
      <div className="lamp-cord-wrapper">
        <svg
          width="24"
          height={60 + pullY}
          viewBox={`0 0 24 ${60 + pullY}`}
          className="lamp-cord-svg"
          style={{ transition: pulling ? 'none' : 'height 0.3s ease' }}
        >
          <line
            x1="12"
            y1="0"
            x2="12"
            y2={40 + pullY}
            stroke={isDark ? '#555' : '#bbb'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Small knob at the end */}
          <circle
            cx="12"
            cy={44 + pullY}
            r="5"
            fill={isDark ? '#666' : '#999'}
            stroke={isDark ? '#777' : '#aaa'}
            strokeWidth="1"
          />
          <circle
            cx="12"
            cy={52 + pullY}
            r="3"
            fill={isDark ? '#555' : '#888'}
          />
        </svg>
      </div>

      {/* Glow effect when light */}
      {!isDark && (
        <div className="lamp-glow" />
      )}

      <span className="lamp-label">
        {isDark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        )}
      </span>
    </div>
  );
}
