export interface FilesListProps {
  onImageClick: (imageUrl: string) => void;
  files: Array<{ name: string; url: string }>;
}
