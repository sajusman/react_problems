import React, { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
}

export const UndoRedo = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [redo, setRedo] = useState<Point[]>([]);
  useEffect(() => {
    const handleAddPoint = (e: MouseEvent) => {
      const upcomingPoint = {
        x: e.clientX,
        y: e.clientY,
      };
      const pointExists = points.findIndex(
        ({ x, y }) => x === upcomingPoint.x && y === upcomingPoint.y
      );
      if (pointExists >= 0) return;
      setPoints((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
    };
    document.addEventListener("click", handleAddPoint);
    return () => {
      document.removeEventListener("click", handleAddPoint);
    };
  }, [points]);

  const handleUndo = (e: React.MouseEvent) => {
    const lastPoint = points.pop();
    setPoints([...points]);
    if (lastPoint) setRedo([lastPoint, ...redo]);
  };
  const handleRedo = (e: React.MouseEvent) => {
    const firstElement = redo.shift();
    if (firstElement) setPoints([...points, firstElement]);
    setRedo([...redo]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4>Actions</h4>
        <button onClick={handleUndo} disabled={points.length < 1}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={redo.length < 1}>
          Redo
        </button>
        <p>
          Total : <span>{points.length}</span>
        </p>
      </div>
      {points.map(({ x, y }) => (
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x,
            top: y,
            height: "10px",
            width: "10px",
            background: "white",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};
