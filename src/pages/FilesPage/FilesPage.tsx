import React, { useEffect, useState } from "react";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import styles from "./FilesPage.module.less";

const FilesPage: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesRef = ref(storage, "gs://mini-paint-3bfc5.appspot.com/");
      const snapshot = await listAll(filesRef);
      const fileUrls = await Promise.all(
        snapshot.items.map((item) => getDownloadURL(item)),
      );
      setFiles(fileUrls);
    };

    fetchFiles().catch(console.error);
  }, []);

  return (
    <div className={styles.filesContainer}>
      <h1>Files</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file} target="_blank" rel="noopener noreferrer">
              File {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilesPage;
