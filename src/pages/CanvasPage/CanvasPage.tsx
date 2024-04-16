import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

type DrawingTools =
  | "pencil"
  | "rectangle"
  | "filledRectangle"
  | "circle"
  | "filledCircle";

const CanvasPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [drawingTool, setDrawingTool] = useState<DrawingTools>("pencil");
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const user = useAppSelector((state) => state.auth.user.email);

  const navigate = useNavigate();

  const uploadImageToFirebase = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const metadata = {
      contentType: "image/png",
      customMetadata: {
        user,
      },
    };

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const storage = getStorage();

      const fileRef = ref(storage, `${Date.now()}.png`);

      try {
        const snapshot = await uploadBytes(fileRef, blob, metadata);
        console.log("Uploaded a blob or file!", snapshot);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }, "image/png");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  const handleReturnToFiles = () => {
    navigate("/files");
  };

  const handleMouseDown = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    setStartPos({ x: offsetX, y: offsetY });
    if (drawingTool === "pencil") {
      setIsDrawing(true);
      const context = canvasRef.current?.getContext("2d");
      if (context) {
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        context.strokeStyle = color;
      }
    }
  };

  const handleMouseMove = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || drawingTool !== "pencil") return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.strokeStyle = color;
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };

  const handleMouseUp = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawingTool === "pencil") {
      setIsDrawing(false);
    }
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
      context.fillStyle = color;

      if (drawingTool === "rectangle") {
        context.strokeRect(
          startPos.x,
          startPos.y,
          offsetX - startPos.x,
          offsetY - startPos.y,
        );
      } else if (drawingTool === "filledRectangle") {
        context.fillRect(
          startPos.x,
          startPos.y,
          offsetX - startPos.x,
          offsetY - startPos.y,
        );
      } else if (drawingTool === "circle") {
        const radius = Math.sqrt(
          (offsetX - startPos.x) ** 2 + (offsetY - startPos.y) ** 2,
        );
        context.beginPath();
        context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        context.stroke();
      } else if (drawingTool === "filledCircle") {
        const radius = Math.sqrt(
          (offsetX - startPos.x) ** 2 + (offsetY - startPos.y) ** 2,
        );
        context.beginPath();
        context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        context.fill();
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create a New Image
      </Typography>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <TextField
          size="small"
          type="number"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          inputProps={{ min: 1, max: 10, step: 1 }}
          label="Width"
        />
        <Select
          value={drawingTool}
          onChange={(e) => setDrawingTool(e.target.value as DrawingTools)}
          size="small"
          displayEmpty
        >
          <MenuItem value="pencil">Pencil</MenuItem>
          <MenuItem value="rectangle">Rectangle</MenuItem>
          <MenuItem value="filledRectangle">Filled Rectangle</MenuItem>
          <MenuItem value="circle">Circle</MenuItem>
          <MenuItem value="filledCircle">Filled Circle</MenuItem>
        </Select>
      </Box>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "2px solid #000", cursor: "crosshair" }}
      />
      <Button onClick={handleReturnToFiles}>Back to files</Button>
      <Button onClick={uploadImageToFirebase}>Save Drawing</Button>
    </Box>
  );
};

export default CanvasPage;
