import './App.css';
import { useState, useEffect } from 'react';

import removeBackground from '@imgly/background-removal';

function calculateSecondsBetweenDates(startDate, endDate) {
  const milliseconds = endDate - startDate;
  const seconds = (milliseconds / 1000.0).toFixed(1);
  return seconds;
}

function App() {
  const images = [
    'test_images/document.png',
    'test_images/employee.png',
    'test_images/gaming.png',
    'test_images/home.png',
    'test_images/settings.png',
    'test_images/settings2.png',
    'test_images/user.png',
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const [imageUrl, setImageUrl] = useState(randomImage);
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
    setImageUrl(randomImage);

    const imageBlob = await removeBackground(randomImage, {
      //For demo purposes don't use the local path
      // Note: If public path is not specified the model and wasm part
      //   will be loaded from the unpkg CDN
      // THIS IS SLOW!
      //
      // publicPath: `${window.location.href}/static/js/`,
      // debug: true,
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
