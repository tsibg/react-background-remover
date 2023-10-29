import { useState } from "react";
import removeBackground from "@imgly/background-removal";

import ImageInput from "./ImageInput/ImageInput";
import ImagePreview from "./ImagePreview/ImagePreview";
import StartButton from "./StartButton/StartButton";
import useTimer from "../hooks/useTimer";

const FULL_URL = process.env.PUBLIC_URL || window.location.href.slice(0, -1);
const MODEL_ASSETS_URL = FULL_URL + "/static/model/";

function BackgroundRemover() {
  const { seconds, isRunning, startTimer, stopTimer } = useTimer();
  const [imageFile, setImageFile] = useState();
  const [caption, setCaption] = useState("Upload an image to start!");
  
  async function load() {
    console.log("Removing background of image: " + imageFile);
    startTimer();

    const imageBlob = await removeBackground(imageFile, {
      publicPath: MODEL_ASSETS_URL,
      // debug: true,
      progress: (key, current, total) => {
        console.log(`Processing: ${key}: ${current}/${total}`);
        const [type, subtype] = key.split(":");
        setCaption(
          `${type} ${subtype} ${((current / total) * 100).toFixed(0)}%`
        );
      },
    });

    stopTimer();
    setImageFile(imageBlob);
  }

  return (
    <>
      <ImageInput onChange={setImageFile} />
      <ImagePreview fileBlob={imageFile} />

      <p className="caption">{caption}</p>
      <StartButton
        onClick={load}
        disabled={isRunning || !imageFile}
        seconds={seconds}
      />

    </>
  );
}
export default BackgroundRemover;
