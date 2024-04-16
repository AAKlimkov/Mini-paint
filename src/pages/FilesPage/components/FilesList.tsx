import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { storage } from "../../../firebaseConfig";

interface FilesListProps {
  onImageClick: (imageUrl: string) => void;
}

const FilesList: React.FC<FilesListProps> = ({ onImageClick }) => {
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  //   const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      const filesRef = ref(storage, "gs://mini-paint-3bfc5.appspot.com/");
      const snapshot = await listAll(filesRef);
      const fileUrls = await Promise.all(
        snapshot.items.map(async (item) => ({
          url: await getDownloadURL(item),
          name: item.name,
        })),
      );
      setFiles(fileUrls);
    };

    fetchFiles().catch(console.error);
  }, []);

  const downloadFile = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = name;
      document.body.appendChild(anchor);
      anchor.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(anchor);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {files.map((file, index) => (
        <Card
          key={index}
          sx={{ maxWidth: 345 }}
          onClick={() => onImageClick(file.url)}
        >
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
              onClick={() => downloadFile(file.url, file.name)}
            >
              Download
            </Button>
            {/* <Button size="small" onClick={() => handleEditImage(file.name)}>
              Edit
            </Button> */}
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default FilesList;
