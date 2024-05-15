export interface FilesListProps {
  onImageClick: (
    imageName: string,
    imageUrl: string,
    imageUser?: string,
  ) => void;
  files: Array<{ name: string; url: string; user?: string }>;
}
