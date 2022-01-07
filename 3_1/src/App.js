import React from "react";
import { WeatherDataContainer } from "../src/components/WeatherDataContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Weather History</h3>
      </header>
      <WeatherDataContainer />
    </div>
  );
}

export default App;
