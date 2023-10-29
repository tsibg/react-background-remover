import "./App.css";
import { Analytics } from "@vercel/analytics/react";

import BackgroundRemover from "./components/BackgroundRemover";

function App() {
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
