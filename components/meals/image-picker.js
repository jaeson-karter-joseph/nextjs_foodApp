"use client";

import { useRef, useState } from "react";
import classses from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPicketImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPicketImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (url) => {
      setPicketImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classses.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classses.controls}>
        <div className={classses.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="The Image Selected by User" fill />
          )}
        </div>
        <input
          className={classses.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classses.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
