import React from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import { DrawingTools } from "../types/types";

interface DrawingToolbarProps {
  selectedTool: DrawingTools;
  onSelectTool: (tool: DrawingTools) => void;
}

const DrawingToolbar: React.FC<DrawingToolbarProps> = ({
  selectedTool,
  onSelectTool,
}) => (
  <Box>
    <Typography variant="h6">Choose Drawing Tool</Typography>
    <Select
      value={selectedTool}
      onChange={(e) => onSelectTool(e.target.value as DrawingTools)}
      fullWidth
    >
      <MenuItem value="pencil">Pencil</MenuItem>
      <MenuItem value="rectangle">Rectangle</MenuItem>
      <MenuItem value="filledRectangle">Filled Rectangle</MenuItem>
      <MenuItem value="circle">Circle</MenuItem>
      <MenuItem value="filledCircle">Filled Circle</MenuItem>
    </Select>
  </Box>
);

export default DrawingToolbar;
