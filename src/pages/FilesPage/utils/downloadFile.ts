import toast from "react-hot-toast";

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
    toast.dismiss();
    toast.success("Download successful!");
  } catch (error) {
    toast.dismiss();
    toast.error(`Download failed: ${error.message}`);
  }
};

export default downloadFile;
