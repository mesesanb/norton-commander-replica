import React, { useEffect, useState } from 'react';

const AsciiCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.pageX, y: e.pageY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <span
      className="absolute text-orange-500 text-xl leading-none pointer-events-none z-[9999]"
      style={{ left: position.x, top: position.y }}>
      █
    </span>
  );
};

export default AsciiCursor;
