import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Positions for: 
  // [0] Head (Blue curved bracket pointer)
  // [1] Dot 1 (Red)
  // [2] Dot 2 (Yellow)
  // [3] Dot 3 (Green)
  // [4] Dot 4 (Blue)
  const mousePos = useRef({ x: -100, y: -100 });
  const points = useRef([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);

  const animFrameId = useRef(null);

  const elRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    // Disable on touch screens (coarse pointer)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      if (!visible) setVisible(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target;
      if (target) {
        const interactive = !!target.closest(
          'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]'
        );
        setIsHovering(interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Chain spring factors: Head is responsive, subsequent dots have fluid wave momentum
    const chainFactors = [0.65, 0.44, 0.35, 0.27, 0.21];

    // Incremental link offsets so the dots clear the 30px head pointer and stay clearly visible at rest
    const linkOffsets = [
      { x: 0, y: 0 },    // Head
      { x: 20, y: 20 },  // Dot 1 (Red, clears the bracket)
      { x: 13, y: 13 },  // Dot 2 (Yellow)
      { x: 11, y: 11 },  // Dot 3 (Green)
      { x: 9, y: 9 },    // Dot 4 (Blue)
    ];

    const animate = () => {
      const mouse = mousePos.current;
      const pts = points.current;

      // Update Head pointer to track mouse directly and smoothly
      pts[0].x += (mouse.x - pts[0].x) * chainFactors[0];
      pts[0].y += (mouse.y - pts[0].y) * chainFactors[0];

      // Chain physics: each dot smoothly follows the previous one with link offset
      // This maintains high fluidity in motion while keeping all dots beautifully spaced and visible at rest
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];

        const targetX = prev.x + linkOffsets[i].x;
        const targetY = prev.y + linkOffsets[i].y;

        curr.x += (targetX - curr.x) * chainFactors[i];
        curr.y += (targetY - curr.y) * chainFactors[i];
      }

      // Apply GPU-accelerated transforms directly to DOM elements
      for (let i = 0; i < elRefs.length; i++) {
        const el = elRefs[i].current;
        if (el) {
          el.style.transform = `translate3d(${pts[i].x}px, ${pts[i].y}px, 0)`;
        }
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [visible]);

  if (isTouchDevice) return null;

  // Scale states: 0.78 clicking, 1.15 hovering, 0.85 normal
  const scale = isClicking ? 0.78 : isHovering ? 1.15 : 0.85;

  return (
    <>
      {/* Hide native browser cursor across all elements */}
      <style>{`
        html, body, *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>

      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {/* Dot 4: Blue (Back of trail, lowest z-index) */}
        <div ref={elRefs[4]} className="absolute top-0 left-0 will-change-transform z-10">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className="overflow-visible"
            style={{
              transform: `translate(-5px, -5px) scale(${scale})`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <circle cx="5" cy="5" r="4" fill="#FFFFFF" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.15))" />
            <circle cx="5" cy="5" r="2.5" fill="#4285F4" />
          </svg>
        </div>

        {/* Dot 3: Green */}
        <div ref={elRefs[3]} className="absolute top-0 left-0 will-change-transform z-20">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className="overflow-visible"
            style={{
              transform: `translate(-7px, -7px) scale(${scale})`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <circle cx="7" cy="7" r="5.5" fill="#FFFFFF" filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.18))" />
            <circle cx="7" cy="7" r="3.6" fill="#34A853" />
          </svg>
        </div>

        {/* Dot 2: Yellow */}
        <div ref={elRefs[2]} className="absolute top-0 left-0 will-change-transform z-30">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className="overflow-visible"
            style={{
              transform: `translate(-9px, -9px) scale(${scale})`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <circle cx="9" cy="9" r="7" fill="#FFFFFF" filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.18))" />
            <circle cx="9" cy="9" r="4.8" fill="#FBBC04" />
          </svg>
        </div>

        {/* Dot 1: Red */}
        <div ref={elRefs[1]} className="absolute top-0 left-0 will-change-transform z-40">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            className="overflow-visible"
            style={{
              transform: `translate(-11px, -11px) scale(${scale})`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <circle cx="11" cy="11" r="8.5" fill="#FFFFFF" filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.2))" />
            <circle cx="11" cy="11" r="6" fill="#EA4335" />
          </svg>
        </div>

        {/* Head: Curved Google Blue Bracket Cursor (Top layer, leads in front) */}
        <div ref={elRefs[0]} className="absolute top-0 left-0 will-change-transform z-50">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            className="overflow-visible"
            style={{
              transform: `translate(-3px, -3px) scale(${scale})`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <g filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.22))">
              <path
                d="M 22 7 H 11 C 7.68 7 5 9.68 5 13 V 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 22 7 H 11 C 7.68 7 5 9.68 5 13 V 24"
                fill="none"
                stroke="#4285F4"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>

      </div>
    </>
  );
}
