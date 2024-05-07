export type DrawingTools =
  | "pencil"
  | "rectangle"
  | "filledRectangle"
  | "circle"
  | "filledCircle";

export type UploadImageParams = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  user: string;
  previousFilePath?: string;
  filePath?: string;
};
