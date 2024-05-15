import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listAll, getDownloadURL, ref, getMetadata } from "firebase/storage";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
} from "@mui/material";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { firebaseConfig, storage } from "../../firebaseConfig";
import SignOutAndCreateButtons from "./components/SignOutAndCreateButtons";
import UserFilter from "./components/UserFilter";
import Loader from "./components/Loader";

const FileListContainer = React.lazy(
  () => import("./components/FileListContainer"),
);

const FilesPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user.email);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      const filesRef = ref(storage, `gs://${firebaseConfig.storageBucket}`);
      try {
        const response = await listAll(filesRef);
        const data = await Promise.all(
          response.items.map(async (item) => {
            const metadata = await getMetadata(item);
            return {
              url: await getDownloadURL(item),
              name: item.name,
              user: metadata.customMetadata.user,
            };
          }),
        );
        setFiles(data);
        const users = Array.from(new Set(data.map((file) => file.user))); // Extract unique users
        setUserOptions(users);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleUserSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(typeof value === "string" ? value.split(",") : value);
  };

  const filteredFiles = files.filter(
    (file) => selectedUsers.length === 0 || selectedUsers.includes(file.user),
  );

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const handleCreateNewImage = () => {
    navigate("/create-image");
  };
  const handleEditImage = (
    imageName: string,
    imageUrl: string,
    imageUser: string,
  ) => {
    navigate(`/edit-image/${encodeURIComponent(imageUrl)}`, {
      state: { isEditable: imageUser === user },
    });
  };
  const handleOpenModal = (
    imageName?: string,
    imageUrl?: string,
    imageUser?: string,
  ) => {
    setSelectedImageUrl(imageUrl);
    handleEditImage(imageName, imageUrl, imageUser);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <SignOutAndCreateButtons
        onSignOut={handleLogout}
        onCreateImage={handleCreateNewImage}
      />
      <UserFilter
        selectedUsers={selectedUsers}
        userOptions={userOptions}
        handleUserSelectionChange={handleUserSelectionChange}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <FileListContainer
          files={filteredFiles}
          onImageClick={handleOpenModal}
        />
      )}

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
