import './App.css';
import { useState, useEffect } from 'react';
import removeBackground from '@imgly/background-removal';

function calculateSecondsBetweenDates(startDate, endDate) {
  const milliseconds = endDate - startDate;
  const seconds = (milliseconds / 1000.0).toFixed(1);
  return seconds;
}
const FULL_URL = process.env.PUBLIC_URL || window.location.href.slice(0,-1);
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
  const [imageUrl, setImageUrl] = useState(getRandomImage());
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startDate, setStartDate] = useState(Date.now());
  const [caption, setCaption] = useState('Click me to remove background');

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
    console.log("Removing background of image: " + imageUrl);
    const imageBlob = await removeBackground(imageUrl, {
      publicPath: MODEL_ASSETS_URL,
      debug: true,
      progress: (key, current, total) => {
        const [type, subtype] = key.split(':');
        setCaption(
          `${type} ${subtype} ${((current / total) * 100).toFixed(0)}%`
        );
      }
    });

    const url = URL.createObjectURL(imageBlob);

    setImageUrl(url);
    setIsRunning(false);
    stopTimer();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageUrl} className="App-logo" alt="logo" />
        <p>{caption}</p>
        <p>Testing background removal: {seconds} s</p>
        <button disabled={isRunning} onClick={() => load()}>
          Click me
        </button>
      </header>
    </div>
  );
}

export default App;
