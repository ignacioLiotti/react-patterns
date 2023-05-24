// components/BlackHole.tsx
import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import styles from './BlackHole.module.css';

type Dot = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  dragging: boolean;
};

const G = 0.1; // Gravitational constant
const blackHoleMass = 100; // Mass of the black hole

const BlackHole: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [blackHolePosition, setBlackHolePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const blackHoleRef = useRef<HTMLDivElement>(null);
  const [blackHoleVelocity, setBlackHoleVelocity] = useState<{ vx: number; vy: number }>({
    vx: 0,
    vy: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) =>
        dots.map((dot) => {

          if (dot.dragging) {
            return dot;
          }

          const blackHoleCenterX = blackHolePosition.x + 25;
          const blackHoleCenterY = blackHolePosition.y + 25;

          const dx = blackHoleCenterX - dot.x;
          const dy = blackHoleCenterY - dot.y;
          // ... rest of the gravitational force calculation

          // Update the velocity with the black hole's velocity
          const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (G * blackHoleMass) / (distance * distance);
        const fx = (force * dx) / distance;
        const fy = (force * dy) / distance;
          const newVx = dot.vx + fx + blackHoleVelocity.vx;
          const newVy = dot.vy + fy + blackHoleVelocity.vy;

          const newX = dot.x + newVx;
          const newY = dot.y + newVy;

          return {
            ...dot,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        }),
      );
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [blackHolePosition, blackHoleVelocity]);

  const handleDragStart = (e: DraggableEvent, id: number) => {
    setDots((dots) =>
      dots.map((dot) => (dot.id === id ? { ...dot, dragging: true } : dot)),
    );
  };
  
  const handleDragStop = (e: DraggableEvent, ui: DraggableData, id: number) => {
    setDots((dots) =>
      dots.map((dot) =>
        dot.id === id
          ? { ...dot, dragging: false, vx: ui.deltaX, vy: ui.deltaY }
          : dot,
      ),
    );
  };

  const handleDrag = (e: MouseEvent, ui: DraggableData, id: number) => {
    setDots((dots) =>
      dots.map((dot) => {
        if (dot.id === id) {
          return { ...dot, x: ui.x, y: ui.y };
        }

        return dot;
      }),
    );
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = blackHoleRef.current!.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
  
    const newDot: Dot = {
      id: Date.now(),
      x: x,
      y: y,
      vx: 0,
      vy: 0,
    };
  
    setDots((dots) => [...dots, newDot]);
  };

  return (
    <div
    className={styles["blackhole-container"]}
    ref={blackHoleRef}
    onClick={handleContainerClick}
  >
      <Draggable
      onDrag={(e, ui) => {
        const newVx = ui.deltaX;
        const newVy = ui.deltaY;
        setBlackHoleVelocity({ vx: newVx, vy: newVy });
        setBlackHolePosition({ x: ui.x, y: ui.y });
      }}
      onStop={() => setBlackHoleVelocity({ vx: 0, vy: 0 })}
>
  <div className={styles["blackhole"]} />
</Draggable>
      {dots.map((dot) => (
        <Draggable
          key={dot.id}
          position={{ x: dot.x, y: dot.y }}
          onStart={(e, ui) => handleDragStart(e, dot.id)}
          onDrag={(e, ui) => handleDrag(e, ui, dot.id)}
          onStop={(e, ui) => handleDragStop(e, ui, dot.id)}
        >
          <div className={styles["dot"]} />
        </Draggable>
      ))}
    </div>
  );
};

export default BlackHole;
