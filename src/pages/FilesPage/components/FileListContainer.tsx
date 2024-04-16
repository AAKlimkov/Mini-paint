import React, { Suspense } from "react";
import FilesList from "./FilesList";

interface FileListContainerProps {
  files: Array<{ url: string; name: string; user?: string }>;
  onImageClick: (imageUrl: string) => void;
}

const FileListContainer: React.FC<FileListContainerProps> = ({
  files,
  onImageClick,
}) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
    <Suspense fallback={<div>Loading...</div>}>
      <FilesList files={files} onImageClick={onImageClick} />
    </Suspense>
  </div>
);

export default FileListContainer;
