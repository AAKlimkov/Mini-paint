/* eslint-disable no-case-declarations */
import { useRef, useEffect, useState } from "react";

type ToolType =
  | "pencil"
  | "rectangle"
  | "filledRectangle"
  | "circle"
  | "filledCircle";

const useDrawingLogic = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  drawingTool: ToolType,
  lineWidth: number,
  color: string,
) => {
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const image = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    const handleLoad = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(image.current, 0, 0);
    };

    image.current.addEventListener("load", handleLoad);
    return () => {
      image.current.removeEventListener("load", handleLoad);
    };
  }, [imageSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const startDrawing = (e: MouseEvent) => {
      setStartPos({ x: e.offsetX, y: e.offsetY });
      setIsDrawing(true);
      if (drawingTool === "pencil") {
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
      }
      if (
        ["rectangle", "filledRectangle", "circle", "filledCircle"].includes(
          drawingTool,
        )
      ) {
        setImageSrc(canvas.toDataURL());
      }
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;

      if (drawingTool === "pencil") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      } else {
        const img = new Image();
        img.src = imageSrc!;
        img.onload = () => {
          ctx.clearRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height,
          );
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = color;
          switch (drawingTool) {
            case "rectangle":
            case "filledRectangle":
              const width = e.offsetX - startPos.x;
              const height = e.offsetY - startPos.y;
              if (drawingTool === "filledRectangle") {
                ctx.fillRect(startPos.x, startPos.y, width, height);
              } else {
                ctx.strokeRect(startPos.x, startPos.y, width, height);
              }
              break;
            case "circle":
            case "filledCircle":
              const radius = Math.sqrt(
                (e.offsetX - startPos.x) ** 2 + (e.offsetY - startPos.y) ** 2,
              );
              ctx.beginPath();
              ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2, false);
              if (drawingTool === "filledCircle") {
                ctx.fill();
              } else {
                ctx.stroke();
              }
              break;
            default:
              break;
          }
        };
      }
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      if (drawingTool === "pencil") {
        setImageSrc(canvas.toDataURL());
      }
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // eslint-disable-next-line consistent-return
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [drawingTool, lineWidth, color, isDrawing, startPos]);

  return {
    initializeCanvas: (width: number, height: number) => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    },
  };
};

export default useDrawingLogic;
