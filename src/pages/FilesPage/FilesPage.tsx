import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import Button from "@mui/material/Button";

// import styles from "./FilesPage.module.less";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";

const FilesPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const FilesList = lazy(() => import("./components/FilesList"));

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const handleCreateNewImage = () => {
    navigate("/create-image");
  };
  const handleOpenModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
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
      <Button
        variant="outlined"
        onClick={handleCreateNewImage}
        style={{ marginBottom: "20px" }}
      >
        Create New Image
      </Button>
      <Suspense fallback={<div>Loading...</div>}>
        <FilesList onImageClick={handleOpenModal} />
      </Suspense>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img src={selectedImageUrl} alt="Preview" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilesPage;
