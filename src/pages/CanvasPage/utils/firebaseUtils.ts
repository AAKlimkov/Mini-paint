import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import toast from "react-hot-toast";
import { UploadImageParams } from "../types/types";

const uploadImageToFirebase = async ({
  canvasRef,
  user,
  previousFilePath,
  filePath,
}: UploadImageParams) => {
  const canvas = canvasRef.current;
  if (!canvas || !user) {
    toast.error("Canvas or user information is missing.");
    return;
  }

  const metadata = {
    contentType: "image/png",
    customMetadata: { user },
  };

  canvas.toBlob(async (blob) => {
    if (!blob) {
      toast.error("Failed to create image blob.");
      return;
    }

    const storage = getStorage();
    const fileRef = ref(storage, filePath);

    if (previousFilePath) {
      previousFilePath.toString();
      const previousFileRef = ref(storage, previousFilePath);

      try {
        await deleteObject(previousFileRef);
      } catch (error) {
        toast.error(`Failed to delete previous image: ${error.message}`);
        return;
      }
    }

    try {
      await uploadBytes(fileRef, blob, metadata);

      toast.success("Image successfully uploaded!");
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
    }
  }, "image/png");
};
export default uploadImageToFirebase;
