import "./App.css";
import { Analytics } from "@vercel/analytics/react";

import BackgroundRemover from "./components/BackgroundRemover";

// function calculateSecondsBetweenDates(startDate, endDate) {
//   const milliseconds = endDate - startDate;
//   const seconds = (milliseconds / 1000.0).toFixed(1);
//   return seconds;
// }


function App() {
  // const [isRunning, setIsRunning] = useState(false);
  // const [seconds, setSeconds] = useState(0);
  // const [startDate, setStartDate] = useState(Date.now());

  // useEffect(() => {
  //   let interval = null;
  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setSeconds(calculateSecondsBetweenDates(startDate, Date.now()));
  //     }, 100);
  //   } else {
  //     clearInterval(interval);
  //   }
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [isRunning, startDate]);

  // const resetTimer = () => {
  //   setIsRunning(true);
  //   setStartDate(Date.now());
  //   setSeconds(0);
  // };

  // const stopTimer = () => {
  //   setIsRunning(false);
  // };

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Background Remover Demo</h1>
      </header>
      <main>
        <BackgroundRemover />
      </main>
      <Analytics />
    </div>
  );
}

export default App;
