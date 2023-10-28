import './App.css';
import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

import removeBackground from '@imgly/background-removal';

import ImageInput from './components/ImageInput';
import ImagePreview from './components/ImagePreview';

function calculateSecondsBetweenDates(startDate, endDate) {
  const milliseconds = endDate - startDate;
  const seconds = (milliseconds / 1000.0).toFixed(1);
  return seconds;
}
const FULL_URL = process.env.PUBLIC_URL || window.location.href.slice(0, -1);
const MODEL_ASSETS_URL = FULL_URL + '/static/model/';
function getRandomImage() {
  const images = [
    FULL_URL + '/test_images/document.png',
    FULL_URL + '/test_images/employee.png',
    FULL_URL + '/test_images/gaming.png',
    FULL_URL + '/test_images/home.png',
    FULL_URL + '/test_images/settings.png',
    FULL_URL + '/test_images/settings2.png',
    FULL_URL + '/test_images/user.png',
  ];
  return images[Math.floor(Math.random() * images.length)];
}

function App() {
  // getRandomImage()
  const [imageFile, setImageFile] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startDate, setStartDate] = useState(Date.now());
  const [caption, setCaption] = useState("");

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(calculateSecondsBetweenDates(startDate, Date.now()));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, startDate]);

  const resetTimer = () => {
    setIsRunning(true);
    setStartDate(Date.now());
    setSeconds(0);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };


  async function load() {
    setIsRunning(true);
    resetTimer();
    console.log("Removing background of image: " + imageFile);
    const imageBlob = await removeBackground(imageFile, {
      publicPath: MODEL_ASSETS_URL,
      // debug: true,
      progress: (key, current, total) => {
        const [type, subtype] = key.split(':');
        setCaption(
          `${type} ${subtype} ${((current / total) * 100).toFixed(0)}%`
        );
      }
    });

    setImageFile(imageBlob);
    setIsRunning(false);
    stopTimer();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Background Remover Demo</h1>
      </header>
      <main>
        <ImageInput onChange={setImageFile} />
        <ImagePreview fileBlob={imageFile} />
        <div className='start'>
          <p className='caption'>{caption}</p>

          <button className='start-button' disabled={isRunning || !imageFile} onClick={() => load()}>
            <span className='button-icon'>
              <svg width="48" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </span>
            <span className='button-text'>
              Start
            </span>
            <span className='button-caption'>
              {seconds}s
            </span>
          </button>
        </div>

      </main>
      <Analytics />
    </div>
  );
}

export default App;
