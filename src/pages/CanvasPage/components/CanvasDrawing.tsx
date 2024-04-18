import React, { useRef, useEffect } from "react";

interface CanvasComponentProps {
  color: string;
  lineWidth: number;
  drawingTool: string;
  handleMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseUp: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  color,
  lineWidth,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
      context.fillStyle = color;
    }
  }, [lineWidth, color]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: "2px solid #000", cursor: "crosshair" }}
    />
  );
};

export default CanvasComponent;
