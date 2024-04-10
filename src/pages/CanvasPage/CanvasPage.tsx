// src/pages/CanvasPage/CanvasPage.tsx
import React, { useRef, useEffect } from "react";

const CanvasPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      // Basic example: draw a line
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(200, 100);
      context.stroke();
    }
  }, []);

  return (
    <div>
      <h2>Create a New Image</h2>
      <canvas ref={canvasRef} width={500} height={500} />
      {/* Additional UI for canvas manipulation could go here */}
    </div>
  );
};

export default CanvasPage;
