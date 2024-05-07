export interface FilesListProps {
  onImageClick: (imageName: string, imageUrl: string) => void;
  files: Array<{ name: string; url: string }>;
}
