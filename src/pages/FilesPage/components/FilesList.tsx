import React from "react";
import { Toaster } from "react-hot-toast";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import downloadFile from "../utils/downloadFile";
import { FilesListProps } from "../types/types";

const FilesList: React.FC<FilesListProps> = ({ onImageClick, files }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
    {files.map((file, index) => (
      <Card key={index} sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {file.name}
          </Typography>
          <img
            src={file.url}
            alt={file.name}
            style={{ width: "100%", height: "auto", marginBottom: "10px" }}
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              downloadFile(file.url, file.name);
            }}
          >
            Download
          </Button>
          <Button onClick={() => onImageClick(file.name, file.url)}>
            Edit
          </Button>
        </CardActions>
      </Card>
    ))}
    <Toaster />
  </div>
);

export default FilesList;
