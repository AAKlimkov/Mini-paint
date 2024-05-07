import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Toaster } from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import ToolOptions from "./components/ToolOptions";
import DrawingToolbar from "./components/DrawingToolbar";
import styles from "./CanvasPage.module.less";
import useDrawingLogic from "./hooks/useDrawingLogic";
import uploadImageToFirebase from "./utils/firebaseUtils";
import { DrawingTools } from "./types/types";

const CanvasPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageUrl } = useParams();
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [drawingTool, setDrawingTool] = useState<DrawingTools>("pencil");
  const [previousFilePath, setPreviousFilePath] = useState(null);
  const user = useAppSelector((state) => state.auth.user.email);

  function extractFilename(url: string) {
    const decodedUrl = decodeURIComponent(url);

    const index = decodedUrl.indexOf(".png");

    if (index !== -1 && index >= 13) {
      return `${decodedUrl.substring(index - 13, index)}.png`;
    }
    return "Invalid URL or format";
  }

  const navigate = useNavigate();

  const handleUpload = () => {
    const filePath = `${Date.now()}.png`;
    uploadImageToFirebase({ canvasRef, user, previousFilePath, filePath }).then(
      () => {
        setPreviousFilePath(filePath);
      },
    );
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (imageUrl) {
      const image = new Image();
      image.src = imageUrl;
      image.crossOrigin = "anonymous";
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      const name = extractFilename(imageUrl);

      setPreviousFilePath(name);
    }
  }, [imageUrl]);

  useDrawingLogic(canvasRef, drawingTool, lineWidth, color);

  const handleSizeChange = (newValue: number) => {
    setLineWidth(newValue);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleReturnToFiles = () => navigate("/files");

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Create a New Image
        </Typography>
        <div className={styles.canvasContainer}>
          {" "}
          <DrawingToolbar
            selectedTool={drawingTool}
            onSelectTool={setDrawingTool}
          />
          <ToolOptions
            toolSize={lineWidth}
            toolColor={color}
            onSizeChange={handleSizeChange}
            onColorChange={handleColorChange}
          />
        </div>
      </Box>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: "2px solid #000", cursor: "crosshair" }}
      />
      <Button onClick={handleReturnToFiles}>Back to files</Button>
      <Button onClick={handleUpload}>Save Drawing</Button>
      <Toaster />
    </>
  );
};

export default CanvasPage;
