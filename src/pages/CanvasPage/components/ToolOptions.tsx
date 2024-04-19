import React from "react";
import { Box, Slider, Typography, TextField } from "@mui/material";

interface ToolOptionsProps {
  toolSize: number;
  toolColor: string;
  onSizeChange: (newValue: number) => void;
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 2.5,
    label: "2.5",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 7.5,
    label: "7.5",
  },
  {
    value: 10,
    label: "10",
  },
];

const ToolOptions: React.FC<ToolOptionsProps> = ({
  toolSize,
  toolColor,
  onSizeChange,
  onColorChange,
}) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onSizeChange(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 0) value = 0;
    if (value > 10) value = 10;
    onSizeChange(value);
  };

  return (
    <Box>
      <Typography variant="h6">Tool Options</Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Size:</Typography>
        <Slider
          value={toolSize}
          onChange={handleSliderChange}
          aria-labelledby="tool-size-slider"
          min={0}
          max={10}
          step={0.5}
          marks={marks}
          style={{ width: "200px" }}
        />
        <TextField
          type="number"
          value={toolSize}
          onChange={handleInputChange}
          inputProps={{ step: 0.5, min: 0, max: 10 }}
          style={{ width: "80px" }}
        />
      </Box>
      <Typography>Color:</Typography>
      <input type="color" value={toolColor} onChange={onColorChange} />
    </Box>
  );
};

export default ToolOptions;
