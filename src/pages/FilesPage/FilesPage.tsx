import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listAll, getDownloadURL, ref } from "firebase/storage";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { storage } from "../../firebaseConfig";
// import styles from "./FilesPage.module.less";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";

const FilesPage: React.FC = () => {
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const handleCreateNewImage = () => {
    navigate("/create-image"); // Navigate to the CanvasPage
  };

  const downloadFile = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = name;
      document.body.appendChild(anchor); // Required for Firefox
      anchor.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(anchor);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <Button
        variant="outlined"
        onClick={handleLogout}
        style={{ marginBottom: "20px" }}
      >
        Sign Out
      </Button>
      {files.map((file, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {file.name}
            </Typography>
            {/* Assuming all files are images for preview. Adjust if needed. */}
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
          </CardActions>
        </Card>
      ))}
      <button onClick={handleCreateNewImage}>Create New Image</button>
    </div>
  );
};

export default FilesPage;
