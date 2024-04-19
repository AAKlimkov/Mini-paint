import React from "react";

const FilesList = React.lazy(() => import("./FilesList"));

interface FileListContainerProps {
  files: Array<{ url: string; name: string; user?: string }>;
  onImageClick: (imageUrl: string) => void;
}

const FileListContainer: React.FC<FileListContainerProps> = ({
  files,
  onImageClick,
}) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
    <FilesList files={files} onImageClick={onImageClick} />
  </div>
);

export default FileListContainer;
