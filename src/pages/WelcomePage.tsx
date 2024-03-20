/* eslint-disable no-console */
import React from "react";
import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";

const WelcomePage: React.FC = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const listRef = ref(storage, "");

  listAll(listRef).then((data) => console.log(data));

  const handleClick = () => {
    const canvas = document.getElementById("paintCanvas") as HTMLCanvasElement;
    canvas.toBlob((blob) => {
      const storageRef = ref(storage, "some-child");
      const newImg = document.createElement("img");
      const url = URL.createObjectURL(blob);
      newImg.onload = () => {
        URL.revokeObjectURL(url);
      };

      newImg.src = url;
      document.body.appendChild(newImg);
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log(snapshot);
        console.log("Uploaded a blob or file!");
      });
    });
  };
  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <button onClick={handleClick}>upload image</button>
    </div>
  );
};

export default WelcomePage;
